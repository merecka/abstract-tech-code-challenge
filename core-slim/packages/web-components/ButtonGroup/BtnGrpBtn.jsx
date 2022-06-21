import React, { useContext } from 'react';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { View } from '../View';
import { BtnGrpContext } from './BtnGrpContext';

function withBtnGrp(Composed) {
  return function WithBtnGrp({ index }) {
    const { getItem } = useContext(BtnGrpContext);

    return <Composed { ...getItem(index) } />;
  };
}

function getTooltip(v) {
  if (_.isString(v)) return { content: v, placement: 'bottom' };
  return { placement: 'bottom', ...v };
}

function Ctr({ children, tip }) {
  if (!tip) return <>{ children }</>;
  return (
    <Tooltip { ...{ ...getTooltip(tip), children } } />
  );
}

export const BtnGrpBtn = withBtnGrp(function _BtnGrpBtn(props) {
  const { El, button, tooltip, valid, wrapper } = props;

  if (valid) {
    return (
      <View { ...wrapper }><Ctr tip={ tooltip }>
        { El
          ? <El { ...button } />
          : <Button { ...button } />
        }
      </Ctr></View>
    );
  }
  return null;
});
