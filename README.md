# Stride - server

## Client repo

[link](link)

## Run the server locally

1.**Clone the repository:**

```bash
 git clone https://github.com/jamshed-uddin/mini-productivity-dashboard-server.git

```

2.**Change directory**

```bash
 cd mini-productivity-dashboard-server
```

3.**Install the packages**

```sh
 npm install
```

2.**Setup environment variables**
Create a `.env` file in the root directory and add these environment variables.

```sh
PORT=port
MONGO_URI=you_mongodb_connection_uri
SECRET=secret
```

## Run the server

```sh
node index.js
```

## API endpoints

### Endpoint documentation(postman)

[https://documenter.getpostman.com/view/29126982/2sB2ixitZM](https://documenter.getpostman.com/view/29126982/2sB2ixitZM)

## Auth

### 1. Login

- Route: `POST /api/users/login `
- Access: Public
- Body

```json
{
  "email": "johndoe@gmail.com",
  "password": "testpassword"
}
```

- Response

```json
{
  "message": "Login successful",
  "data": {
    //user data
  }
}
```

### 2. Register

- Route: `POST /api/users/register `
- Access: Public
- Body

```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "testpassword"
}
```

- Response

```json
{
  "message": "User registered",
  "data": {
    //user data
  }
}
```

## Tasks

### 1. Create

- Route: `POST /api/tasks`
- Access: Private
- Body

```json
{
  "title": "Test title",
  "description": "Test description",
  "date": "2025-05-29T13:49:58.587Z", //iso string
  "priority": "low" // low / medium /high
}
```

- Response

```json
{
  "message": "Task created successfully",
  "data": {
    //task data
  }
}
```

### 2. Get

- Route: `GET /api/tasks`
- Access: Private
- Response

```json
{
  "message": "Tasks retrieved",
  "data": {
    //task data
  }
}
```

### 3. Update

- Route: `PUT /api/tasks/:id`
- Access: Private
- Body

```json
{
  "title": "Test title updated",
  "description": "Test description updated"
}
```

- Response

```json
{
  "message": "Task updated successfully",
  "data": {
    //updated task data
  }
}
```

### 4. Delete

- Route: `DELETE /api/tasks/:id`
- Access: Private
- Response

```json
{ "message": "Task deleted" }
```

## Goals

### 1. Create

- Route: `POST /api/goals`
- Access: Private
- Body

```json
{
  "title": "Test goal",
  "description": "Test description"
}
```

- Response

```json
{
  "message": "Goal created successfully",
  "data": {
    //goal data
  }
}
```

### 2. Get

- Route: `GET /api/goals`
- Access: Private
- Response

```json
{
  "message": "Goals retrieved",
  "data": [
    {
      //task data
    }
  ]
}
```

### 3. Update

- Route: `PUT /api/goals/:id`
- Access: Private
- Body

```json
{
  "title": "Goal title updated",
  "description": "Goal description updated"
}
```

- Response

```json
{
  "message": "Goal updated successfully",
  "data": {
    //updated goal data
  }
}
```

### 4. Delete

- Route: `DELETE /api/goals/:id`
- Access: Private
- Response

```json
{ "message": "Goal deleted" }
```

## Dependencies

```json
 "dependencies": {
    "bcryptjs": "^3.0.2",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "joi": "^17.13.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.15.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.27.0",
    "eslint": "^9.27.0",
    "globals": "^16.1.0"
  }
```
