# Href
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Href](#Href)
	- [Configuration](#configuration)
	- [Examples](#examples)
		- [Buttons](#buttons)
		- [Other Components](#other-components)
		- [Complex Router Config](#complex-router-config)
		- [With Children](#with-children)

<!-- /TOC -->
a handy component for creating `react-router-redux`-connected elements

## Configuration
| Property  |               Options                |  Default  |                                             Description                                              |
| --------- | ------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------- |
| type      | enum: raised, flat, icon             | raised    | shorthand for [material-ui buttons](http://www.material-ui.com/#/components/raised-button) |
| to        | string or object                     | undefined | valid [react-router link config](https://reacttraining.com/react-router/web/api/Link)                |
| navMethod | push, replace, go, goBack, goForward | push      | valid [react-router history method](https://reacttraining.com/react-router/web/api/history)          |
| component | React Component                      | undefined | component which accepts onClick or onClick as a Property                                          |

## Examples
### Buttons
A shorthand has been implemented for buttons, which are the most common use scenario:
```jsx
import { Href } from '@abst/web-components';

// other
// ...
// code

<Href
  // standard config
  type='flat'
  to={ '/some/valid/path' }

  // material-ui FlatButton config
  icon={
    <FontIcon
      className='fa fa-pied-piper'
      style={ sty.icon }
    />
  }
  label='Button Text'
  labelPosition='before'
/>
```

### Other Components
Any clickable component can be used by adding the `component` property
```jsx
import { Href } from '@abst/web-components';

<Href
  component={ MenuItem }
  to={ '/some/valid/path' }
  rightIcon={
    <FontIcon
      className='fa fa-pied-piper'
      style={ sty.icon }
    />
  }
  primaryText='Menu Item Text'
/>
```

### Complex Router Config
You can pass any valid react-router link configuration to the `to` property
```jsx
import { Href } from '@abst/web-components';

// note: `type` defaults to 'raised'
<Href
  to={{
    pathname: '/some/valid/path',
    state: {
      here: 'are',
      some: 'router',
      state: 'props',
      to: 'pass'
    }
    }}
  }
  label={ `I'ma gonna pass some state props via router, even though it's unnecessary with redux` }
/>
```

### With Children
Custom Components with children can be used normally:
```jsx
import { Href, View } from '@abst/web-components';

<Href
  component={ MenuItem }
  to={ '/some/valid/path' }
  leftIcon={
    <FontIcon
      className='fa fa-pied-piper'
      style={ sty.icon }
>
  <View>{ 'I am a child'}</View>
  <View>{ 'I am also a child'}</View>
</Href>
  }
  primaryText='Menu Item Text'
/>
```
