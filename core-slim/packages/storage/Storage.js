import EventEmitter from 'wolfy87-eventemitter';
import { validateAdapter } from './utils';
import { detailedDiff } from 'deep-object-diff';
import defaultAdapter, { createAdapterInstance } from './adapter';
import { storeMap, storeKeySet, storeNameMap } from './storeMap';


const pass = (v) => v;
const dConf = {
  adapter: undefined, initialState: {}, key: undefined, mergeInitialState: true,
  reset: false, serialize: true
};

export class Storage extends EventEmitter {
  constructor(_key, _conf = {}) {
    super();
    let Conf;
    if (_.isPlainObject(_key)) Conf = _key;
    else Conf = { key: _key, ..._conf };
    const {
      adapter: _adapter, format, initialState, key, mergeInitialState,
      name, parse, serialize, persistBlacklist, persistWhitelist
    } = _.defaults({}, Conf, dConf);
    this.persisBlacklist = persistBlacklist;
    this.persistWhitelist = persistWhitelist;
    this.key = key;
    this.name = name || key;
    this.format = format || (!!serialize ? JSON.stringify : pass);
    this.parse = parse || (!!serialize ? JSON.parse : pass);
    this.clearState = { ...initialState };
    this.initialState = initialState;
    this.mergeInitialState = mergeInitialState;
    /* if some sort of persistence exists; get the pre-existing value */
    if (!!_adapter) {
      if (!_.isString(this.key)) {
        throw new TypeError(`expected string for key; got ${typeof key}`);
      }

      this.adapter = _adapter;

      const error = validateAdapter(this.adapter);
      if (error) throw new Error(error);
    }

    this.__state = this.format(this.initialState);
  }

  async init(conf) {
    try {
      await this.hydrate(conf);
    } catch(e) {
      this.emit('error', e);
    } finally {
      this.emit('ready', this.state);
    }
  }

  async get(key) { return this.getSync(key); }
  getSync(key) { return _.get(this.state, key); }

  async set(key, value, ...rest) {
    const nState = _.clone(this.state);
    _.set(nState, key, value);
    return this.setState(nState, ...rest);
  }
  setSync(key, value, ...rest) {
    const nState = _.clone(this.state);
    _.set(nState, key, value);
    return this.setStateSync(nState, ...rest);
  }

  async setState(nState, ...rest) {
    const prev = _.clone(this.state);
    this.write({ ...prev, ...nState });
    return this.handleChange(prev, ...rest);
  }

  setStateSync(nState, ...rest) {
    const prev = _.clone(this.state);
    this.write({ ...prev, ...nState });
    this.handleChange(prev, ...rest);
    return this.state;
  }

  async writeNewState(nState, ...rest) {
    const prev = _.clone(this.state);
    this.write(nState);
    return this.handleChange(prev, ...rest);
  }

  async handleChange(prev, options = {}) {
    const { silent, detailed = true } = options;
    try {
      if (this.adapter) await this.adapter.setItem(this.key, this.__state);
      return this.state;
    } catch(e) {
      this.emit('error', e);
      return Promise.reject(e);
    } finally {
      if (!silent) {
        const store = this;
        const current = this.state;
        const diff = detailedDiff(prev, current);
        this.emit('change', { current, prev, ...diff }, store);
        if (detailed) {
          _.forEach(diff, (changes, type) => _.forEach(changes, (x, key) => {
            /* args: current value, previous value, (change type) */
            this.emit(`change:${key}`,
              { current: _.get(current, key), prev: _.get(prev, key),  type },
              store
            );
          }));
        }
      }
    }
  }

  /* clears value to empty object; can also remove from AsyncStorage  */
  async clear({ remove } = {}) {
    try {
      await this.setState(this.clearState);
      if (this.adapter && !!remove) await this.adapter.removeItem(this.key);
      return null;
    } catch(e) {
      this.emit('error', e);
      return Promise.reject(e);
    } finally {
      this.emit('clear');
    }
  }

  async reset(values = {}) {
    try {
      return this.setState({ ...this.initialState, ...values });
    } catch(e) {
      this.emit('error', e);
      return Promise.reject(e);
    } finally {
      this.emit('reset', this.state);
    }
  }

