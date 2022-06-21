/**
 * @method bindToService
 * @memberof module:@abst/utils
 * @desc binds functions and assigns all other items in passed object to child service
 * @param {object} obj object of items to bind/assign to child service
 * @return {undefined}
 */
export function bindToService(obj) {
  _.each(obj, (_thing, name) => {
    const thing = obj[name];
    if (_.isFunction(thing)) this[name] = thing.bind(this);
    /* bind first dir down at path */
    else if (_.isPlainObject(thing)) {
      this[name] = {};
      _.each(thing, (subThing, subName) => {
        if (_.isFunction(subThing)) this[name][subName] = subThing.bind(this);
        else this[name][subName] = subThing;
      });
    } else this[name] = thing;
  });
}
