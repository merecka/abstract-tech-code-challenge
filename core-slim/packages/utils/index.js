
/**
 * @module @abst/utils
 * @desc > A farrago of helpers that don't really fit in any single package.
 */

export * from './bindToService';
export * from './callAll';
export * from './callChain';
export * from './flatten';
export * from './formatName';
export * from './fromPath';
export * from './getDefaultValues';
export * from './getErrorMessage';
export * from './getFlexShortcode';
export * from './getId';
export * from './getIdConfig';
export * from './getMenuIcon';
export * from './optionFilters';
export * from './splitJoinedArray';

import { bindToService } from './bindToService';
export const bindToClass = bindToService;
