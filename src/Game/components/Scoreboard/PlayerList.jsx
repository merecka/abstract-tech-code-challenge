import React from "react";
import { FixedSizeList } from "react-window";
import { FeedItem } from "./FeedItem";

export function PlayerList({ completeIds }) {
  console.log(completeIds);
  const Row = ({ index, style }) => (
    <div className="FeedItem">
      <FeedItem key={index.toString()} index={index} />
    </div>
  );

  return (
    <FixedSizeList
      className="List"
      height={150}
      itemCount={completeIds.length}
      itemSize={35}
      width={200}
    >
      {Row}
    </FixedSizeList>
  );
}
