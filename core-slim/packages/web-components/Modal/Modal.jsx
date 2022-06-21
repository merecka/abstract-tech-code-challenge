/* REFACTOR */
import React, { Component } from 'react';
import style from './Modal.style';
import { withStyles } from '@abst/hoc/legacy/withStyles';
import { Modal as AntModal } from 'antd';
import { Button } from '../Button';
import { Text } from '../Text';
import { View } from '../View';

/**
 * @deprecated (needs SFC replacement)
 * @component Modal
 * @desc legacy modal component
 * @memberof module:@abst/web-components
 * @alias Modal
 *
 * @todo create SFC replacement (when needed)
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 * @param {ReactRef} [ref]
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { Modal } from '@abst/web-components';
 */
class _Modal extends Component {
  constructor(props) { super(props); }
  renderHeader({ header, title, titleProps }) {
    if (!header) return null;
    if (_.isString(title)) {
      return (
        <View style={ this.props.sty.headerContainer }>
          { title ? _.isString(title)
            ? <Text { ...titleProps }>{ title }</Text>  : title
            : null
          }
        </View>
      );
    } return title;
  }

  renderFooterButtons(buttons) {
    const { sty } = this.props;
    return _.map(buttons, (button, i) => (
      <Button key={ i } style={ sty.footBtn } size='small' { ...button } />
    ));
  }

  renderFooter({ footer, footerButtons }) {
    if (!footer && _.isEmpty(footerButtons)) return null;
    return (
      <View style={ this.props.sty.footerContainer }>
        { this.renderFooterButtons(footerButtons) }
      </View>
    );
  }

  render() {
    const {
      componentProps, isOpen, handleClose, // main
      footer, footerButtons, // footer
      header, title, titleProps, // header
      ...rest
    } = this.props;

    return (
      <AntModal
        { ..._.omit(rest, ['sty']) }
        { ...componentProps }
        visible={ isOpen }
        onCancel={ handleClose }
        title={ this.renderHeader({ header, title, titleProps }) }
        footer={ this.renderFooter({ footer, footerButtons }) }
      />
    );
  }
}

_Modal.defaultProps = {
  componentProps: {},
  footer: false,
  footerButtons: [],
  handleClose: () => console.warn('Modal: No `handleClose` property passed'),
  header: true,
  isOpen: false,
  title: false,
  titleProps: { h4: true }
};

export const Modal = withStyles(style)(_Modal);
