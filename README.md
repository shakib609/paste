## Setup

Install necessary packages by running the below commands:
```shell
$ pipenv install
$ yarn
$ pipenv run python manage.py migrate
```

## Development Server

In development, The django server and the React app is served separately to get the features served by both
frameworks development servers.

### Django Server
The below command starts the django dev server at `http://localhost:8000`:
```shell
$ pipenv run python manage.py runserver
```

### React app
The below command starts the React dev server at `http://localhost:9000`:
```shell
$ yarn start
```

## Production Build

Before deploying you have to build the production version of the React app.
You can do that by running below command:
```shell
$ yarn build
```
