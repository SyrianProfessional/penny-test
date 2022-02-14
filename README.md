# Penny Test For Ashraf Zidane




this project is a NX workspace with Nest js And Angular projects, for the database i using the MongoDB with atlas db

firstly the envirmoents is:


```sh
# Server
DATABASE_CONNECTION=mongodb+srv://ashraf:zidane@cluster0.mjxk6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
# DATABASE_CONNECTION=mongodb://localhost/penny
PORT=3333
JWT_SECRET=penny
JWT_EXPIRES_IN=8

# Swagger
SWAGGER_TITLE=Penny Test Project 
SWAGGER_DESCRIPTION=for Ashraf Zidane Test 
SWAGGER_TAG=Penny Auth Project

```

if you want to see the apis and test it you can see the swagger file:  (http://localhost:3333/swagger/#/)

to run the projects :

```sh
# Nest js :  nx serve --project=api
# Angular: nx serve --project=frontend --port 4300  // or you can put any port you want
```

so lets talk about the task:

#### Task Goal: 
Build an end-to-end responsive web app which consumes an api, lists the data fromthe database and with a web form that sends data via a POST request.
#### Technology: 
MEAN Stack, Use Nx.dev to create a mono repo, Use Angular for UI and NGRX
for state management and NestJS for backend API.
#### Task Duration: 2 days
#### Requirements:
Create a signup, sign in and sign out web app that allows users to create
accounts and have them registered as new users. The app should identify registered users and
ask them to sign in. Once the user signed in they should remain signed in for 8-hours and then
logged out automatically unless they sign out promptly. Push your project code to GitHub and
submit a recording demonstrating the app functionality as well as code walkthrough.
#### Bounty points:
- Design and implement “forgot password” feature
- Display a list of data visible only for logged in users, the list of data can be
users/products when the user login is successful
- Use Atlas mongodb to host your database online
- Deploy your app to GCP

so:
- for the auth (signin, signup, forget password, reset password and get the users how loggedin) into the users folder 
- i handled the session time and if you didnt loggedin to the server for 8 houres the session will expired you can see the user guard in the server project
- for the forget password i handle the token that will generate when ask a new password but i put it a static as 1234 for test and you can test it by the reset-password router in the frontend
- for display all data in the frontend i make a crud for products and the user list after login 
- i installd a packages and handle it for more than language but i couldent write all the words becuase the time of task
- i used the NGRX as example in users for list so i init the store and made the state, reducer, actions and selectors and made it as observable you can refresh it from any where in the code just dispatch to the store
- i build it and test the build before push code
- finaly i write some comments and make the names and variable understaned and i hope its good


thanks.



