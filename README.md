# Treetracker Query API
   
This API exposes a RESTful interface to query the treetracker data, capture, planter and organization and others.

# Development toolkit

This repository was created from Greenstand's template for microservice projects.  This means it comes with many development tools that we use for development and deployment.  As a contributor to this repository, you should learn and use these tools.  They are outlined below.

* Conventional Commits
* husky
* prettier / lint
* github actions
* Jest
* TypeScript

# Getting Started
  
## Project Setup

Open terminal and navigate to a folder to install this project:

```
git clone https://github.com/Greenstand/treetracker-repository-name.git

```
Install all necessary dependencies: 

```
npm ci
```

Run the server with database settings:

```
DATABASE_URL=[...] npm run server
```

Please join our slack channel to get help with setting up the database.

# Workflow with Github

[check out here](https://github.com/Greenstand/treetracker-web-map-client#workflow-with-github)

# Architecture of this project

This project use multiple layer structure to build the whole system. The architecture follows some principles of [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design). And inspired by this article: https://medium.com/spotlight-on-javascript/domain-driven-design-for-javascript-developers-9fc3f681931a

Some explanation of the layers:

* **Protocol layer**

I think we can also call it the Application Layer, a term in the DDD, the entry of this project.

This microservice offers RESTFul API interface based on HTTP protocol. We use Express to handle all HTTP requests.

The Express-routers work like the controller role in MVC, they receive the requests and parameters from client, and translate it and dispatch tasks to appropriate business models. Then receive the result from them, translate to the 'view', the JSON response, to client.

* **Model layer**

The business model, most of the business logic is here. We are considering put most of the business logic in the model layer. So it should be the thickest layer, including all the business logic, and build up the relationship between models(business).

* **Service layer**

Some utils, and business logic that is not related to the business model or hard to categorize to models.

* **Infrastructure layer**

  * **Repository layer**

    Repository is responsible for communicating with the real database.

    All the SQL statements should be here.

  * **Others**

    For example, the Message Queue.

# How to test

## Unit test

To run the unit tests:

```
npm run test-unit
```

## End to End test

All the end to end tests are located under folder `__tests__/e2e`, the test will run against the dev database.

To run the integration test:

Run tests:

```
npm run test-e2e
```