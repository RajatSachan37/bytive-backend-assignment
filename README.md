# To-Do List API with JWT Authentication

## Project Overview
A simple RESTFUL API built with Node.js, Express, and MongoDB to manage a to-do list. The API supports user authentication using JSON Web Tokens (JWT). Each user can create, view, update, and delete their tasks securely.
Deployed Link: https://todolist-api-deploy.onrender.com/

---

## Features

### Authentication
- **Signup**: Create a new user account.
- **Login**: Authenticate and receive a JWT.

### Task Management (Authenticated)
- **Create Task**: Add a new task.
- **Get All Tasks**: Fetch all tasks for the authenticated user.
- **Get Task by ID**: Retrieve a specific task by its ID.
- **Update Task**: Update the status of a task.
- **Delete Task**: Remove a task by its ID.

---

## Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local or cloud instance)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RajatSachan37/bytive-backend-assignment
   cd bytive-backend-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   MONGO_URI=<--INSERT YOUR MONGODB CONNECTION STRING HERE-->
   JWT_SECRET=<--INSERT YOUR JWT SECRET HERE-->
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The API will run at `http://localhost:3000/`.

---

## Endpoints

### Authentication

#### Register User
- **POST** `/auth/signup`
- **Description**: Create a new user account.
- **Request Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully"
  }
  ```

#### Login User
- **POST** `/auth/login`
- **Description**: Authenticate and receive a JWT.
- **Request Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### Tasks (Authenticated)

> **Note**: Include the `Authorization` header with the JWT for all task endpoints:
> ```
> Authorization: Bearer <your_jwt_token>
> ```

#### Create Task
- **POST** `/tasks`
- **Description**: Add a new task.
- **Request Body**:
  ```json
  {
    "title": "task1",
    "description": "description1"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "task1",
    "description": "description1",
    "status": "pending",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

#### Get All Tasks
- **GET** `/tasks`
- **Description**: Fetch all tasks for the authenticated user.
- **Response**:
  ```json
  [
    {
      "_id": "task_id",
      "title": "task1",
      "description": "description1",
      "status": "pending",
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

#### Get Task by ID
- **GET** `/tasks/:id`
- **Description**: Retrieve a specific task by its ID.
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "task1",
    "description": "description1",
    "status": "pending",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

#### Update Task
- **PUT** `/tasks/:id`
- **Description**: Update the status of a task.
- **Request Body**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "task1",
    "description": "description1",
    "status": "completed",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
  ```

#### Delete Task
- **DELETE** `/tasks/:id`
- **Description**: Remove a task by its ID.
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express**: Web application framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling for Node.js.
- **jsonwebtoken**: For generating and verifying JWTs.
- **bcryptjs**: For hashing passwords.

---

## Running Tests

You can use **Postman collections** included in this repository to test the API endpoints. Ensure to include the `Authorization` header with the JWT for protected routes.

---
