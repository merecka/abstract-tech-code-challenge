/* REFACTOR */
import React, { useMemo, useState, useEffect } from 'react';
import { Clock as GClock } from '@bit/grommet.grommet.clock';
import moment from 'moment';
import classnames from 'classnames';

/* required b/c the grommet clock time parser is a disaster */
const formatDuration = (ms) => {
  const dur = moment.duration(ms);
  return `PT${_.floor(dur.asHours())}H${dur.minutes()}M${dur.seconds()}S`;
};


/**
 *
 * @component Clock
 * @desc digital clock component with animated run; extends {@link https://v2.grommet.io/clock|Grommet Clock}
 * @memberof module:@abst/web-components
 * @alias Clock
 *
 * @returns {ReactComponent}
 *
 * @param {object} props additional props are passed directly to main component
 *
 * @prop {Datetime} [end] end time for non-running clocks
 * @prop {boolean} [run] whether clock is running
 * @prop {Datetime} [start=Date.now()] timer/duration start timer
 * @prop {string} [type='digital'] oneof: `analog|digital`
 *
 * @example <caption>import</caption>
 * import { Clock } from '@abst/web-components';
 *
 * @todo Refactor; use of grommet via @bit requires messy npm config and "styled-components" module import
 */
export const Clock = function CoreClock(props) {
  const { className, end, run, start, type = 'digital', ...rest } = props;
  const [startTime, setStartTime] = useState(null); // moment obj
  const [endTime, setEndTime] = useState(null); // moment obj
  const initialDuration = useMemo(() => {
    if (!run) return null;
    return formatDuration(moment(Date.now()).diff(moment(start)));
  }, []);
  const [duration, _setDuration] = useState(initialDuration); // ISO dur string (formatted)
  const setDuration = (dur) => _setDuration(formatDuration(dur));

  /* onMount */
  useEffect(() => {
    if (start) setStartTime(moment(start)); else setStartTime(null);
    if (end) setEndTime(moment(end)); else setEndTime(null);
  }, [run]);

  /*  duration updater */
  useEffect(() => {
    let timer;
    if (startTime && run) {
      /* create timer interval */
      timer = setInterval(() => {
        const sec = moment(Date.now()).diff(startTime);
        setDuration(sec);
      }, 1000);
    } else if (startTime && endTime) {
      setDuration(endTime.diff(startTime));
    }
    return () => { if (timer) clearInterval(timer); };
  }, [endTime, startTime, run]);

  if (_.isNull(duration)) return null;
  return (
    <GClock className={ classnames('core-clock', className) }
      time={ duration }
      type={ type }
      { ...rest }
    />
  );
};
