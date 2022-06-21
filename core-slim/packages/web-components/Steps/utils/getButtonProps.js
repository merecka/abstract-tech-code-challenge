export default function getButtonProps(type) {
  const { steps, sty } = this.props;
  const { current: unctrld } = this.state;
  const { current: ctrld } = this.props;
  const current = ctrld || ctrld === 0 ? ctrld : unctrld;
  const step = steps[current] || {};
  let render = false;
  let refIndex;
  let refStep = {};
  const icon = { name: 'chevron-right', size: 'lg' };
  let iconRight = true;
  let bordered = true;
  let style = sty[`${type}Button`];
  switch(type) {
    case 'next':
      refIndex = current + 1;
      if (refIndex < steps.length) render = true;
      if (current === 0) style = {};
      break;
    case 'prev':
      refIndex = current - 1;
      if (current) render = true;
      icon.name = 'chevron-left';
      iconRight = false;
      break;
    case 'done':
      bordered = false;
      break;
    default: break;
  }
  if (render) refStep = steps[refIndex];
  const custom = step[`${type}ButtonProps`] || {};

  const labelPrefix = this.props[`${type}ButtonLabelPrefix`];
  const label = custom.label || refStep.title;

  return {
    bordered,
    icon,
    iconRight,
    onClick: () => this.handleButtonClick(refIndex),
    size: 'small',
    style,
    ...custom,
    /* these should override custom */
    label: labelPrefix ? `${labelPrefix} ${label}` : label,
    render
  };
}
