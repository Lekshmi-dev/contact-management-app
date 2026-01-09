# MyContact Backend API

A RESTful API backend for managing contacts, built with Node.js and Express.js. This application provides user authentication and full CRUD operations for contact management.

## Features

- 🔐 **User Authentication**: JWT-based authentication with secure password hashing
- 👤 **User Management**: User registration and login functionality
- 📇 **Contact Management**: Full CRUD operations for contacts
- 🔒 **Protected Routes**: Token-based authorization for secure endpoints
- ⚡ **Error Handling**: Centralized error handling middleware
- 🗄️ **MongoDB Integration**: MongoDB database with Mongoose ODM
- 📝 **Input Validation**: Request validation and error messages

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.2
- **Authentication**: JSON Web Tokens (JWT) 9.0.3
- **Password Hashing**: bcrypt 6.0.0
- **Environment Variables**: dotenv 17.2.3
- **Error Handling**: express-async-handler 1.2.0

## Project Structure

```
mycontact-backend/
├── config/
│   └── dbConnection.js       # MongoDB connection configuration
├── controllers/
│   ├── contactController.js  # Contact CRUD operations
│   └── userController.js     # User authentication operations
├── middleware/
│   ├── errorHandler.js       # Global error handling middleware
│   └── validateTokenHandler.js # JWT token validation middleware
├── models/
│   ├── contactModel.js       # Contact Mongoose schema
│   └── userModel.js          # User Mongoose schema
├── routes/
│   ├── contactRoute.js       # Contact API routes
│   └── userRoute.js          # User API routes
├── constants.js              # HTTP status code constants
├── server.js                 # Application entry point
├── package.json              # Project dependencies and scripts
├── MyContact_API.postman_collection.json  # Postman collection for API testing
└── postman_environment.json  # Postman environment variables
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas account)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mycontact-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
CONNECTION_STRING=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_key
```

4. Update the `.env` file with your MongoDB connection string and JWT secret:
   - For local MongoDB: `mongodb://localhost:27017/mycontactdb`
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/mycontactdb`

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000` (or the port specified in your `.env` file).

## Postman Collection

A Postman collection is available for easy API testing. The collection includes all endpoints with pre-configured requests and automatic token management.

### Importing the Collection

1. **Download the Collection**:
   - Collection file: `MyContact_API.postman_collection.json`
   - Environment file: `postman_environment.json`

2. **Import into Postman**:
   - Open Postman
   - Click **Import** button
   - Select `MyContact_API.postman_collection.json` file
   - Also import `postman_environment.json` as an environment

3. **Set Up Environment Variables**:
   - Select the "MyContact API Environment" from the environment dropdown
   - Update `base_url` if your server runs on a different port (default: `http://localhost:5000`)

### Using the Collection

1. **First, Register or Login**:
   - Use the "Register User" request to create a new account
   - Or use the "Login User" request to get an access token
   - The token will be automatically saved to the `accessToken` environment variable

2. **Test Protected Endpoints**:
   - All contact endpoints are pre-configured with Bearer token authentication
   - The token from login is automatically used in subsequent requests

3. **Collection Features**:
   - ✅ Automatic token extraction and storage from login response
   - ✅ Pre-configured request bodies with example data
   - ✅ Bearer token authentication for protected routes
   - ✅ Environment variables for easy configuration
   - ✅ Organized folder structure (User Endpoints, Contact Endpoints)

### Alternative: Manual API Testing

If you prefer to test manually or use other tools like Insomnia or curl, refer to the API endpoints section below.

## API Endpoints

### User Endpoints

#### Register User
- **POST** `/api/users/register`
- **Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User
- **POST** `/api/users/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- **Response**: Returns JWT token

#### Get Current User
- **GET** `/api/users/currentUser`
- **Headers**: `Authorization: Bearer <token>`
- **Protected**: Yes

### Contact Endpoints

All contact endpoints require authentication (JWT token in Authorization header).

#### Get All Contacts
- **GET** `/api/contacts`
- **Headers**: `Authorization: Bearer <token>`
- **Protected**: Yes

#### Get Single Contact
- **GET** `/api/contacts/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Protected**: Yes

#### Create Contact
- **POST** `/api/contacts`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890"
}
```
- **Protected**: Yes

#### Update Contact
- **PUT** `/api/contacts/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1234567890"
}
```
- **Protected**: Yes

#### Delete Contact
- **DELETE** `/api/contacts/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Protected**: Yes

## Data Models

### User Model
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Contact Model
```javascript
{
  user_id: ObjectId (required, references User),
  name: String (required),
  email: String (required),
  phone: String (required),
  timestamps: true
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API uses centralized error handling with the following HTTP status codes:

- `400` - Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 5000) |
| `CONNECTION_STRING` | MongoDB connection string | Yes |
| `ACCESS_TOKEN_SECRET` | Secret key for JWT token signing | Yes |

## Development

### Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
- `npm test` - Run tests (not yet implemented)

## Author

Lekshmi

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue in the repository.

