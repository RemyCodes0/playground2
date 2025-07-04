# Amea Playground

Amea Playground is an interactive gaming platform that includes various educational games, with Ace_it being one of its featured games. The platform is built using React for the frontend and Node.js/Express for the backend, with MongoDB as the database.

## Features

### Ace_it Game
- Initial skill assessment test
- Customizable feedback rate
- Score tracking and history
- User authentication and profile management
- Real-time score updates
- Progress tracking

### Platform Features
- User authentication using Auth0
- Secure API endpoints
- Responsive design
- Score history tracking
- Multiple game support

## Tech Stack

### Frontend
- React.js
- Auth0 for authentication
- Axios for API calls
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

## Environment Variables

### Client (.env)
```
REACT_APP_AUTH0_DOMAIN=your_auth0_domain
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
```

### Server (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd amea-playground
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

## Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

### Scores
- POST `/api/scores` - Create a new score
- GET `/api/scores/user/:userId` - Get user's scores
- GET `/api/scores/user/:userId/latest` - Get user's latest score

### Games
- GET `/api/games` - Get list of available games

## Project Structure

```
amea-playground/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── games/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- All API endpoints are protected with JWT authentication
- User authentication is handled through Auth0
- Sensitive data is stored securely in MongoDB
- Environment variables are used for sensitive information

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [support@amea.com] or create an issue in the repository.

## Acknowledgments

- Auth0 for authentication services
- MongoDB for database services
- React and Node.js communities for their excellent documentation
# playground2
