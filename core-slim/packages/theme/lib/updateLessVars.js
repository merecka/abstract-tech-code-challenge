import chroma from 'chroma-js';

export async function updateLessVars({ colors }) {
  try {
    let payload = {
      '@brand-primary': colors.brand.primary,
      '@brand-secondary': colors.brand.secondary,
      '@brand-tertiary': colors.brand.tertiary,
      '@brand-success': colors.success.primary,
      '@brand-info': colors.info.primary,
      '@brand-warning': colors.warning.primary,
      '@brand-danger': colors.danger.primary,
      '@canvas-component': colors.canvas.component,
      '@canvas-primary': colors.canvas.primary,
      '@text-primary': colors.text.primary
    };
    payload = _.mapValues(payload, (v) => chroma(v).css());
    await window?.less?.modifyVars?.(payload);
    // console.log('updated less vars with: ', payload);
  } catch(e) {
    console.error('an error occurred while updating less', e);
  }
}
