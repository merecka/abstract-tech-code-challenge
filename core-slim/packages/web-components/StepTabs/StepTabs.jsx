/* TODO: Needs post-refactor test */
import React, {
  forwardRef, useCallback, useImperativeHandle, useState
} from 'react';
import { Steps } from '../Steps';
import { Tabs } from '../Tabs';

/**
 * @component StepTabs
 * @desc consolidated component for rendering {@link Steps} and {@link Tabs} together
 * @memberof module:@abst/web-components
 * @alias StepTabs
 *
 * @prop {StepProps[]} steps step configuration, with additional `content|render` prop for tab body
 * @prop {number} [activeStep] current step when in uncontrolled mode
 * @prop {number} [initial=0] initially active step when in controlled mode
 * @prop {function} [onChange] callback when active step changes
 * @prop {ReactRef} [ref] ref; is given `goToStep: (step: number) => void;` @ `.current`
 * @prop {StepProps[]} [tabs] alias of `steps`
 * @prop {string} [stepDirection] alias of `{@link Steps}.direction`
 * @prop {object} [tabsProps] additional props to pass to `Tabs`
 *
 * @param {object} props **NOTE:** additional props are passed directly to {@link Steps}
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { StepTabs } from '@abst/web-components';
 */
export const StepTabs = forwardRef(function _StepTabs(props, ref) {
  const {
    activeStep, initial = 0, onChange, tabs, steps = tabs, stepDirection,
    tabsProps, ...rest
  } = props;

  const [active, setActive] = useState(initial);
  const handleChange = useCallback((nActive) => {
    setActive(nActive);
    onChange && onChange(nActive);
  }, []);

  useImperativeHandle(ref, () => ({
    goToStep: (v) => { handleChange(v); }
  }), []);

  const current = _.isFinite(activeStep) ? activeStep : active;

  return (
    <Steps { ...rest }
      current={ current }
      direction={ stepDirection }
      onChange={ handleChange }
      steps={ _.map(steps, (item) => _.omit(item, ['content', 'render'])) }
    >
      <Tabs { ...tabsProps }
        renderTabBar={ () => <div style={{ display: 'none' }} /> }
        activeKey={ current.toString() }
        tabs={ _.map(steps,
          ({ content, render }, key) => ({ content, key, render })
        ) }
      />
    </Steps>
  );
});
