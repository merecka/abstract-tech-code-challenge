
export async function addRound(state) {
  if (_.isEmpty(state.queue)) return;

  const player = state.queue.shift();
  state.remainingRounds = state.queue.length;

  let pool = [...state.queue];
  if (pool.length < 100) pool = [...pool, ...state.prevIds];
  const rando = () => pool[_.random(pool.length)];

  const options = _.reduce(_.range(8), (memo) => {
    let opt;
    do opt = rando();
    while (!_.isFinite(opt) || _.includes([...memo, player], opt));

    memo.push(opt);
    return memo;
  }, []);

  const [before, ...after] = _.chunk(options, _.random(1, 9));

  const round = {
    game: state.id,
    player,
    options: _.flatten(_.concat([], before || [], player, after || [])),
    round: state.rounds.length,
    isComplete: null,
    delay: null,
    response: null,
    isCorrect: null,
    score: null
  };

  state.rounds.push(round);
  state.prevIds.push(player);

  return;
}
