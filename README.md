# Dancier Website

This repository houses the Angular frontend for the [dancier.net](https://dancier.net/) website.

## Development

### Prerequisites

1. [Node.js](https://nodejs.org/) needs to be installed.
   We recommend using the latest LTS version.

2. Run `npm install` to install all dependencies.

### Development server

Run `npm run start` for a dev server. Navigate to `https://localhost:4200/` (you may need to accept unsafe SSL connections in your browser if asked). The app will automatically reload if you change any of the source files.

With this configuration, you are working against the backend running on our backend server at https://test-dancer.dancier.net, which is why the dev server must also be started serving SSL content (otherwise your browser will not send requests to our backend).

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

### Running e2e Cypress browser tests

Run `npm run cy:run` to execute the browser tests via [Cypress](https://www.cypress.io/).
This command will run in the CLI and run tests inside a headless browser.

For a more interactive experience, run `npm run cy:open` to open the Cypress test runner.
It allows you to time travel through tests, see the state of the application at any point in time, and more.

### Keeping the codebase consistent

We use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to keep the codebase consistent and avoid bugs.

These tools are configured to run automatically before every commit. This is done by two tools, [Husky](https://typicode.github.io/husky/) which configures the precommit hook and [lint-staged](https://github.com/okonet/lint-staged#readme) which runs scripts on the staged files.

You can find the configuration for lint-staged in the [package.json](package.json) file.

### Development patterns

Whenever we decide on a pattern we want to use during development,
we add it to the list of development patterns.

You can find the development patterns in the [docs/patterns.md](docs/patterns.md) file.
