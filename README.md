# Boilr

![Build](https://github.com/talkor/boilr/workflows/Build/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0896f4a3-15f7-4f78-b640-785c034833e6/deploy-status)](https://app.netlify.com/sites/boilr/deploys)
## Getting Started

1. Make sure you have [yarn](https://classic.yarnpkg.com/en/docs/install) or [npm](https://nodejs.org/en/) installed.
2. Make sure you have [git](https://git-scm.com/downloads) installed.
3. Install [Vue CLI](https://cli.vuejs.org/guide/installation.html).
4. Clone this repo - run from command-line: `git clone https://github.com/talkor/boilr.git`.
5. Enter the directory: `cd boilr`
6. Install dependencies: `yarn install` or `npm install` 
7. Start development: `yarn serve` or `npm run serve`
8. Open `localhost:8080`

> Important: Make sure you use rebase instead of merge on pull by running this: 
```
git config --global pull.rebase true
```
Read this if you want, for more details: https://coderwall.com/p/7aymfa/please-oh-please-use-git-pull-rebase

## Development

1. Link issues from the project board to your commit/s (e.g. `fix home screen icons #23` where 23 is the issue number).
2. Work on branches, open a pull request for one of us to review. Don't work directly on master.
3. Use git as much as possible, divide your code changes to reasonable commits, give an appropriate name to each commit. It will be easier for the rest of us to understand code changes.
4. If your'e working on front-end changes, focus on mobile first.
5. On every push we have a git-hook that runs tests and pushes only if tests pass. After the code is pushed we run a CI/CD pipeline that automatically deployes the new code if tests pass to `boilr.netlify.app`. You can [download it also as PWA](https://medium.com/progressivewebapps/how-to-install-a-pwa-to-your-device-68a8d37fadc1).
6. Write unit tests if you want to be thorough. Running tests: `yarn test` or `npm run test`
7. The project is built with [Vue]() and [Vue Composition API](https://composition-api.vuejs.org/). Vue is really easy to learn and get started, you can be very proficient in about ~1hr of learning. You can watch these two videos and it's pretty much enough:
  - https://www.youtube.com/watch?v=Wy9q22isx3U
  - https://www.youtube.com/watch?v=V-xK3sbc7xI
  
## Recommanded Plugins/Extensions

### VS Code

- Prettier - automatic code formatting - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

- Vetur - Helps a lot with writing Vue code - https://marketplace.visualstudio.com/items?itemName=octref.vetur

### Chrome

- Vue Dev Tools - https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en
