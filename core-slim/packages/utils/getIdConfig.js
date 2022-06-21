/* returns valid field config object for given id path */
export const getIdConfig = (idPath) => ({
  label: 'ID',
  options: { hidden: true, noedit: true },
  path: idPath,
  type: 'key',
  typeDescription: 'key',
  __options: { defaultValue: '' },
  __size: 'full',
  _path: { parts: [idPath]},
  _defaultSize: 'full',
  _properties: ['hidden', 'noedit'],
  _underscoreMethods: [],
  isId: true
});
