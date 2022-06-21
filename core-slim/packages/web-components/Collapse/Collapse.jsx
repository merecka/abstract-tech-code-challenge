/* REFACTOR */
import style from './Collapse.style';
import { withStyles } from '@abst/hoc/legacy/withStyles';
import React, { Component, createRef } from 'react';

/**
 * @component Collapse
 * @memberof module:@abst/web-components
 * @alias Collapse
 * @extends Component
 * @desc Collapse with built-in transition data, useful for selectively
 * displaying information;
 *
 * @prop {ReactNode}              children
 * @prop {number}                 [closedHeight=0]  height of outerElement when
 * closed
 * @prop {(ReactElement|string)}  [innerElement='div']  element that should wrap
 * `children`
 * @prop {boolean}                [lazyLoad=false]  if true, innerElement,
 * children are not rendered until `open` is true for the first time
 * @prop {boolean}                open  whether outerElement whould be collapsed
 * @prop {ReactElement|string}    outerElement='div' element that wraps
 * innerElement, controls display, height
 * @prop {string}                 [transition='.25s ease-in-out']  any valid
 * value for CSS 'transition' attribute
 * @prop {boolean}                [unmountOnClose]  whether innerElement,
 * children should be destroyed on close
 * @prop {boolean}                [unmountOnCollapse]  alias of unmountOnClose
 * @prop {object}                 [style]  style object applied to innerElement
 * @prop {object}                 [wrapperStyle]  style object applied to
 * outerElement
 * @prop {function}               [onChange] callback; fires when value changes;
 * passed with `(open, wasOpen)` as arguments
 * @prop {function}               [onClose] callback; fires after closing
 * @prop {function}               [onOpen] callback; fires after opening
 * @prop {function}               [onWillClose] callback; fires before closing
 * @prop {function}               [onWillOpen] callback; fires before opening
 *
 * @param {object} props
 *
 * @returns {ReactComponent}
 *
 * @todo Refactor; hasn't been converted to SFC.
 **/
class _Collapse extends Component {
  constructor(props) {
    super(props);
    const { closedHeight, open, innerRef } = props;

    this.state = {
      containerHasRendered: open,
      height: open ? 'auto' : closedHeight,
      totallyClosed: !open,
      totallyOpen: open
    };
    this._isMounted;
    this._container;
    this.WprRef = this.ref || createRef();
    this.CtrRef = innerRef || createRef();
  }
  componentDidMount() { this._isMounted = true; }

  /* sets a discrete height to allow transition */
  setWrapperHeight(next) {
    if (this._isMounted) {
      this.setState({
        height: `${this.CtrRef?.current?.clientHeight}px`,
        transitioning: true
      }, next);
    }
  }

  // WprRef = (ref) => { this._wrapper = ref; }
  // CtrRef = (ref) => { if (ref) this._container = ref; }

  /* initiate a transition with future open val */
  startTransition = (wasOpen) => {
    if (this._isMounted) {
      const { onChange, onWillClose, onWillOpen } = this.props;
      this.setState({
        containerHasRendered: true,
        totallyClosed: false,
        totallyOpen: false
      }, () => {
        /* execute change callbacks */
        if (wasOpen && typeof onWillClose === 'function') onWillClose();
        else if (!wasOpen && typeof onOpen === 'function') onWillOpen();
        if (typeof onChange === 'function') onChange(!wasOpen, wasOpen);

        /* add listener */
        const wrapper = this.WprRef.current;
        this.currentWrapper = wrapper;
        this.currentWrapper.addEventListener('transitionend', this.onTransitionEnd);
        /* remove transitionstart listener */
        this.currentWrapper.removeEventListener('transitionstart', this.startTransition);
        /* start transition */
        this.setWrapperHeight(() => {
          if (wasOpen) {
            /* force layout */
            wrapper.clientHeight;
            /**
              * if closing, set the closed height;
              * when opening, height is set in setWrapperHeight;
              */
            this.setState({ height: this.props.closedHeight });
          }
        });
      });
    }
  }

  onTransitionEnd = () => {
    const { closedHeight, open } = this.props;
    const { onOpen, onClose } = this.props;
    this.setState({
      height: open ? 'auto' : closedHeight,
      [`totally${ open ? 'Open' : 'Closed' }`]: true,
      transitioning: false
    }, () => {
      /* fire post-change callbacks */
      if (open && typeof onOpen === 'function') onOpen();
      else if (!open && typeof onClose === 'function') onClose();

      /* update event listeners */
      this.currentWrapper
      .removeEventListener('transitionend', this.onTransitionEnd);
      // this._wrapper.addEventListener('transitionstart', this.startTransition);
    });
  }

  render() {
    const { containerHasRendered, totallyClosed } = this.state;
    const {
      innerElement: Inner, lazyLoad, outerElement: Outer,
      sty, unmountOnClose, unmountOnCollapse, className
    } = this.props;
    const unmount = unmountOnClose || unmountOnCollapse;
    const wrapperStyle = sty.wrapper(this.state);
    const containerStyle = sty.container(this.state);
    return (
      <Outer ref={ this.WprRef } style={ wrapperStyle } { ...{ className } }>
        { (!containerHasRendered && lazyLoad) ||
          (!this.props.open && totallyClosed && unmount)
          ? null
          : <Inner ref={ this.CtrRef } style={ containerStyle }>
            { this.props.children }
          </Inner>
        }
      </Outer>
    );
  }

  componentDidUpdate(prevProps) {
    const { open, transitionDelay } = this.props;
    const wasOpen = prevProps.open;
    if (open !== wasOpen) {
      setTimeout(() => { this.startTransition(wasOpen); }, transitionDelay);
    }
  }

  componentWillUnmount() { this._isMounted = false; }
}

_Collapse.defaultProps = {
  closedHeight: 0,
  innerElement: 'div',
  lazyLoad: false,
  outerElement: 'div',
  transition: '.25s ease-in-out',
  transitionDelay: 0
};

export const Collapse = withStyles(style)(_Collapse);
