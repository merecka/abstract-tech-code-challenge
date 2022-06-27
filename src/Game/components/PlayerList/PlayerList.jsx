import React from "react";
import { css } from "./Scoreboard.style";
import { useCss, useValueMemo } from "@abst/hooks";
import { Text, View } from "@abst/web-components";
import { useRounds, useGame } from "@src/Game/hooks";
import { FeedItem } from "./FeedItem";
import { FixedSizeList as List } from 'react-window';

export function PlayerList({completeIds}) {
  const cls = useCss(css);

import './styles.css';

const Row = ({ index, style }) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
);

const Example = () => (
  <List
    className="List"
    height={150}
    itemCount={1000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);

ReactDOM.render(<Example />, document.getElementById('root'));


  return (
    
  );
}
