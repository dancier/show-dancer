# Show Dancer

## Running with mock server

You can run the frontend application without a real backend. Just run:

```npm run start-mock```

This will start the frontend, along with a mock backend using json-server.
Edit the files inside ./mock-server to change how the mock server behaves.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploy

### Build the docker image

(requires docker being installed locally)
```bash
./docker-build-image.sh

# run it locally
docker run -it -p 4200:80 dancier/show-dancer:1.1 
```
### Push the image
(requires docker login)
```bash
./docker-push-image.sh
```
### Acticate the image
(requires your ssh key being deployed on the target host)
```bash
# deploy new docker file config if necessary
scp .env docker-compose.yml root@dancier.net:/root/

ssh root@dancier.net

docker-compose pull

docker-compose up -d --force-recreate
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
