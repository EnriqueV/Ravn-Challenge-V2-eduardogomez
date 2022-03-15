# A Tiny Liquor Store

A challenge for Ravn

## Getting Started

### Change enviroment config

Create the `.env` file with `cp .env.example .env` and fill up with your server configuration for production, as below:

```env
PORT=3000
MODE=DEV
RUN_MIGRATIONS=false
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=secret
POSTGRES_DATABASE=awesomedb
```

## Install Dependencies

Run the following command to install all node dependencies: `npm i` or `npm install`.

## Configure TypeORM

Generate `ormconfig.json` file with: `npm run typeorm` command.
Other typeorm commands:

```bash
# run migrations
$ npm run typeorm:migration:run

# generate new migration file
$ npm run typeorm:migration:generate <filename>
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
