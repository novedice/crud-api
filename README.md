## CRUD-API
***Simple CRUD API***  

This project implements a simple CRUD API using Node.js and TypeScript, with an in-memory database underneath.


*Installation*  
1. Clone the repository  
*git clone https://github.com/yourusername/crud-api.git*  
*cd crud-api*  

2. Install dependencies  
*npm install*  

3. Create environment file  
*cp .env.example .env*  

*Available Scripts:*  
 - Developer mode:  

Run the app using:  
*npm run dev*  
or  
*ts-node-dev --env-file=.env src/server.ts*  


- Production mode:
  
First use this command to create a production build in dist folder:  
*npm run build*  
Then to start application in production mode run this command:  
*npm run start* 


  
**Endpoints**
GET /api/users  
Returns all users.  
Response: 200 OK  
Body: User[]  

GET /api/users/{userId}  
Returns user by ID.  
Response:  
200 OK → User found  
400 Bad Request → Invalid userID  
404 Not Found → User not found  

POST /api/users  
Creates a new user.  
Request body (JSON):  
{  
  "username": string,  
  "age": number,  
  "hobbies": []  
}  
Response:  
201 Created → User created  
400 Bad Request → Invalid data 

PUT /api/users/{userId}  
Updates an existing user.  
Request body (JSON):  

{  
  "username": string,  
  "age": number ,  
  "hobbies": []  
}  
Response:  
200 OK → Updated user  
400 Bad Request → Invalid UserID  
404 Not Found → User not found  

DELETE /api/users/{userId}  
Deletes an existing user.  
Response:  
204 No Content → User deleted  
400 Bad Request → Invalid userID  
404 Not Found → User not found  

Non-existing routes  
Any other path (e.g. /api/wrong/path) → 404 Not Found with message 'Endpoint does not exist'.  


Notes:

- The database is in-memory — all data resets on restart.

- Only allowed dependencies are used (no Express, no external DB).

- Fully asynchronous API.

- Compatible with Node.js v24.10.0+.
