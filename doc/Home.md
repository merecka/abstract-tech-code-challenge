# Abstract.tech | Frontend Engineer Assessment

Enclosed is a project that (somewhat) realistically simulates a real Abstract.tech web app. It's intended to give you a feel for the type of code you'd be working with as a member of our dev team, and to give us an idea of the type of code you write.

Crucial to the realism of this simulation is that you'll be picking up this project midstream, and you won't be completing it in its entirety. Instead, you'll be working within the parameters of a scope and completing issues from an issue backlog. To simplify this aspect of the assessment, the scope, issue backlog, and some additional docs and notes are all stored locally in project.

> # Questions
> First, see if you can figure it out. Read any/all related documentation, do some intrepid googling, and remember that Stackoverflow is your best friend.
>
> Seocnd, DO NOT hesitate to reach out, especially if your question is specific to the project itself and therefore ungoogleable. Because communication is life-or-death for any dev team, and this assessment is intended to simulate working on a real project, please reach out to me (Matthew) via whatever communication channel we've set up ahead of time (Slack, email, etc.) with any questions that come up. Some aspects of the code may not make much sense or be familiar. This is by design. This project is somewhat complex and uses some esoteric techniques to make communication a necessary part of the exercise.
>
> If you don't hear back from me within 1 weekday, it's almost certainly because I forgot to reply. If that happens, either @-ping me on Slack if we've set up a channel there, or email Eric Roetzer ([eroetzer@abstract.tech](mailto:eroetzer@abstract.tech)) if we're communicating via email and tell him to ping me on Slack about checking my email. You won't be the first or last person to do this.


# Assessment Checklist
- [ ] Read through rest of this doc
- [ ] Read the other docs in this directory
- [ ] Complete the steps in the Assessment Scope (see below)
- [ ] When you're ready to send it back, run `yarn clean` in your terminal re-ZIP the main project directory
- [ ] Send it back!


# Getting Started
## Prerequisites
1. Install [Docker Desktop] for your OS.

## Installation
There are only 2 steps to get up an running:
1. Run `yarn build` or `npm run build` (same thing) in the main project directory.
  - This will create a small Linux image and add a `node_modules` directory to the top level of the image, which the app's code can run.
  - Because of how the image is configured, if you add or change any of the project's dependencies, you'll need re-run this step to make sure the code running in the container can "see" the new/modified dependent modules.
2. Run `yarn dev` or `npm run dev` (again, same thing) to start the dev container.
  - This will create a container from the image created in step 1, load the project directory into the container, and start the app's dev server.
  - You'll see the terminal output from the container after you've started it. As you make changes to the code file, you should see stats for the partial/"hot" rebuilds displayed there. That's the easiest way of verifying the code in the container is synced with your local directory.

And you're good to go! The project should be available at [http://localhost](http://localhost). For development, open the project in Chrome with the [React Devtools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) installed. Other browsers may work, but I haven't done any cross-browser compatibility testing, so no guarantees!

When you're done working on the project, you can completely delete all the docker images/containers/volumes by running `yarn nuke` or `npm run nuke` (...you guessed it, same thing) in the project directory. This will hard-delete everything Docker has created and stashed on your drive. <mark>**If you're currently using Docker for other projects, running this step will delete every for those projects as well, so be careful! It's a full system purge of ALL the Docker artifacts**.</mark>

### Hot Reloads
The project has React Refresh installed, so it will run hot updates as you make changes in the code. **HOWEVER**, because the project is using an older version of webpack that doesn't jive with the React-Refresh webpack plugin 100% of the time, you'll probably notice that the updates gradually slow down over time to the point where computationally expensive updates will cause the browser to more-or-less "freeze" (it's not actually frozen, just working really hard). If you notice this occurring, just hard-refresh your page (Cmd+Shift+R), and it'll start behaving itself again.

# Assessment Scope
These are the four main areas we're assessing for this challenge:

## Proficiency
Complete at least one issue from the Issue Backlog (`./Backlog.md`) for each of the following types:
  - [ ] Debugging
  - [ ] Refactoring
  - [ ] Performance Optimization
  - [ ] Design/Implementation

## Process
Commit Frequently.
  - **NOTE**: Don't worry about making each commit perfect. Our goal here is to see the intermediate steps in your process, even when they're half-baked or unstable.
  - Use short, descriptive message to describe the changes in each commit. [Smaller commits are much easier to read through manually, so try to limit each commit to 1 "thing" you're doing.]
  - When closing an issue, commit using the message `closes #<X>` (i.e. `closes #1`) to reference the issue being completed.

## Hygiene
Follow the basic tenets of Clean Code
  - If you're unfamiliar, you can find a good primer [HERE](https://www.freecodecamp.org/news/clean-coding-for-beginners/), though you should also read the book. It's essential.
  - Additionally, try to annotate the code with short inline comments wherever it isn't immediately obvious what's happening.

## Contribution
- Add any new issues you find along the way to the Backlog. If you don't find any, that's okay, but you almost certainly will, as this is the software equivalent of a very, very rough draft.
- Reporting every issue - especially very small ones – is critically important to the health of a project, so no bug/oversight/edge case is too small for a Backlog item.
