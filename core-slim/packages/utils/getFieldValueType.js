
/**
 * @method getFieldValueType
 * @memberof module:@abst/utils
 * @alias module:@abst/utils.getFieldValueType
 * @desc when given field type, returns the native data type
 * @param     {string} type field type
 * @return    {string} native type
 */
export const getFieldValueType = (type) => {
  switch(type) {
    case 'code':
    case 'color':
    case 'email':
    case 'html':
    case 'key':
    case 'password':
    case 'relationship':
    case 'select':
    case 'text':
    case 'textarea':
    case 'url':
      return 'string';

    case 'geopoint':
    case 'localfile':
    case 'location':
    case 'markdown':
    case 'money':
    case 'name':
    case 's3file':
      return 'object';

    case 'datearray':
    case 'list':
    case 'localfiles':
    case 'numberarray':
    case 'textarray':
      return 'array';

    case 'boolean':
      return 'boolean';

    case 'datetime':
    case 'date':
      return 'date';

    case 'number':
      return 'number';
    default: return null;
  }
};
