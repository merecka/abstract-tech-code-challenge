export const optionFilters = {
  labelOnly: (opts, filt) => {
    if (!filt || _.isEmpty(filt)) return opts;
    const reg = new RegExp(filt, 'i');
    return _.filter(opts, ({ label }) => (reg.test(label)));
  },
  normal: (opts, filt) => {
    if (!filt || _.isEmpty(filt)) return opts;
    const reg = new RegExp(filt, 'i');
    return _.filter(opts, ({ value, label }) => (
      reg.test(value) || reg.test(label)
    ));
  },
  valueOnly: (opts, filt) => {
    if (!filt || _.isEmpty(filt)) return opts;
    const reg = new RegExp(filt, 'i');
    return _.filter(opts, ({ value }) => (reg.test(value)));
  }
};
