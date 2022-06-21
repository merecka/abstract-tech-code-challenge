import { useMemo } from 'react';
import { create } from 'nano-css';
import { addon as Cache } from 'nano-css/addon/cache';
import { addon as Important } from 'nano-css/addon/important';
import { addon as Keyframes } from 'nano-css/addon/keyframes';
import { addon as Nesting } from 'nano-css/addon/nesting';
import { addon as Prefixer } from 'nano-css/addon/prefixer';
import { addon as Rule } from 'nano-css/addon/rule';
import { addon as Sheet } from 'nano-css/addon/sheet';
import { addon as Unitless } from 'nano-css/addon/unitless';

const addonMap = {
  important: Important,
  keyframes: Keyframes,
};
let ctr = 0;
function createNano(addons) {
  try {
    const nano = create({ pfx: `core-${(ctr++)}-`, });
    Cache(nano);
    Nesting(nano);
    Prefixer(nano);
    Rule(nano);
    Sheet(nano);
    Unitless(nano);

    if (_.isArray(addons)) {
      _.each(addons, (addon) => {
        if (addonMap[addon]) addonMap[addon](nano);
      });
    }
    return nano;
  } catch(e) {
    return null;
  }
}

const defaultInstance = createNano();


/**
 * @hook useCssNano
 * @desc creates a customizable instance of {@link https://github.com/streamich/nano-css|nano-css};
 * used internally by other hooks; not exported from the package root.
 * @alias useCssNano
 * @memberof module:@abst/hooks
 *
 * @param {array<string>} addons
 * {@link https://github.com/streamich/nano-css/blob/master/docs/Addons.md|nano-css addons}
 * to add to the standard config. Right now, one of `important|keyframes`
 *
 * @returns {object} nano-css instance
 *
 * @example <caption>usage</caption>
 * import { useCssNano } from '@abst/hooks/useCssNano';
 * const addons = ['important', 'keyframes'];
 *
 * function Sfc() {
 *   const CssNano = useCssNano(addons);
 * }
 * @see {@link useCustomCss}
 */
export function useCssNano(addons = []) {
  const instance = useMemo(() => {
    if (!addons?.length) return defaultInstance;
    return createNano(addons);
  }, []);
  return instance;
}
