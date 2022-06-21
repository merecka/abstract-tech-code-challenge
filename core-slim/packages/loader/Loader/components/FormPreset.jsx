import React, { Fragment } from 'react';
// import { SectionHeader } from './SectionHeaderPreset';

export function Form({ rows, rowHeight = 48 }) {
  const btnY = (rows * rowHeight) + 82;
  return (
    <>
      {/* <SectionHeader /> */}
      {/* ROWS */}
      { _.map(_.range(rows), (i) => {
        const rectY = 66 + (rowHeight * i);
        return (
          <Fragment key={ i }>
            <rect width='254' height='14' x='0' y={ rectY } rx='4' />
            <rect width='1062' height='32' x='538' y={ rectY } rx='8' />
          </Fragment>
        );
      }) }
      {/* SUBMIT */}
      <rect width='119' height='38' x='1481' y={ btnY } rx='8'/>
      <rect width='119' height='38' x='1346' y={ btnY } rx='8'/>
    </>
  );
}
