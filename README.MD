# Overview
This application was done for the [mongodb hackathon](https://www.digitalocean.com/mongodb-hackathon/) through [DigitalOcean](https://www.digitalocean.com/). This is an initial proof of concept CRUD application around tracking Super Smash Bros. Ultimate 1v1 Stock matches. The application allows for users to be created, and matches to be created, viewed, updated, and deleted for those users.

## Technologies and Learning
The MongoDB and React application are hosted on DigitalOcean. This was the first time connecting MongoDB to React, in addition to using MongoDB and Droplots hosted on DigitalOcean.

## Routes
The backend application servers the data from the MongoDB.
[Link](https://supersmashapp-ebtdi.ondigitalocean.app/api/v1/)

### Users
- `GET /users`: Get all users
- `POST /users`: Create a user
- `GET /users/<user_id>`: Get a single user

### Matches
- `GET /matches`: Get all matches
- `POST /matches`: Create a match
- `GET /matches/<match_id>`: Get a single match
- `PUT /matches/<match_id>`: Update a match
- `DELETE /matches/<match_id>`: Delete a match

### Stages
- `GET /stages`: Get all stages
- `POST /stages`: Create a stage
- `GET /stages/<stage_id>`: Get a single stage
- `PUT /stages/<stage_id>`: Update a stage
- `DELETE /stages/<stage_id>`: Delete a stage

### Figthers
- `GET /fighters`: Get all fighters
- `POST /fighters`: Create a fighter
- `GET /fighters/<fighter_id>`: Get a single fighter
- `PUT /fighters/<fighter_id>`: Update a fighter
- `DELETE /fighters/<fighter_id>`: Delete a fighter

## React App
The application allows the user to add users, as well as create, view, edit, and delete matches.
[Link](https://supersmash-react-oqpl8.ondigitalocean.app/) 

## Deployment
There are yamls in each project to be able to deploy on digital ocean through the App Platform.