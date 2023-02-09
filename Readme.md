# Task 6: Express server with File System

## Title: Express REST api using File system

- In this task you will create a REST api using the underlying file system.
- Data will be stored in a json file in the project folder. The project will replicate the express server we build during sessions.
- The API should provide CRUD capability. The Readme file will act like the documentation source.

## HOW TO RUN

- `clone this repository`
- run following commands on terminal to run the project (Make sure you're in the root of this folder)
  - `npm run start`
  - `npm run dev` -- for development

## WHAT IT DOES

- created APIs to

  - get all users
  - get specific user by id
  - add a user after validating the requested body
  - delete a user by id

- After CREATION OR DELETION, the data store (/data/users.json) gets updated asynchronously in real-time
