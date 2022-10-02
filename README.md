# ShowDancer

Frontend for dancier.net. Built with Angular.

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The local dev server is configured to use the proxy configuration found in proxy.conf.json.
The URL for the local backend is defined here.
With this configuration, [CORS problems during local development can be avoided](https://levelup.gitconnected.com/fixing-cors-errors-with-angular-cli-proxy-e5e0ef143f85).

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

### Running e2e Cypress browser tests

Run `npm run `cy:run` to execute the browser tests via [Cypress](https://www.cypress.io/).
This command will run in the CLI and run tests inside a headless browser.

For a more interactive experience, run `npm run cy:open` to open the Cypress test runner.
It allows you to time travel through tests, see the state of the application at any point in time, and more.

### Development patterns

Whenever we decide on a pattern we want to use during development,
we add it to the list of development patterns.

You can find the development patterns in the [docs/patterns.md](patterns.md) file.

