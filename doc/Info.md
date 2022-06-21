# Info Dump
Here's a bunch of random information about this project:

## About The Game
This project is a very simple, stupid game with the following rules:
1. The name an NBA player is shown along with that player's image and the images of 8 random other players.
2. The object object of the game is to correctly identify the player named in the game in less than 7 seconds.
3. When the correct player is selected, a new round is added to the game.
4. The rounds repeat until an incorrect selection is made or the round timer reaches 0. (For development, the game doesn't end when the timer reaches zero, only when an incorrect choice is made).

> **NOTE:** WHAT IF YOU AREN'T A TOTAL NBA NERD, AND SO YOU DON'T INSTANTLY KNOW MOST OF THE 508 CURRENT NBA PLAYERS ON SIGHT?
>
> First of all, knowing every NBA player on sight doesn't make you a nerd. And how dare you insinuate that it would.
>
> Seriously though, for the sake of development, **there's a commented-out element in `Game/components/PlayerImage/PlayerImage.jsx` that shows the name of each player above his image**. You can uncomment that element, which will allow you to advance as long as you need to before ending a game. Just make an incorrect selection to advance to the "Game Over" screen.

- The name of the game, "7 Seconds or Less", is derived from a late-2000s/early-2010s fast-paced offense the Phoenix Suns pioneered, in case you were wondering, which you weren't.
- There are technically 2 game modes, but for now, we're only worried about "7 Seconds Or Less", so you can ignore anything with "L2M" ("Last 2 Minutes") in the name.

### Game Phases
The game uses a sub-router with a pseudo-location to show the correct screen based on the active game phase. The GameStore reducer automatically controls the active phase, so you shouldn't have to worry about updating it manually.

The phase lifecycle is as follows:

0. null/undefined - The sub-router home screen is shown
1. "pregame" – this is just a loader that typically doesn't even have time to display; it's currently just an intermediate step while the game state is loaded. Eventually, instructions will be displayed here, but there's a lot of underlying functionality that needs to be updated to put this in place, so it's automatically advanced through for now.
2. "countdown" - A 3-second countdown timer that
2. "active" - the main game board; displayed while a game is in progress
3. "over" – The game over screen is displayed

> **NOTE**: each phase's corresponding screen has its identical name in PascalCase in the `Game/screens` directory. For example, if you're looking for what displays on screen during an active game, those components are in `Game/screens/Active`.


## About the App
### Aliases
the compiler recognizes a few aliases that point to local directories or files. They are as follows:
| name               | location           | description                                                                                                                                                                                                   |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @src/<dir-or-file> | src/               | anything in the src directory. This makes moving stuff around way less painless. Just make sure you don't import something from a directory that file is also exported from. It creates a messy require loop. |
| @abst/config       | config.js          | The reasons its named this are complicated, but it just points to the top-level config file in the project                                                                                                    |
| @abst/<pkg>        | core-slim/packages | this is a super simplified version of our `core` cross-project library and the basis of our in-house platform.                                                                                                |

- For the sake of this assessment, core (core-slim) been trimmed waaay down and made a local directory instead of a linked submodule.
- You should only have to change code in `src/`, though you're certainly welcome to modify anything in `core-slim/` if it needs fixing.
- If you're building a piece of UI, check `@abst/web-components` first to see if it already exists.

### Hooks
You'll notice there are a ton of hooks used in this project, many of which come from the `@abst/hooks` package. Most of those hooks have documentation, but here are some additional notes:

- use these hooks as much as possible; they're your friend
- any hook with `Value` in the name (i.e. `useValueMemo`, which is used a bunch) is referring to a "complex value". Basically, React's internal hooks like `useMemo` use shallow-equal (`===`) to compare values, which isn't super helpful if you're comparing arrays, objects, or even `null`. the Value-type hooks (and basically all the other ones, to varying degrees) use deep-equal, either via `fast-deep-equal` or, when actual elements are being compared, `react-fast-compare` to check that the literal values have changed, not just the perceived value.
  - In practice, this means you can give the hooks from `@abst/hooks` a more complex value like an object or a array, and it'll only update that value when the contents change.
- Correspondingly, all of the app's components should be functions, because that's the only type of component in which hooks can be used directly. In other words, don't make class components. The React team has phased them out and recommended they not be used anymore, so avoid them at all costs.
  > Hint that may come in helpful later because you read the docs: If you're refactoring a class component that uses `this.setState`, the `useSetState` and `useGetSetState` hooks will replace that functionality.
- I haven't had time to upgrade the app to React 18.x, so the [new hooks](https://reactjs.org/blog/2022/03/29/react-v18.html#new-hooks) aren't yet available here.

### Contexts
- This project also makes heavy use of React Contexts. If you're not familiar, check the React docs for a quick summary.
- Because this project, like most of Abstract's real projects, is somewhat computationally expensive for a browser, use Contexts wherever you can to optimize how props move from one place to another. This can dramatically cut down the number of render cycles required throughout the portions app that tend to eat up the browser tab's JS thread.
- Contexts are also helpful for maintenance and debugging, because they provide a "Single Source of Truth" for props, which means you don't have to waste a lot of time tracing a prop that's been passed down through 7 components and got broken along the way when you accidentally removed it from one of the parents.
  - A rule of thumb for Good Software Design is that if you're passing 1 or more (A) to more than 2 components or (B) through more than 1 level of the render tree, you should probably create a context, because the 5 extra minutes now will save you an hour later.


### Styles
- You'll notice 2 types of style implementation: `useCss` and `useStyles`. Both take a function with `(theme, props)` as the arguments (see any `.style.js` file).
- `useCss` returns an object with string values, which are passed to the `className` prop of a rendered element. Use this when you want to implement your styles via html/CSS `<style>` elements so they can make use of CSS selectors like `:hover`, or, in particular, when you have several subcomponents that you want to coordinate styles for.
  - **Pro Tip**: `core-slim/packages/hooks/useCss.js` and its parent factory hook, `./useCssNano.js` have the exact configuration of all the extra CSS tricks you can use with `useCss`. You won't use the latter file directly (`useCss.js` uses `useCssNano.js` internally to build an instance of the style sheet generator), but you can at least read the docs for the packages imported there to get a feel for the more advanced functionality you can unlock with useCss.
- `useStyles` returns precisely the value from the `styles` function. Use this when you want to override the CSS with inline `style=` tags, or when you want to extract some value, like a color, from the theme and pass it directly to a a third-party component.


### Miscellany
- You'll find `_.` used liberally and without reference throughout the project. `lodash`'s standard `_` variable assignment is a global in all Abstract projects and can be used in any code within `src/` and `core-slim/packages/` without a corresponding import statement. Use it wherever possible to mitigate low-level bugs
  - Example: Javascript's `Array.map` function throws an error when the referenced const is not an array. Using `_.map` not only handles non-array values without issue, it can also return an array from an object, making very useful rendering several of the same component.
  - In other cases, it simply creates more legible code (i.e. `_.isString(typeCheckedThing)` instead of `typeof typeCheckedThing === 'string'`)
- When you first load localhost, you'll see the dashboard with a button to advance to the game. Once you click that button, the UI you see next corresponds to `src/Game/Game.jsx`. From there, you should be able to <mark>follow the import statements</mark> to find what you're looking for.
- This project intentionally has a codebase that is larger than necessary, in part to assess how well you adapt to the type of large/complex environments that accompany most of our projects. For instance, the `core-slim` directory in this project is about 10% the size of our full `core` library. Being able to navigate around large projects and, in particular, follow import trees to assess existing code, is vitally important.
