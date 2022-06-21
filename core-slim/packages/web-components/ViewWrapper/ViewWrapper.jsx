import React, { forwardRef } from 'react';
import Styles from './ViewWrapper.style';
import { useStyles } from '@abst/hooks';
import classnames from 'classnames';
import { Col } from '../Col';
import { Container } from '../Container';
import { Row } from '../Row';
import { SectionHeader } from '../SectionHeader';
import { Toolbar } from './Toolbar';
import { Loader } from '@abst/loader';
import { Result } from '../Result';

/**
 * @component ViewWrapper
 * @desc screen wrapper component
 * @memberof module:@abst/web-components
 * @alias ViewWrapper
 *
 * @prop {ReactNode} children screen content
 * @prop {string} [className] CSS class applied to outermost {@link Container} element
 * @prop {string|object} [error] error; triggers {@link Result} render if present
 * @prop {string} [id] CSS id; applied to outer {@link Row} (inside `className`)
 * @prop {array|string|object} [loaderType=['list-page']] loader configuration
 * @prop {boolean} [loading] whether loader should display instead of `children`
 * @prop {object} [result] additional props to pass to {@link Result}
 * @prop {boolean} [showToolbar=false] _**deprecated**_ whether legacy toolbar display
 * @prop {object} [style] style applied to outer {@link Row}
 * @prop {object} [wrapperStyle] style applied to outermost {@link Container} element
 *
 * @param {object} props **NOTE:** additional props are passed directly to {@link SectionHeader}
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { ViewWrapper } from '@abst/web-components';
 */
export const ViewWrapper = forwardRef(function WiewWpr(props, ref) {
  const {
    children,
    sectionHeader, style,
    styles, wrapperStyle,
    loading, loader,
    ...toSecHead
  } = props;
  const {
    actionButtons = [],
    breadcrumb = [], className, error, id, result, showToolbar = false, title
  } = toSecHead;
  const sty = useStyles(Styles, { style, styles, wrapperStyle });

  if (error) return <Result { ...{ error, ...result } } layout='inset' />;
  if (loading) return <Loader fill { ...loader } />;
  return (
    <Container { ...{ ref } }
      className={ classnames('core-view-wrapper', className) }
      style={ sty.wrapper }
    >
      <Row style={ sty.container } { ...{ id } }>
        { showToolbar && <Col xs={ 12 }><Toolbar { ...props } /></Col> }
        { (!!title || (!!breadcrumb.length || !!actionButtons.length)) &&
        <Col xs={ 12 } style={ sty.secHeadWpr } className='section-header-wpr'>
          <SectionHeader
            color='text'
            { ...{ ...toSecHead, ...sectionHeader } }
            style={ sty.secHead }
            backButton={ showToolbar ? false : props.backButton }
            actionButtons={ showToolbar ? [] : props.actionButtons }
          />
        </Col>
        }
        <Col xs={ 12 }
          align='stretch'
          style={ sty.ctrCol }
          innerStyle={ sty.ctrColInner }
        >
          { children }
        </Col>
      </Row>
    </Container>
  );
});
