# SOAP Health Project

## Table of Contents
1. [Introduction](#introduction)
2. [How to Run Using Docker and Docker Compose](#how-to-run-using-docker-and-docker-compose)
3. [How to Run Using Node or Make](#how-to-run-using-node-or-make)
5. [Thank You Note](#thank-you-note)

## Introduction

### What does the project do?
The goal is building a simple Phone Book using React for the frontend and Nodejs for the backend.

### What technologies were used?
For this project I used the following tools:
- NodeJS v18
- React v18
- NestJS v10
- Docker v24
- Docker compose v2
- GNU Make v4.3

## How to Run Using Docker and Docker Compose

### Prerequisites (Docker, Docker Compose and Make)
- Docker installed on your machine. You can download it [here](https://www.docker.com/get-started).
- Docker Compose installed on your machine. You can find installation instructions [here](https://docs.docker.com/compose/install/).
- Make installed on your machine.

### How to Run Using Docker and Docker Compose
1. Clone the repository: `git clone [repository_url]`
2. Navigate to the project directory: `cd soap_health_test`
3. Run the application using make: `make run`
4. Access the application at [http://localhost:3000](http://localhost:3000)

## How to Run Using Node or Make

### Prerequisites (Node or Make)
- Node.js installed on your machine. You can download it [here](https://nodejs.org/).
- Make installed on your machine (optional)

### How to Run Using Make
1. Clone the repository: `git clone [repository_url]`
2. Navigate to the project directory: `cd soap_health_test`
4. Run the backend application: `make backend`
5. Run the frontend application `make frontend`
6. Access the application at [http://localhost:3000](http://localhost:3000)

### How to Run Using Node
1. Clone the repository: `git clone [repository_url]`
2. Navigate to the project directory: `cd soap_health_test`
3. Install dependencies for the frontend: `cd frontend && npm install`
4. Start the frontend application: `npm start`
5. Open another terminal at the `soap_health_test` directory.
3. Install dependencies for the backend: `cd backend && npm install`
4. Run the backend application: `npm run start:dev`
5. Access the application at [http://localhost:3000](http://localhost:3000)

## Thank You Note

Thank you for taking the time to explore my project. I appreciate your interest and welcome any feedback or contributions.
