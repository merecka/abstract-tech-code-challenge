import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback
} from 'react';
import { css } from './ShotClock.style';
import { useCss, useMeasure, useUpdate } from '@abst/hooks';
import { Text, View } from '@abst/web-components';
import numeral from 'numeral';
import cn from 'classnames';

export const ShotClock = forwardRef(function _ShotClock(props, ref) {
  const { autoStart, className, onValueChange, seconds = 7 } = props;
  const [wprRef, dimens] = useMeasure();
  const update = useUpdate();
  const cls = useCss(css, _.pick(dimens, ['width', 'height']));
  const Value = useRef(seconds);
  const Timer = useRef();
  const Color = useRef('text');
  const stop = useCallback(() => {
    if (Timer.current) clearInterval(Timer.current);
    return;
  }, []);

  const start = useCallback((onEnd) => {
    /* create a new timer */
    Timer.current = setInterval(() => {
      if (!_.isFinite(Value.current)) Value.current = seconds;
      else if (Value.current > 0) {
        Value.current = _.round(Value.current - 0.1, 1);
      } else { onEnd?.(); stop(); }
      onValueChange?.(Value.current);
      update();
    }, 100);
  }, []);

  /* create ref handle for outer components */
  useImperativeHandle(ref, () => ({
    get clear() {
      return () => {
        stop();
        Value.current = null;
      };
    },
    get restart() {
      return (onEnd) => {
        const ret = _.isFinite(Value.current) ? _.clone(Value.current) : null;
        this.clear();
        this.start(onEnd);
        return ret;
      };
    },
    start,
    get stop() { return stop; },
    get value() { return Value.current; },
  }), []);

  useEffect(() => {
    let clr = 'text';
    switch(true) {
      case (!_.isFinite(Value.current)): break;
      // case Value.current <= 3.1: clr = 'danger'; break;
      case Value.current <= 5.1: clr = 'danger'; break;
      default: break;
    }
    Color.current = clr;
  }, [_.round(Value.current)]);

  /* stop on unmount */
  useEffect(() => {
    if (!!autoStart) start();
    return stop;
  }, []);

  return (
    <View ref={ wprRef }
      className={ cn('shot-clock', cls.wpr, Color.current, {
        zero: Value.current <= 0
      }, className) }>
      <View className='ctr'>
        <Text
          className={ 'time' }
          t={ _.isNull(Value.current)
            ? '--'
            : numeral(Value.current).format(
              Value.current >= 5 ? '0' : '0.0'
            )
          }
        />
      </View>
    </View>
  );
});
