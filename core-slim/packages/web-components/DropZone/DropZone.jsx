import React, { useCallback, useMemo } from 'react';
import styles from './DropZone.style';
import { useStyles } from '@abst/hooks';
import Dropzone from 'react-dropzone';
import { Card } from '../Card';
import { I } from '../Icon';
import { Text } from '../Text';
import { View } from '../View';

/**
 * @component DropZone
 * @desc File input with drag n' drop support.
 * @memberof module:@abst/web-components
 * @alias DropZone
 *
 * @prop {function} onDrop main handler callback; receives a File instance as
 * its only arugument unless `multi=true`, when it receives an array of Files.
 * @prop {object} [cardProps] props to pass to inner {@link Card} element
 * @prop {object} [cardStyle] inner card style
 * @prop {function} [children] should be a render function; receives props from react-dropzone
 * @prop {boolean} [many] whether multiple files should be accepted
 * @prop {boolean} [multi] alias, many
 * @prop {(string|boolean)} [minHeight=350] CSS min-height value for the outer component
 * @prop {object} [style] style object for outer div element
 * @prop {string} [subtitle='or click to select it']
 * @prop {string} [title='drop your file here']
 *
 * @param {object} props **NOTE:** additional props are passed directly to main component
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { DropZone } from '@abst/web-components';
 */
export function DropZone(props) {
  const {
    cardProps, cardStyle, children, many, multi, minHeight, onDrop, style,
    subtitle, title, ...rest
  } = props;

  const sty = useStyles(styles, { cardStyle, minHeight, style });
  const multiple = useMemo(() => many || multi, []);
  const handleDrop = useCallback((files) => {
    onDrop && onDrop(multiple ? files : files[0]);
  }, []);

  const Content = useCallback((passed) => {
    const {
      cardProps: _cardProps,
      getRootProps, getInputProps,
      subtitle: _subtitle = 'or click to select it',
      title: _title = 'drop your file here',
    } = passed;
    return (
      <div { ...getRootProps() }>
        <input { ...getInputProps() } />
        <Card style={ sty.ctr }
          bodyStyle={ sty.body }
          bordered={ false }
          { ..._cardProps }
        >
          <Text d3 color='tertiary' style={ sty.title }>{ _title }</Text>
          <View style={ sty.subtitleWpr }>
            <I name='file'
              size='lg'
              color='text.inverse'
              style={ sty.icon }
              weight='regular'
              onClick={ handleDrop }
            />
            <Text color='text.inverse' style={ sty.subtitle } variant='dark'>
              { _subtitle }
            </Text>
          </View>
        </Card>
      </div>
    );
  }, []);
  return (
    <Dropzone { ...{ multiple } }
      acceptStyle={ sty.wprAccept }
      disabledStyle={ sty.wprDisabled }
      rejectStyle={ sty.wprReject }
      { ...rest }
      style={ sty.wpr }
      onDrop={ handleDrop }
    >
      { children ? children : (p) =>
        <Content { ...{ ...p, cardProps, subtitle, title } } />
      }
    </Dropzone>
  );
}
