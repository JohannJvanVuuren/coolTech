# Cool Tech Credential Authentication System v1.0.0

## Index

1. Introduction
2. Installation
3. Usage Instructions
4. Credits and Versioning

### 1. Introduction

This is a credential authentication application that was written to experiment with a fullstack MERN application that makes use of JSON web token  
(JWT) authentication.  

It generates a JWT token during login.  

This token is stored in local storage using Web APIs and is deleted again upon logging out of the system.  

Most of the functionality is linked to a authorisation level  
that is linked to the user's role which is stored in the payload of the JWT toke.  

The project was developed as an exercise in a boot camp  
and has developed a deep understanding of all aspects of the development in the creator.

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 2. Installation

To install the application simply clone it or download it from this repository.  
There is a frontend and backend directory in the root directory.  
Run the command `yarn install` in both directories and the application is ready to use.   

To start the application enter the command `yarn start` in the frontend directory and `yarn dev` in the backend directory.  
This will start the React frontend as well as the backend Express server.  

Finally a `config.env` file will be necessary in the `config` folder in the `backend` sub-folder.  
This file should have the following three variables in it:  
- `MONGODB_CONNECTION_STRING`= Your MongoDB database connection string
- `PORT` = 8000
- `JWT_SECRET` = Any random string that will be used to encode the JWT token

### 3. Usage Instructions

Once the installation is complete, the application is basic and intuitive to use.  
Will be greeted by a landing page where the user will register the first time and thereafter login to the application.

![Landing page](/README_images/landingPage.png)

![Registration page](/README_images/registrationPage.png)

![Login page](/README_images/loginPage.png)

After these two steps each page will have a navigation bar at the top  
that the user will utilise to get the required functionality.  

![Home page](/README_images/homePage.png)

Throughout the application, the home button can be used to return to this page. 

Once the desired functions have been utilised,  
it is important for the user to logout using the appropriate menu option to ensure the session is suspended.

![Logout confirmation](/README_images/logoutConfirmation.png)

### 4. Credits and Versioning

This app was developed and written by Johann Jansen van vuuren and version v1.0.0 was released on 22 June 2023.
