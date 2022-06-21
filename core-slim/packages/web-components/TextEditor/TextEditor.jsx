import 'react-quill/dist/quill.snow.css';
import './quillOverrides.css';
import React from 'react';
import style from './TextEditor.style';
import { useStyles } from '@abst/hooks';
import ReactQuill from 'react-quill';
import { Text } from '../Text';

/**
 * @component TextEditor
 * @desc legacy rich text input component
 * @memberof module:@abst/web-components
 * @alias LegacyTextEditor
 *
 * @deprecated (awaiting replacement in `form-web`)
 * @todo needs refactor/better support
 *
 * @param {object} props
 *
 * @returns {ReactComponent}
 *
 * @example <caption>import</caption>
 * import { TextEditor } from '@abst/web-components';
 */
export const TextEditor = (props) => {
  const sty = useStyles(style);
  const {
    label, meta: { error, touched }, labelProps = {},
    input: { onBlur = () => {}, ...input } = {},
  } = props;
  return (
    <div style={ sty.wrapper }>
      <Text { ...labelProps }>{ label }</Text>
      <div style={ sty.editorWrapper }>
        <ReactQuill
          { ...input }
          onBlur={ () => onBlur() }
          style={ sty.editor }
          theme='snow'
        />
      </div>
      <div>
        { touched && error && <span>{error}</span> }
      </div>
    </div>
  );
};
