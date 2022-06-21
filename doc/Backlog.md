## Refactoring

1. refactor `Game/components/Scoreboard/FeedItem.jsx`
- Description
  - refactor this from a class component to a function
  - yes, this is a very simple and entirely contrived refactoring exercise. I just couldn't bring myself to write a complex class component to refactor...
- Acceptance Criteria
  - [ ] render function in `./Scoreboard.jsx` returns feed item directly instead of an intermediary component
  - [ ] `index` is the only accepted prop. This is so when the item is rendered as part of a large list (see #3), individual list items are triggered for re-render independent of the parent list element
  - [ ] hooks are called from FeedItem directly (currently called in intermediary component)

---

2. refactor `Game/components/PlayerImage.jsx`
- Description
  - this started as just the player image and turned into a button/image Frankenponent. Separate the button and image functionality into separate components.
- Acceptance Criteria
  - [ ] PlayerImage includes only the... you guessed it... player image, so it can be used elsewhere
  - [ ] PlayerImage accepts `className` and `playerId` props
  - [ ] the View currently wrapping the `<img />` element in PlayerImage, and it's accompanying functionality (styles, etc.), is moved to either a separate component or integrated into `Game/components/OptionGrid/Option.jsx`


## Performance

3. use `react-window` to virtualize the player list in `Game/components/Scoreboard/Scoreboard.jsx`
 **NOTE**: blocked by #1. Do that one first.
- Description
  - currently, this list is rendered using `_.map`, which isn't sustainable. Once the list reaches about 15 items, rendering gets super laggy, because every list item is re-rendered every time Scoreboard updates. So, the list should be virtualized so only the visible items are rendered, and each item can determine on its own when to re-render itself. There are a number of packages that can do this, but `react-window` is probably the best. Read the [docs](https://react-window.vercel.app) for that and create a new `PlayerList` component that uses it to create a virtualized list.
  - the current item component, FeedItem, uses `index` to access the player in question, so it's already compatible with `react-window`'s FixedSizeList component (see aforementioned docs).
- Acceptance Criteria
  - [ ] list of players is virtualized
  - [ ] PlayerList (or whatever you wanna name it) is an independent component in `Game/components` that passes props (i.e. itemCount, height, etc.) to FixedItem
  - [ ] The View currently wrapping the `<img />` element in PlayerImage, and it's accompanying functionality (styles, etc.), is moved to either a separate component or integrated into `Game/components/OptionGrid/Option.jsx`

---

4. move hook-derived values in `Game/components/Scoreboard/Scoreboard.jsx` to GameStore reducer.
**NOTE**: adjacent to, but not blocking or blocking or blocked by #3.
- Description
  - we're currently using `useValueMemo` to monitor the state of GameStore and generate values from it. Because that hook triggers a render when its value changes, we're unnecessarily re-rendering the list 2 additional times every time we update `state.rounds`, which happens a lot. Instead, those values should just be calculated directly within `Game/lib/reducer.js`. One of the values, `totalScore` should only update within the `'update'` action. The other value, `completeIds` might actually already exist on the GameStore state under a different name, so you may do some investigating and find the best solution there. Once #3 is implemented, it won't be necessary at all; instead, the state should keep a count of the number of completed rounds (if it doesn't already), which can then just be passed directly to the FixedSizeList component. So if that's already done, you can just disregard the second value entirely.

- Acceptance Criteria
  - [ ] both `useValueMemo`s in Scoreboard have been removed.
  - [ ] `totalScore` and `completeIds` (or the item count) are pulled directly from the store state.
  - [ ] `useRounds()` hook can be replaced with `useGame()`, since we're pulling the value directly from state and don't need the additional processing in the former.

---

5. round start time needs a Single Source of Truth.
- Description
  - when a player is selected as a guess, a `delay` parameter is passed back as part of the submit function (see `Game/components/OptionGrid/Option.jsx`), and it's also used to calculate the score for the round. This value is currently just the time at which the button initially loads. However, that value is super sus, as it can be changed by reloading the page, and it's technically different for every option. Instead, the round itself should have a single `startTime` value, and the game reducer should calculate the delay and the score using that value.
  - The round `startTime` value should technically be added once all the images are loaded (see #7), but for now, it can just be added when that round becomes active.
  - `round.startTime` should also be used to set the initial start value for ShotClock. In other words, if I start a round and then immediately reload the page, and the reload takes, say, 2 seconds, ShotClock should pass `5` as the `seconds` prop rather than using the default of `7`


## Debugging

6. find and fix whatever is causing `Game/components/OptionGrid/OptionGrid.jsx` to spike in the performance profiler.
- Description
  - The Profiler in React DevTools shows OptionGrid is consuming more of the processing thread than it should. You shouldn't have to completely redo the way the options grid is rendered (that's more of a longterm deal, and shouldn't be causing this much lag); there should be a relatively minor bug causing that to occur.

---

7. add a fallback in `PlayerImage` when load fails.
- Description
  - Some players don't have an available image. If you do a few rounds of the game, you'll come across at least 1. Currently, the standard HTML "broken link" displays, but we should replace that with something a little better. We could try to make it look like a feature rather than a bug by having a "mystery player"-type image show, but the better longterm fix would actually be to remove that player from the queue entirely and replace that option/round with one that has an image. However, because that's a way more involved process, let's patch it for now by just adding a fallback. The NBA website uses `https://cdn.nba.com/headshots/nba/latest/1040x760/logoman.png` as its fallback, which should be fine for now. Or if you have something more creative than a very boring black and white logo, feel free to get creative. The only real goal here is to make it so _anything_ besides the broken link icon displays.
  - Ideally, `React.Suspense` (see react docs) or some other type of lazy-loader should be used so we know precisely when an option is actually loaded. Additionally, that should also allow us to pre-fetch the next round's images before it's actually rendered, although that can always be added later and should probably have its own issue under implementation.

---

8. sync up "success" color indicators.
- Description
  - When a player is correctly selected, the player name and the ShotClock turn green to indicate a successful selection. Currently, this change occurs via CSS class in each component, which means they're processed separately, and the changes occur at different times. Because the Text and ShotClock components use their own CSS selectors as well, the best solution here may be to add a style block via `useStyles()` and pass the same block to both components, though implementing that in ShotClock may be messy because of the number of elements being updated. Another solution might be to just modify the CSS blocks in `Game/components/Header/Header.style.js` to use modify both elements at once, though that may not entirely solve the issue. This one may require some testing.
  - It's also worth mentioning that because of the way `cssnano` (see `core-slim/packages/hooks/useCss.js`) implements style tags, scoping changes can be a little tricky, and it may behave differently after a full page reload than it does following a hot update.

---

## Implementation

9. design and implement a simple UI for the "Game Over" sub-route screen @ `Game/screens/Over/Over.jsx`
- Description
  - This should have some sort of mockup, but unfortunately the client didn't send one, and they said they don't want to wait on the design process. We told them "okay, but you get what you get, and you have to pay for anything you don't like", and they said "ya, sounds good". They said they want the screen to have the following:
    - [ ] A "Game Over" title
    - [ ] The image and name of the correct guess for the final round that was guessed incorrectly, with some sort of wording about how that was the correct answer
    - [ ] a list of all the correct rounds, similar to what's on the Scoreboard in the main game (we should probably just re-use that component)
    - [ ] A single button that starts a new game (should call `Game.start` – see the action buttons in `src/Game/Game.jsx`)
    - [ ] anything else we think is "hip" (their word, not mine; I think they mean we have some creative license, so by all means, use it)
  - implement an initial version of this screen with this information however you think is best; we can always switch some stuff up later if we need to.
