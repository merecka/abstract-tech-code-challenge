const notSupported = {
  backgroundColor: 'color',
  backgroundType: 'color',
  borderColor: 'bordered={ true }, color',
  hoverColor: false,
  iconStyle: 'icon.style',
  iconColor: 'color',
  iconColorType: 'color',
  iconPack: 'icon.weight',
  iconVariant: 'color',
  labelPosition: 'iconRight',
  labelColor: false,
  labelColorType: false,
  labelVariant: false,
  variant: false
};

const deprecated = {
  buttonType: false,
  flat: false,
  raised: false,
};

export default (propKeys) => {
  _.map(propKeys, (key) => {
    if (key in notSupported) {
      console.error(`${key} is no longer supported.${notSupported[key] ?
        ' Use ' + notSupported[key] + ' instead.' : ''}`);
    } else if (key in deprecated) {
      console.warn(`${key} is deprecated.${deprecated[key] ?
        ' Use ' + deprecated[key] + ' instead.' : ''}`);
    }
  });
};
