# api-e2e-test-serenityjs

API end to end testes with SerenityJS

## Configuration

### Pre-requisites
* Nodejs (v14.4.0)
* Npm
* Java 8 (to manage serenity version and report generation)

### Installing
Run the `npm install` command to install the necessary dependencies.

### Running the tests locally

#### Running all tests

`npm run test` - run all tests.

`npm run test:report` - run all tests generating the report at the end.

`ENV=development npm run test:report` - run all tests on a specific environment.

#### Running specific tests
`TAGS="@peopleEdit" npm run tags` - run all tests that have the '@peopleEdit' tag.

`SCENARIO="Insert person" npm run scenario` - run the scenario with given name 'Insert person'.

`FILE="people" npm run file` - run tests with feature name 'people.feature'.

`DIR="people" npm run dir` - run tests that are in the given path dir 'people'.


#### Generating reports
`npm run report` - it will generate the report inside the path target with the execution data.
* The report will available at `target/site/serenity/index.html`.

## Docker

### Running with docker

`docker-compose up` - run the specific like as defined on command docker-compose.yml.

* The report will available at `/opt/nfs/api-tests/target/site/serenity/index.html`.