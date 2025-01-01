# Backend Server Logs

---

### 2024-11-17

- **Varun**: Making a directory configuration and `app.js`.
- **Varun**: added Expert Model, Controllers and Routes codes `crud.js`,`expert.js`and `expertRoutes.js` .

_push_ : server - Expert `model`, `controller`, `routes` ,`verify token` and `login routes` are done and tested as well .. -- varunbalbudhe at 3:06 AM`

---

### 2024-11-18

- **varun**:Added the jsonwebtoken on login and made it to be stored in the caoche storage.
- **varun**:Separated the `login` & `signup`
  controller from `crud.js` and made them into `local controller` and `local routes` for code better readiness.
  "
- **varun**:Solved some git issues regarding the `varun` branch
- **varun**:Expert Directory Refinement Done and checked the all experts routes on `POSTMAN`
- **varun**:Created the `validator.js` local controller {checking route for the whether user is logged in? } and Created the `authenticator.js` middleware to protect the routes

- **varun**: ``

1. `forgot password` for the `Expert` and `Candidate` are Done {for both same routes will be used} in `localRoutes.js`, it is made with the `Email_Sender`,`OtpVerification`,
   `New Password Making`
2. all routes are Checked and tested on `POSTMAN`

_push_ : `all things pushed at 2:00PM`

### 2024-11-19

- **Srivaths**: Created the Candidate Model with all necessary attributes in `candidate.js`.
- **Srivaths**: Implemented Candidate Authentication, including `login`, `signup`, and `signout` functionalities in `login.js`.
- **Srivaths**: Developed basic CRUD operations for Candidate data management.
- **Srivaths**: Set up API endpoints for Candidate functionality in `candidateRoutes.js`.

_push_: All changes have been committed and pushed to the Git repository on the `srivaths` branch.  
_routes_: Testing of all routes will be conducted tomorrow using Postman.

---

### 2024-11-19

- **varun**: Created a `Panel` `routes`,`Controllers` and `Model` and tested on the `Postman`
- **varun**: Customized the `Expert` Model, added the required Attributes.
- **varun**: Added `Two Factor Authentication` in the `Expert` login and Checked on `POSTMAN`
- **varun**: `Forgot Password` For the `Experts` and `Candidate` are checked again and Verified on `Postman`
- **varun**: Will Create a `Score` `routes`,`Controllers` and `Model` and testing on the `Postman`
- **varun**: Created and tested the `nodemailer` code verification transfer on mails on the `Postman`

#### _push_ : `all things pushed at 10:29 PM`

### 2024-11-20

- **Srivaths**: Completed Postman testing for all routes to ensure functionality and correctness.
- **Srivaths**: Configured file upload functionality:
  - Set up an `upload` folder for storing uploaded files.
  - Added `uploadConfig.js` with separate directory paths for `Expert` and `Candidate` file storage.
- **Srivaths**: Implemented authorization in `candidateLogin` to secure Candidate-related operations.

_push_: All changes have been successfully pushed to the `srivaths` branch

---

### 2024-11-24

- **Srivaths**: Updated `Candidate` and `Expert` routes to integrate the `uploadConfig` functionality for file handling.
- **Srivaths**: Refined `Candidate` and `Expert` schemas to align with the relevancy model for improved data structure.
- **Srivaths**: Created `Job` module:
  - Developed `jobModel.js` with required attributes.
  - Implemented `jobController.js` to handle business logic.
  - Set up `jobRoutes.js` for API endpoints.
- **Srivaths**: Committed and pushed all backend updates to the Git repository.
- **Srivaths**: Pulled the latest changes from the `main` branch and updated the client-side frontend accordingly.
- **Srivaths**: Updated expert model, with the date of interview and interview count attribute
_push_: All updates have been successfully added to the `srivaths` branch.

### 2024-11-24

- **Varun**: Integrated `Master Authentication` functionality with the frontend for secure user management.
- **Varun**: Developed an `Unknown IP Middleware` to monitor and handle access from unfamiliar IP addresses.
- **Varun**: Created the `QnA` module:
  - Designed `qnaModel.js` with necessary schema attributes.
  - Implemented `qnaController.js` to manage QnA logic.
  - Set up `qnaRoutes.js` for API endpoints.
- **Varun**: Built an `Authentication Context` in the frontend to manage user authentication state and session handling.

_push_: All changes have been committed and pushed to the `varun` branch.


