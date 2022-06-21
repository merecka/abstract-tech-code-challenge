# Code Standards

## Structure
### Directories
- Each directory contains a chunk (loosely defined) of the application, which is accessible anywhere within the codebase using `@src/<dirname>` as the import reference.
- To avoid spaghetti code, Component Directories within `src/` – usually those with PascalCase names – shouldn't reference each other.
- Use top-level reference directories (`src/components/`, `src/hooks/`, etc.) for functionality used in multiple top-level directories within a single project.

### Files
1. Files should usually only contain one thing (a function/component/etc.)
2. `index.js` files should contain only import/export statements (or, _very_ occasionally, some export formatting)
3. It's okay to keep sub-components in the parent directory as peers of the main component, provided there aren't a bunch of them. As a general rule, move sub-components to their own `components/` directory once you're to the point where it's hard to find them.
4. If a component has local styles or its own subcomponents, use the following basic file structure:
```sh
├── CoolComponent
│   ├── CoolComponent.jsx
│   ├── CoolComponent.style.js
│   ├── components
│   │   ├── CoolSubcomponent.jsx
│   │   ├── CoolerSubcomponent.jsx
│   │   ├── SubcomponentWithStyles
│   │   │   ├── SubcomponentWithStyles.jsx
│   │   │   ├── SubcomponentWithStyles.style.js
│   │   │   └── index.js
│   │   └── index.js
│   └── index.js
```
5. Exports should always be named
  - the only major exception here is style files (`.style.js`) which, because they almost always export a single function, typically use default exports. In cases where a style function is fed to a `useCss` hook, naming that export to distinguish it from the normal style function (`export const css = `) is standard practice.
  ```es6
  /* BAD */
  export default function EmptyDiv() { return <div />; }

  /* GOOD */
  export function EmptyDiv() { return <div />; }
  ```
6. Other basic file rules are pretty self-evident; reading through some of the existing source code should be sufficient to grok the basics of things like naming conventions, file types, etc.

## Syntax and Hygiene
### Linting
The main project directory has an ESLint config file with extensive formatting and usage rules. **It's highly recommended that you use an [ESLint Editor Extension](https://eslint.org/docs/user-guide/integrations) to lint and fix files as you work.** Compatible versions of all the packages required to run an officially supported ESLint editor extension are installed during the setup process for this project.

### ECMAScript & Proposals
This project uses Babel to compile JSX and ECMAScript (ES6+) syntax and techniques into vanilla Javascript. A complete list of usable proposals is available at `core-slim/configs/babel.js` in the project tree. It may be helpful to find the doc corresponding to any new or unfamiliar plugins on the [Babel Plugin List page](https://babeljs.io/docs/en/plugins-list) and quickly read the I/O summary of how they work.
> NOTE: If there's a missing plugin you'd like to add, feel free to do so. Just make sure the corresponding package is added to the project's top-level `package.json` in `devDependencies`. The easiest way to do this is to run `yarn add -E -D <package-name>` in the main project directory. Once that's complete, add it to the array of plugins in the above-referenced babel file and restart the dev server.
