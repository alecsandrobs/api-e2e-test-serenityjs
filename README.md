# api-e2e-test-serenityjs

API end to end testes with SerenityJS

## Configuration

### Pre-requisites
* Nodejs (v14.4.0)
* Npm
* Java 8 (to manage serenity version and report generation)

### Instalando
Run the `npm install` command to install the necessary dependencies.

### Running the tests locally

#### Running all tests

`npm run test` - run all tests.
`npm run test:report` - run all tests generating the report at the end.
`ENV=development npm run test` - run all tests on a specific environment.

#### Running specific tests
`TAGS="@" npm run tags` - run all tests that have the '@' tag.
`SCENARIO="" npm run scenario` - run the scenario with given name ''.
`FEATURE="" npm run path` - run tests with feature name ''.
`PATH="" npm run path` - run tests that are in the given path ''.

#### Generating reports
`npm run report` - it will generate the report inside the path target with the execution data.
* The report will available at `target/site/serenity/index.html`.

## Docker

### Running with docker

First, it could done the containers cleaning, running the following command:
`docker-compose down --remove-orphans`

#### Running all tests

`CURRENT_UID=$(id -u):$(id -g) docker-compose up` - run all tests.
`ENV=development CURRENT_UID=$(id -u):$(id -g) docker-compose up` - run all tests on a specific environment.

#### Running specific tests
`PARAMETER=tags VALUE="@login" CURRENT_UID=$(id -u):$(id -g) docker-compose up` - run the specific tests with given parameters.
* The parametes could be: tags, scenario, feature or path.

* The report will available at `/opt/nfs/api-tests/target/site/serenity/index.html`.