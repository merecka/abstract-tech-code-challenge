import config from '@abst/config';

const toKey = (name) => `${name}_${config.env}`;

/* any additional config */
const storeConfigs = {
  data: {
    initialState: {
      lastFetch: null,
      loading: true,
      playerCount: null,
      players: [],
      playerIds: [],
      teams: [],
    },
    persistBlacklist: ['loading']
  },
  game: {
    initialState: {
      id: null,
      isCreating: false,
      isRestarting: false,
      mode: null,
      queue: [],
      prevIds: [],
      phase: null,
      round: null,
      totalRounds: null,
      remainingRounds: null,
      rounds: [],
      startTime: null,
    },
    persistBlacklist: ['isCreating', 'isRestarting']
  },
  gameLogs: {
    initialState: {
      games: [],
      rounds: [],
      stats: {}
    }
  }
};

export const stores = _.mapValues(storeConfigs, (conf, name) => ({
  ...conf,
  name,
  key: toKey(name)
}), {});
