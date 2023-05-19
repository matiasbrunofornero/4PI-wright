# CaaS - Backend Automation Framework

* [Framework Setup](README.md#framework-setup)
* [Pre conditions and framework constraints](README.md#pre-conditions--framework-constraints)
* [Available npm commands](README.md#available-npm-commands)
* [Results & reports](README.md#results--reports)
* [Publishing result: QASE integration](README.md#publishing-result-qase-integration)

___

## Framework Setup

* Make sure you have installed node (**node version should be v18.4.0 or greater**).
* After clonning the repository (**https://bitbucket.org/theluckyapp/caas_dashboard_qa_backend/src/master/**) run:

```bash
npm install
```

## Pre conditions & framework constraints

- It can be run in major browsers that are defined in `playwright.config.ts`
- It works ONLY when the `local environment is up run running`
- Bearer token should be manual generated


### Local environment setup

Backend repository is necessary to run the local environment:
* https://bitbucket.org/theluckyapp/caas_dashboard_backend

After clonning the repositories, follow this guide to perfom the environment setup: 
* [Caas local environment setup](https://docs.google.com/document/d/1HVf8i1F3is00vDmvIP1EPQW-4f8vyTnXME3jlEj1s2g/edit?usp=sharing)


## Available npm commands 

The available npm commands are defined in [package.json](package.json) and are:

* `lint`: Run code quality ESLint tool
* `test:dev`: To run tests in DEV environment *(defined in .env.development)*
* `test:stg`: To run tests in STG environment *(defined in .stg.development)*
* `repeat`: To run tests repeatedly to see if tests are flaky *(by default 15 times)*
* `qase`: To publish results in QASE management tool
* `qase_repeat`: To run tests repeatedly and publish results in QASE management tool


When running any of the commands, the playwright configuration used by default is defined in [playwright.config.js](playwright.config.js)


## Publishing result: QASE integration

The tool we are using for test case documentation, and in particular for specific release testing is [QASE](https://app.qase.io/).

After running the suite, it is possible to publish the results in a specific `QASE run id`.

**Important**: To make possible this integration:

* You need to set `QASE_API_TOKEN` environment variable in `playwright.config.js` file located in the root of this repo. Ask some QA member to get that value.

The `<testCaseId>` is gotten from the "Suites" definition, inside "Repository" section.

For example, taking into account the [CAAS suite definition](https://app.qase.io/project/CAAS), then each scenario has the id: `CAAS-<testCaseId>`.
* Therefore, `1` is the `testCaseId` of the sceanrio: 'CRUD operations for a cardholder'

### Publisher script

The script to publish the result is:

```bash
npm run publishResult -- --help
```

* `--help`: Shows help

* `--runId`: The QASE run id [Required]

* `-i, --input`:  Json result file taken as input [default: cypress/results/caas-report.json]

* `-v, --verbose`: Enable command console log [default: false]

For example, to publish result in QASE runId 2, then you can run:

```bash
npm run publishResult -- --runId 2
```

![runId_integration_results](./readmeImg/runId_integration_results.png)
