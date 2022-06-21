export * from './Button';


/**
 * @typedef ButtonProps
 * @alias ButtonProps
 * @memberof module:@abst/web-components
 * @prop {(string|boolean)} [align] sets 'alignSelf' in style. `false` unsets.
 * @prop {boolean} [bordered] button appearance type; defaults to `true` in dark mode and for icon buttons.
 * @prop {boolean} [block] whether button should consume full width of parent container.
 * @prop {(number|string)} [borderWidth=2] border width (px).
 * @prop {Color} [color='primary'] button's main color. **NOTE: label color is generated dynamically**
 * @prop {ButtonConfirmProps} [confirm] whether confirmation is required prior to executing onClick.
 * @prop {boolean} [dense] whether button should use narrow padding instead of min-width to control width.
 * @prop {boolean} [disabled] disabled flag
 * @prop {(string|object)} [icon] {@link IconProps}, or `IconProps.name` when passed as string.
 * @prop {boolean} [iconRight] renders icon to the right of label
 * @prop {boolean} [inputGroup] whether button is part of a form input group
 * @prop {string} [label] button label text
 * @prop {object} [labelProps] props passed to label's {@link Text} component.
 * @prop {boolean} [mini] whether min-width should be ignored entirely
 * @prop {boolean} [prefix] whether button is an input group prefix element.
 * @prop {object} [style] style object
 * @prop {boolean} [suffix] whether button is an input group suffix element.
 */

/**
 * @typedef {(boolean|object)} ButtonConfirmProps
 * @desc whether
 * {@link https://ant.design/components/popconfirm/|Ant Popconfirm} should
 * display before button's `onClick` is executed. Acceps all Popconfirm props
 * except `icon`, which is applied to {@link Icon}. When `true`,
 * defaults are applied. when passed as object, same
 * defaults are applied (deeply) against props passed in object.
 * @alias ButtonConfirmProps
 * @memberof module:@abst/web-components
 * @prop {string} title='Are you sure?'
 * @prop {string} okText='Yes'
 * @prop {string} cancelText='No'
 * @prop {object} icon
 * @prop {string} icon.name='exclamation-square'
 * @prop {string} icon.weight='solid'
 * @prop {string} icon.color='warning.saturated'
 * @prop {string} icon.size='sm'
 */
