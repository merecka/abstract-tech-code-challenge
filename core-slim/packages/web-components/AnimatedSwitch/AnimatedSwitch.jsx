import React, { useCallback, useMemo } from 'react';
import './AnimatedSwitch.style.less';
import {
  CSSTransition,
  SwitchTransition,
} from 'react-transition-group';
import { Route, Switch } from 'react-router';
const types = ['fade', 'glide'];

export function AnimatedSwitch(props) {
  const endListener = useCallback((node, done) => {
    node.addEventListener('transitionend', done, false);
  }, []);
  const { children, location, type, inOut } = props;
  const mode = useMemo(() => inOut === true ? 'in-out' : 'out-in', []);

  const classNames = useMemo(() => {
    const _type = _.includes(types, type) ? type : 'fade';
    return `core-animated-switch-${_type}`;
  }, [type]);

  return (
    <SwitchTransition { ...{ mode } }>
      <CSSTransition { ...{ classNames } }
        addEndListener={ endListener }
        key={ location.pathname || location.key }
        timeout={ 250 }
      >
        <Switch { ...{ children, location } } />
      </CSSTransition>
    </SwitchTransition>
  );
}

AnimatedSwitch.Route = Route;
