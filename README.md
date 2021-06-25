# Associate Engineer Technical Task

## Steps to setup the project on your local machine:

1. install docker and docker compose.
2. clone the repositiory from github.
3. run docker-compose up.

### Install docker and docker-compose

(you can skip this step if you already have docker and docker-compose installed)

1. follow this link(https://docs.docker.com/compose/install/) to setup docker and docker-compose on your machine.

### Clone the repository from github

1. run the command

```commandline
git clone https://github.com/NdibeRaymond/wiki_donate
```

### Run docker-compose up

1. cd into the cloned repository and run

```commandline
docker-compose up -d --build
```

2. The project should be up and running by. Visit http://localhost:3000 to get started

## Steps to run tests:

### Integration tests

1. While the docker containers are still up, run:

```commandline
docker-compose exec express bash
```

2. Inside the express container shell, run "npm run test"

### End-To-End tests

Since we are using docker to simplify development, setting up GUI capability involves additional software and setup.
If you are interested in running the e2e tests, you need to setup the application on your local machine without docker.

1. Clone the repository directly to your local machine.

2. cd into the cloned repository and run

```commandline
npm install
```

3.  Setup mysql on your localmachine, making sure that the username 'root' with a password of 'root' exists and that you can
    log into mysql with these. Also ensure that a database named "mysql" exists or else the application won't start. (
    This link will be of help https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/
    )

4.  Run "npm start" to start the application.
5.  To run e2e test, run "npm run e2e"
