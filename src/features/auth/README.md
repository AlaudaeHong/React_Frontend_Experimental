# Auth Module

## Behavior Defination

### Login

-   If a user is log-in, redirect them to the "/home"
-   After user input his credential, the page will not be automatically redirected until app.js re-fetch user information.

### Logout

-   After user arrives Logout page, a DELETE will be sent to backend.
-   After checking the response, page will be redirected to "/home".

## API Defination

-   fetchAuthUser: Get user info by session
-   loginAuthUser: Post user credential to the backend
-   logoutAuthUser: Delete user session from the backend
-   RegisterAuthUser: Register a new user
-   resetCheck: Reset the status to let it possible to re-fetch user info
-   resetCheckByTime: Call resetCheck with a timeout

## Initial State

-   user: A container with userId in database and username
-   error: Preserved for error message
-   status: A flag indicating where the statemachine goes
