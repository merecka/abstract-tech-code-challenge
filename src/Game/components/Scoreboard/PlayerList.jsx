import React from 'react';
import { FixedSizeList } from 'react-window';
import { FeedItem } from './FeedItem';
import { useValueMemo } from '@abst/hooks';

export function PlayerList({ completeIds }) {
  const Row = useValueMemo(
    () =>
      ({ index }) =>
        (
          <div className='FeedItem'>
            <FeedItem key={index.toString()} index={index} />
          </div>
        ),
    [completeIds]
  );

  return (
    <FixedSizeList
      className='List'
      height={600}
      itemCount={completeIds.length}
      itemSize={35}
      width={220}
    >
      {Row}
    </FixedSizeList>
  );
}
