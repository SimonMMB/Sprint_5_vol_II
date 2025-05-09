# React Frontend for Laravel REST API - Fitness Tracker

This project consists of a React frontend developed to consume a REST API created with Laravel. The application allows managing users, training programs, and training sessions.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Implemented Features](#implemented-features)
- [API Integration](#api-integration)
- [Authentication System](#authentication-system)
- [Development Process](#development-process)
- [Next Steps](#next-steps)

## Technologies

The project uses the following technologies and libraries:

- React 19
- React Router 7.5.3
- Axios for HTTP requests
- Tailwind CSS for styling
- Vite as bundler
- Context API for state management
- JWT for authentication
- FontAwesome for icons
- React-Toastify for notifications

## Installation

To install and run this project in your local environment, follow these steps:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd frontend-laravel-react

# Install dependencies
npm install

# Create .env file with API URL
echo "VITE_API_URL=http://localhost:8000/api" > .env.local

# Start the development server
npm run dev
```

The application will be available at http://localhost:5173.

## Project Structure

The project follows a modular architecture and is organized as follows:

```
src/
├── api/                  # Services for backend communication
│   ├── authService.js    # Authentication service
│   ├── userService.js    # User management service
│   ├── programService.js # Program management service
│   ├── sessionService.js # Session management service
│   ├── exerciseService.js # Exercise management service
│   └── config.js         # API configuration
├── components/           # Reusable components
│   ├── auth/             # Authentication components
│   │   ├── Login.jsx     # Login form
│   │   ├── Register.jsx  # Registration form
│   │   └── AuthDebug.jsx # Authentication debugging tool
│   ├── common/           # Common components
│   │   ├── Navbar.jsx    # Navigation bar
│   │   ├── Footer.jsx    # Footer component
│   │   └── NotFound.jsx  # 404 page
│   ├── dashboard/        # Dashboard components
│   │   └── Dashboard.jsx # Main dashboard
│   ├── program/          # Program-related components
│   │   ├── ProgramsList.jsx     # Programs listing
│   │   ├── ProgramDetail.jsx    # Program details
│   │   └── CreateProgramForm.jsx # Program creation form
│   ├── session/          # Session-related components
│   │   ├── TrainingSessionsList.jsx # Sessions listing
│   │   └── TrainingSessionDetail.jsx # Session details
│   └── user/             # User-related components
│       ├── UserProfile.jsx # User profile page
│       └── UsersList.jsx # Users listing (admin)
├── routes/               # Routing configuration
│   ├── AppRoutes.jsx     # Main routes definition
│   └── ProtectedRoute.jsx # Authentication protection
├── App.jsx               # Main component with providers
└── main.jsx              # Application entry point
```

## Implemented Features

So far, the following features have been implemented:

### Authentication System

- **Login Form**: Allows users to authenticate in the application
- **Registration Form**: Allows new users to create an account
- **JWT Token Management**: Secure storage and usage of authentication tokens
- **Protected Routes**: Restricts access to authenticated users
- **Role-Based Authorization**: Different features based on user roles
- **Authentication Debugging**: Tools to diagnose authentication issues

### User Management

- **User Profile**: View and edit user information
- **User Listing**: Admin view of all users in the system
- **Role Management**: Display and filter users by roles

### Dashboard

- **Overview Statistics**: Shows key metrics and program progress
- **Recent Activities**: Displays recent training sessions
- **Progress Tracking**: Visual indicators of training completion

### Training Programs Management

- **Programs Listing**: View all training programs
- **Program Creation**: Create new training programs with duration and frequency
- **Program Details**: View detailed information about a program
- **Program Deletion**: Remove programs from the system

### Training Sessions Management

- **Sessions Listing**: View all training sessions for a program
- **Session Details**: View detailed information about a session
- **Exercise Tracking**: Mark exercises as completed and record weights
- **Session Completion**: Track completed vs pending sessions

### UI Components

- **Responsive Navigation**: Works on mobile and desktop devices
- **Alert System**: Notifications for user feedback using React-Toastify
- **Loading Indicators**: Show loading states during operations
- **Confirmation Dialogs**: Request confirmation for critical actions

## API Integration

Integration with the Laravel REST API is done through dedicated services that encapsulate HTTP calls using Axios. The base configuration includes:

```javascript
// src/api/config.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Interceptor for adding the token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export default apiClient;
```

Services are structured to match the API endpoints and provide clear method signatures:

```javascript
// Example of program service with real API integration
export const getPrograms = async () => {
  try {
    const response = await apiClient.get('/programs');
    return response.data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};
```

## Authentication System

The application implements a robust JWT-based authentication system:

### Token Management

- **Storage**: Tokens are stored in localStorage for persistence
- **Injection**: Automatically added to API requests via Axios interceptors
- **Validation**: Checks for token presence to determine authentication state

### Login and Registration

- **Form Validation**: Client-side validation before submission
- **Server Error Handling**: Display validation errors from the API
- **Redirect Logic**: Automatic redirection after successful authentication

### Authentication Flow

1. User submits credentials via login/registration form
2. Application sends request to API endpoint
3. On success, token is stored and user information is saved
4. User is redirected to the dashboard
5. Subsequent API calls include the token in Authorization header
6. Protected routes check authentication status before rendering

### Debugging Tools

The application includes a specialized authentication debugging tool for development:

- **Direct API Testing**: Test authentication without UI flows
- **Response Inspection**: View raw API responses
- **Token Analysis**: Verify token format and presence
- **Error Visualization**: See detailed error information

## Development Process

The development has followed these phases:

1. **Initial Architecture**: Set up project structure and core components
2. **Mock Services**: Developed with simulated data for rapid UI development
3. **Component Implementation**: Created all UI components with mock data
4. **API Integration**: Connected frontend to the real Laravel API
5. **Authentication Implementation**: Set up the JWT authentication system
6. **Testing and Debugging**: Resolved integration issues and edge cases

## Next Steps

The following features and improvements are planned for future development:

- Implement advanced filtering and searching for listings
- Add exercise management within training sessions
- Implement advanced progress tracking and statistics
- Add data visualization for training progress
- Implement user profile management with image uploads
- Add notification system for upcoming sessions
- Implement testing with Jest and React Testing Library
- Add offline capabilities with service workers
- Optimize performance with lazy loading and code splitting

This README will be progressively updated as new features are implemented.