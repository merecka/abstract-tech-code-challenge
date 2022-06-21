// /* NOTE: Loader can't require withStyles to avoid circular dependency */
// import React, { useEffect, useState } from 'react';
// import styles from './Loader.style';
// import { Col, Row } from 'react-grid-system';
// import { Spin } from 'antd'; /* TODO: replace this */
// import { Wrapper } from './components';
//
// const getTitle = (title) => {
//   switch(true) {
//     case !title: return 'loading...';
//     case _.endsWith(title, '...'): return title;
//     default: return `${title}...`;
//   }
// };
//
// /**
//  * @function Loader
//  * @memberof module:@abst/loader
//  * @alias module:@abst/loader/Loader
//  *
//  * @desc Loading overlay. By default, the rendered inside a Grid with a
//  * bottom margin to offset the top navbar. Passing `grid: false` will return a
//  * loader inside a `<View>` instead. Both components accept `wrapperStyle` as
//  * the override for styling, regardless of component
//  *
//  * @prop {string} [title='loading...'] main title
//  * @prop {string} [subtitle]             secondary title;
//  * @prop {object} [wrapperStyle]    style object passed to wrapping component
//  * @prop {boolean} [grid=true]         determines wrapper (see description)
//  */
// export const Loader = (props) => {
//   const { grid = true, subtitle } = props;
//   const [sty] = useState(styles({ grid, ...props }));
//   const [title, setTitle] = useState('Loading...');
//   useEffect(() => { setTitle(getTitle(props.title)); }, [props.title]);
//
//   return (
//     <Wrapper { ...{ grid, sty } }>
//       <Row justify='center' align='center'><Col xs={ 12 }>
//         <div style={ sty.title }>{ title }</div>
//       </Col></Row><Row justify='center'><Col xs={ 12 }>{ subtitle
//         ? <div style={ sty.subtitle }>{ subtitle }</div> : null
//       }</Col></Row><Row justify='center'><Col xs={ 12 }>
//         <Spin size='large' style={ sty.spinner } />
//       </Col></Row>
//     </Wrapper>
//   );
// };
