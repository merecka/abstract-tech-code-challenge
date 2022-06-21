import React, { useState } from 'react';
import styles from './SectionHeader.style';
import { Col } from '../Col';
import { Row } from '../Row';
import { Text } from '../Text';
import { View } from '../View';
import { ActionButtons } from './ActionButtons';
import { BackButton } from './BackButton';
import { Breadcrumb } from './Breadcrumb';
import { useStyles } from '@abst/hooks';

/**
 * @typedef {object} BreadcrumbProps
 * @desc section header breadcrumb entry configuration
 * @alias BreadcrumbProps
 * @memberof module:@abst/web-components
 * @prop {string} label display text
 * @prop {string} slug route pathname
 */

/**
 * @component SectionHeader
 * @desc screen section section/subsection header component
 * @memberof module:@abst/web-components
 * @alias SectionHeader
 *
 * @prop {string} title main section/subsection title
 * @prop {ButtonProps[]} [actionButtons] {@link ActionButtons} to display opposite the title/subtitle
 * @prop {boolean} [backButton=false] whether to show the "back" icon left of the title
 * @prop {boolean} [bordered=true] whether bottom border should be shown
 * @prop {Color} [borderColor='canvas.inverse' (faded)] bottom border color
 * @prop {number} [borderWidth=1] bottom border width
 * @prop {BreadcrumbProps[]} [breadcrumb=[]] screen's parent nesting path
 * @prop {Color} [color='primary'] title/subtitle color
 * @prop {string} [className] CSS class to apply to the outer div ({@link Row}) element
 * @prop {ReactComponent} [extra] additional content to display on right side (replaces actionButtons)
 * @prop {object} [headerStyle] alias of `style`
 * @prop {string} [innerClassName] CSS class to apply to the container div ({@link View}) element
 * @prop {object} [style] style to apply to outer {@link Row} element
 * @prop {boolean} [subSection] alias of `subsection`
 * @prop {boolean} [subsection=false] whether elements should be styled as subhead
 * @prop {string} [subtitle] section/subsection secondary title
 * @prop {object} [titleStyle] style to apply to the title {@link Text} component
 * @prop {object} [wrapperStyle] alias of `style`
 *
 * @param {object} props
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { SectionHeader } from '@abst/web-components';
 */
export const SectionHeader = function _SectionHeader(props) {
  const sty = useStyles(styles, props);
  const {
    breadcrumb = [],
    actionButtons,
    backButton = false,
    className,
    extra,
    innerClassName,
    subtitle,
    title
  } = props;
  const [hasBreadcrumb] = useState(!_.isEmpty(breadcrumb));

  return (
    <Row nogutter style={ sty.wrapper } className={ className }>
      <Col align='center'
        style={ sty.titleWrapper }
        innerStyle={ sty.titleWrapperInner }
      >
        <View style={ sty.titleContainer } className={ innerClassName }>
          { hasBreadcrumb
            ? <Breadcrumb { ...{ breadcrumb } } />
            : <>
              { backButton && <BackButton { ...backButton } /> }
              { _.isString(title)
                ? <Text id='title' h4 style={ sty.titleText } t={ title } />
                : title
              }
              { subtitle?.length && <View style={ sty.subtitleWrapper }>
                <Text style={ sty.subtitleText } t={ subtitle } />
              </View>
              } </>
          }</View>
      </Col>
      { !extra && _.isEmpty(actionButtons) ? null
        : <Col style={ sty.actionButtonWrapper } autoSize justify='end'>
          { extra ? extra : <ActionButtons buttons={ actionButtons } /> }
        </Col>
      }
    </Row>
  );
};
