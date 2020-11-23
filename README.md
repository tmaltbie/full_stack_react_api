Full Stack Project

This application allows users to sign up, sign in, create, update, and delete available courses for others.

The REST API of the application is served on Node.js using Express, Sequelize ORM, and SQLite. The app handles GET, POSTS, PUT, and DELETE requests and returns the proper response. If data fails validation protocols, errors are returned.

React was used to design and create the user experience. Depending on the routes taken in the application, it fetches the necessary data from the API and renders it to the user. Private routes are available only to user who have signed in. Only the owner of a course may update or delete it.

How to use the app:

1. download the files from Github
2. Open terminal and access the API directory
3. run ```npm install``` to install dependencies
4. run ```npm run seed``` to initialize and populate the database
5. run ```npm start``` to start the server on localhost:5000
6. Open terminal and access the client directory
7. run ```npm install``` to install dependencies
8. run ```npm start``` to start the server on localhost:3000
9. Open your browser and navigate to localhost:3000