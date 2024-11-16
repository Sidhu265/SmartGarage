# Smart Garage

Smart Garage is a web application that allows users to manage their vehicles efficiently. Built with a React frontend and an Express backend, this application provides features for adding, editing, viewing, and deleting vehicle information.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)


## Features

- User authentication (sign up and sign in)
- Add new vehicles with details such as title, description, and image
- View a list of vehicles
- Edit vehicle details
- Delete vehicles
- Secure API endpoints with JWT authentication

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: React Hooks
- **API Client**: Axios

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sidhu265/SmartGarage.git
   cd SmartGarage
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add your MongoDB connection string and JWT secret:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

## Usage

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to access the application.

## API Endpoints

### User Routes
- **POST** `/api/users/signup`: Register a new user
- **POST** `/api/users/signin`: Sign in an existing user

### Car Routes
- **GET** `/api/cars`: Get all cars for the authenticated user
- **GET** `/api/cars/:id`: Get a specific car by ID
- **POST** `/api/cars/newcar`: Add a new car
- **PUT** `/api/cars/:id`: Update a car by ID
- **DELETE** `/api/cars/:id`: Delete a car by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
