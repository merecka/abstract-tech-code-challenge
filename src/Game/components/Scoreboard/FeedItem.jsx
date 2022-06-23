import React from "react";
import { Text, View } from "@abst/web-components";
import { useRounds } from "@src/Game/hooks";
import { useRound } from "../../hooks/useRound";

/*
 * NOTE: props.score should be displayed via an internal value instead of using
 * the passed prop directly. Eventually, when the round is complete and the
 * score updates, we'll animate the value change, so we're handling the first
 * part of that process (storing the score as an internal, independent value)
 * now to minimize the technical debt we'll incur later on when we implement the
 * animation, which will rely on the internal value.
 *
 *
 * REFACTOR HINT: several hooks within `@abst/hooks` use this basic pattern
 * (store ref value -> assign changes to ref.current -> manually update)
 * internally, so the refactored function component should be relatively simple.
 */
export function FeedItem({ index }) {
  const round = useRound(index) || {};
  const Rounds = useRounds();
  const _round = Rounds.all[index];

  const {
    jersey: jerseyNumber,
    displayFirstLast: name,
    positionCode,
  } = round.player;

  const { fullName: teamName } = round.team;

  /* normalizes the score value */
  const roundScore = _.isFinite(_round.score) ? _.round(_round.score) : 0;

  return (
    <View className="list-item" xs={12}>
      <View className="data-wpr">
        <View className="player-num-wpr">
          <Text className="player-num" t={jerseyNumber || "--"} />
        </View>
        <View className="data-ctr">
          <View className="primary">
            <Text className="player-name" t={name || "N/A"} />
          </View>
          <View className="secondary">
            <Text className="position" t={`${positionCode},`} />
            <Text className="team" t={teamName} />
          </View>
        </View>
      </View>
      <View className="score-wpr">
        <Text className="score" t={roundScore} />
      </View>
    </View>
  );
}
