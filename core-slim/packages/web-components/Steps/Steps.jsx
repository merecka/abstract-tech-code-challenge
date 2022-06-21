/* REFACTOR */
import styles from './Steps.style';
import React, { PureComponent } from 'react';
import { withStyles } from '@abst/hoc/legacy/withStyles';
import { Button } from '../Button';
import { Col } from '../Col';
import { I } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';
import { Steps as AntSteps } from 'antd';
import utils from './utils';
const omitted = ['clickableSteps', 'steps', 'stepPosition'];
const iconProps = {
  wait: { weight: 'light', color: 'secondary' },
  process: { weight: 'duotone', color: 'primary' },
  finish: { weight: 'duotone', color: 'success' }
};
const { Step } = AntSteps;
/**
 * @typedef {object} StepProps
 * @desc step item configuration
 * @alias StepProps
 * @memberof module:@abst/web-components
 * @prop {string} title step title
 * @prop {string} [description] step description
 * @prop {boolean} [disabled] step clickability flag
 * @prop {IconProps} [icon] step icon configuration (replaces step number)
 * @prop {object} [...rest] {@link https://ant.design/components/steps/?theme=dark#Steps.Step|Antd Steps.Step} props
 */

/**
 * @component Steps
 * @desc animated stepper component with control buttons; can be used as
 * controlled or uncontrolled component via `current` prop
 * @memberof module:@abst/web-components
 * @alias Steps
 *
 * @prop {StepProps[]} steps step configuration
 * @prop {boolean} [buttonsAbove] whether buttons should render above children
 * @prop {boolean} [buttonsBelow] whether buttons should render below children
 * @prop {number} [current] active step in uncontrolled mode
 * @prop {boolean} [clickableSteps=true] clicking on steps should trigger active step change
 * @prop {object} [contentColProps] additional {@link Col} props to apply to content wrapper
 * @prop {string} [direction='horizontal'] direction steps should be organized; one of `horizontal|vertical`
 * @prop {boolean} [initial] initially selected step index when in uncontrolled mode
 * @prop {function} [onChange] callback when active step changes
 * @prop {number} [stepColWidth] step width control; should be set if `direction='vertical'`
 * @prop {string} [stepPosition] where steps should render relative to children; one of `bottom|left|right|top`
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @todo refactor to SFC
 *
 * @example <caption>import</caption>
 * import { Steps } from '@abst/web-components';
 */
class _Steps extends PureComponent {
  constructor(props) {
    super(props);
    let stepColProps = { xs: 12 };
    let contentColProps = { xs: 12 };
    if (props.direction === 'vertical') {
      if (_.isFinite(props.stepColWidth)) {
        stepColProps = { xs: props.stepColWidth };
        contentColProps = { xs: 12 - props.stepColWidth };
      } else {
        stepColProps = { autoSize: true };
        contentColProps = {};
      }
    }
    this.state = {
      current: _.parseInt(props.initial) || 0,
      stepColProps,
      contentColProps
    };

    _.each(_.keys(utils), (name) => { this[name] = utils[name].bind(this); });
  }

  getSteps = (current) => {
    const { clickableSteps, steps, sty } = this.props;
    return _.map(steps, (item, index) => {
      const { description, disabled, icon, title, ...step } = item;
      let { status } = step;
      if (!status) {
        switch(true) {
          case index === current: status = 'process'; break;
          case index < current: status = 'finish'; break;
          default: status = 'wait'; break;
        }
      }

      const _icon = _.isString(icon) ? { name: icon } : icon;
      const iconConf = { ...iconProps[status], ..._icon };
      return (
        <Step { ...{ ...step, status } }
          disabled={ disabled || !clickableSteps }
          className={ icon && 'custom-icon' }
          key={ index }
          icon={ icon && <I { ...iconConf } id='custom-icon' /> }
          description={ description &&
            <Text em style={ sty.description }>{ description }</Text>
          }
          title={ <Text b style={ sty.title }>{ _.startCase(title) }</Text> }
        />
      );
    });
  }

  handleButtonClick = (index) => this.setState({ current: index }, () => {
    if (_.isFunction(this.props.onChange)) this.props.onChange(index);
  })

  get NextButton() {
    const { render, ...props } = this.getButtonProps('next');
    if (render) return <Button color='brand.primary' { ...props } />;
    return null;
  }

  get PrevButton() {
    const { render, ...props } = this.getButtonProps('prev');
    if (render) return <Button color='brand.primary' { ...props } />;
    return null;
  }

  get Buttons() {
    return (
      <Row><Col xs={ 12 } justify='center'><Row>
        <Col xs={ 6 } justify='end'>{ this.PrevButton }</Col>
        <Col xs={ 6 } justify='start'>{ this.NextButton }</Col>
      </Row></Col></Row>
    );
  }

  render() {
    const { contentColProps, current: unctrld, stepColProps } = this.state;
    const {
      buttonsAbove, buttonsBelow, direction, children, current: ctrld, sty,
      ...props
    } = this.props;
    const current = ctrld || ctrld === 0 ? ctrld : unctrld;
    return (
      <Row style={ sty.wrapper } className='abst-steps' nogutter>
        <Col { ...stepColProps }>
          <AntSteps { ...{ current, direction, ..._.omit(props, omitted) } }>
            { this.getSteps(current) }
          </AntSteps>
        </Col><Col { ...contentColProps }>
          { buttonsAbove ? this.Buttons : null }
          { children }
          { buttonsBelow ? this.Buttons : null }
        </Col>
      </Row>
    );
  }
}

_Steps.defaultProps = {
  buttonsAbove: true,
  buttonsBelow: false,
  clickableSteps: true,
  direction: 'horizontal',
  steps: []
};
// _Steps.propTypes = {
//   current: Types.oneOfType([Types.string, Types.number]),
//   direction: Types.oneOf(['horizontal', 'vertical']).isRequired,
//   doneButtonProps: Types.object,
//   onChange: Types.func,
//   steps: Types.arrayOf(Types.shape({
//     title: Types.string,
//     icon: Types.oneOfType([Types.string, Types.object]),
//     nextButtonProps: Types.object,
//     prevButtonProps: Types.object
//   })),
//   stepColWidth: Types.number,
//   nextButtonLabelPrefix: Types.string,
//   prevButtonLabelPrefix: Types.string,
//
// };

export const Steps = withStyles(styles)(_Steps);
