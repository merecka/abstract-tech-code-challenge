import React from "react";
import { css } from "./Scoreboard.style";
import { useCss, useValueMemo } from "@abst/hooks";
import { Text, View } from "@abst/web-components";
import { useRounds, useGame } from "@src/Game/hooks";
import { FeedItem } from "./FeedItem";

export function Scoreboard(/* props */) {
  const cls = useCss(css);
  const Rounds = useRounds();
  const {
    complete,
    current: { round },
  } = Rounds;

  const completeIds = useValueMemo(
    () => _.map(complete, "player"),
    [complete.length]
  );

  const totalScore = useValueMemo(
    () => _.sumBy(complete, "score"),
    [complete.length]
  );

  return (
    <View className={cls.wpr}>
      <Text
        d4
        className="round"
        t={`Round ${_.isFinite(round) ? round + 1 : "--"}`}
        color="text"
      />
      <Text
        d6
        className="total-score"
        t={`Score: ${totalScore}`}
        color="text"
      />
      <View className={cls.list}>
        {
          /* HINT: useRound() does all of this more efficiently...
           * All these lookups occur on every render.
           * in other words, this is real bad.
           */
          _.map(completeIds, (id, index) => {
            return <FeedItem key={index.toString()} index={index} />;
          })
        }
      </View>
    </View>
  );
}