  subscribe(name, listener) {
    this.on(name, listener);
    return () => { this.off(name, listener); };
  }

  async hydrate(conf = {}) {
    const {
      initialState = _.clone(this.initialState),
      mergeInitialState = this.mergeInitialState,
      reset,
      persistBlacklist = this.persistBlacklist,
      persistWhitelist = this.persistWhitelist
    } = conf;

    this.hydratedState = { ...initialState };
    let iVal = initialState;
    let persisted = {};
    if (this.adapter && !reset) {
      const pRaw = await this.adapter.getItem(this.key);
      persisted = !!pRaw ? this.parse(pRaw) : {};
      if (persistBlacklist) persisted = _.omit(persisted, persistBlacklist);
      if (persistWhitelist) persisted = _.pick(persisted, persistWhitelist);
      if (mergeInitialState) iVal = _.assign({}, iVal, persisted);
      else if (!_.isEmpty(persisted)) iVal = persisted;
    }
    return this.setState(iVal);
  }

  get state() { return this.parse(this.__state); }
  write(v) { this.__state = this.format(v); return; }

  /* NOTE: strict params! */
  static createStore(_key, _conf, opts) {
    const key = _.clone(_key);
    let conf = _.clone(_conf);
    const errPfx = '[Storage.createStore]:';
    let store;
    const { adapter, autoInit, name = key } = conf;
    try {
      if (!_.isString(key)) throw new Error(`${errPfx} key is required`);
      if (!_.isPlainObject(conf)) conf = {};
      if (storeKeySet.has(key)) {
        throw new Error(`${errPfx} duplicate store key ${key}`);
      }
      if (storeNameMap.has(name)) {
        throw new Error(`${errPfx} duplicate store name ${name}`);
      }
      /* unless adapter is explicitly set to false, check for
       * custom instance creation method (varies by platform)
       * or just use the default adapter as-is
       */
      if (!adapter && adapter !== false) {
        conf.adapter = createAdapterInstance?.(conf) || defaultAdapter;
      }

      store = new Storage(key, { name, key, ...conf });
      storeMap.set(store.key, store);
      storeNameMap.set(store.name, store.key);
      storeKeySet.add(store.key);

      if (autoInit !== false && opts?.init !== false) store.init(conf);
      else if (conf.reset) store.hydrate(conf);
      return store;
    } catch(e) {
      store = null;
      return e;
    }
  }

  static getStore(nameOrKey) {
    let key;
    if (storeKeySet.has(nameOrKey)) key = nameOrKey;
    else if (storeNameMap.has(nameOrKey)) {
      key = storeNameMap.get(nameOrKey);
    }
    if (!key) return undefined;
    return storeMap.get(key);
  }

  static getOrCreateStore(_key, _conf, createOpts) {
    let key = _.clone(_key);
    let conf = _.clone(_conf);
    let opts = _.clone(createOpts);
    if (!_.isString(key)) {
      if (_.isPlainObject(key)) conf = key;
      else if (!conf) conf = {};
      key = conf.key || 'defaultStore';

      if (_.isPlainObject(_conf) && !createOpts) opts = _conf;
    }

    if (!_.isPlainObject(conf)) conf = {};
    let store = Storage.getStore(key);
    if (!store) store = Storage.createStore(key, conf, opts);
    return store;
  }


  /* optional – allows "pre-assembly" of existing stores */
  static async preAssembleStores(conf) {
    const {
      adapter = defaultAdapter, keys: _keys = [], stores, ...rest
    } = conf;
    try {
      const keys = _.uniq(_.concat([], _keys, _.keys(stores)));

      if (_.isFunction(adapter?.ready)) await adapter.ready();
      await Promise.all(_.map(keys, async(key) => {
        const passed = stores?.[key] || {};
        const storeConf = { adapter, ...rest, key, name: key, ...passed };
        const store = Storage.getOrCreateStore(storeConf, { init: false });
        await store.init(storeConf);
        return Promise.resolve();
      }));

      return storeMap;
    } catch(e) {
      throw new Error(e);
    }
  }
}
export const preAssembleStores = Storage.preAssembleStores;
export const getOrCreateStore = Storage.getOrCreateStore;
