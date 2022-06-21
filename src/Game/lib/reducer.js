/* eslint-disable no-case-declarations */
import { createGame } from './createGame';
import { addRound } from './addRound';

const phases = ['pregame', 'countdown', 'active', 'over'];
const sleep = async(delay) => new Promise((res) => { setTimeout(res, delay); });
export async function reducer(state, { type, payload, meta = {}}, store) {
  console.log(`[Game action]: ${type}`, payload);
  try {
    switch(type) {
      case 'add round':
        await addRound(state);
        break;

      case 'advance phase':
        /* ******************************************** [BEGIN] nested swtich */
        switch(true) {
          case _.includes(phases, payload): state.phase = payload; break;
          case state.phase === _.last(phases):
            console.warn('[Game]: cannot advance beyond final phase');
            break;
          case !state.phase: state.phase = phases[0]; break;
          default:
            state.phase = phases[_.indexOf(phases, state.phase) + 1];
            break;
        }
        /* ********************************************** [END] nested switch */
        break;

      case 'cleanup':
        if (!_.isFinite(_.last(state.rounds).response)) {
          state.rounds = _.dropRight(state.rounds);
          /* remove unused prevId and re-add it to queue */
          state.queue.unshift(state.prevIds.pop());
        }

        break;

      case 'create':
        state = await store.setState({ phase: phases[0], isCreating: true });
        await createGame(state, payload, meta);
        await addRound(state);
        state.phase = 'countdown';
        state.startTime = new Date();
        break;

      case 'submit':
        const round = state.rounds[state.round];
        _.assign(round, {
          ...meta,
          isComplete: true,
          response: payload,
          isCorrect: payload === round.player,
        });
        /* do an intermediate update so UI can update */
        await store.setState({ rounds: state.rounds });
        /* U/x: throttle round change so result UI can display real quick */
        await sleep(1000);
        if (round.isCorrect) {
          /*
           * NOTE: subscription in withGame should usually pre-load the next
           * round; this is here as a fallback
           */
          if (!state.rounds[state.round + 1]) await addRound(state);
          state.round++;
        } else state.phase = _.last(phases);
        break;

      default:
        console.warn(`[Game]: unknown action ${type}`);
        return state; /* NOTE: <-- bails out of post-processing */
    }
  } catch(e) {
    console.error(e);
    state.error = e;
  }

  /* clear flags */
  if (state.phase !== phases[0]) {
    state.isCreating = false;
    state.isRestarting = false;
  }

  return state;
}
