import { getId } from '@abst/utils';
const modes = ['7sec', 'L2M'];
export async function createGame(state, payload, dataState) {
  state.id = getId(12);
  state.queue = _.shuffle(dataState.playerIds);
  state.mode = _.includes(modes, payload.mode)
    ? payload.mode
    : state.mode || modes[0];
  state.round = 0;
  state.totalRounds = state.queue.length;
  return;
}
