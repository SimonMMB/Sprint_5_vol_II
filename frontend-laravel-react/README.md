# React Frontend for Laravel REST API - Fitness Tracker

This project consists of a React frontend developed to consume a REST API created with Laravel. The application allows managing users, training programs, and training sessions.

## Table of Contents
- [Technologies](#technologies)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Implemented Features](#implemented-features)
- [API Integration](#api-integration)
- [Mock Services](#mock-services)
- [Next Steps](#next-steps)

## Technologies

The project uses the following technologies and libraries:
- React 19
- React Router 7.5.3
- Axios for HTTP requests
- Tailwind CSS for styling
- Vite as bundler
- Context API for state management

## Installation

To install and run this project in your local environment, follow these steps:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd frontend-laravel-react

# Install dependencies
npm install

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
├── context/              # React contexts for global state
│   ├── AuthContext.jsx   # Authentication context
│   └── AlertContext.jsx  # Notifications context
├── components/           # Reusable components
│   ├── Alert.jsx         # Alert notifications
│   ├── ConfirmDialog.jsx # Confirmation dialogs
│   ├── Empty.jsx         # Empty state component
│   ├── Layout.jsx        # Page layout with navigation
│   ├── LoadingSpinner.jsx # Loading indicator
│   ├── Navigation.jsx    # Navigation menu
│   └── ProtectedRoute.jsx # Route protection component
├── pages/                # Main application pages
│   ├── Home.jsx          # Home page
│   ├── Login.jsx         # Login page
│   ├── Register.jsx      # Registration page
│   ├── Dashboard.jsx     # Main dashboard
│   ├── NotFound.jsx      # 404 page
│   ├── Programs.jsx      # Program listing
│   ├── ProgramDetail.jsx # Program details
│   ├── CreateProgram.jsx # Program creation
│   ├── EditProgram.jsx   # Program editing
│   ├── Sessions.jsx      # Session listing
│   ├── SessionDetail.jsx # Session details
│   ├── CreateSession.jsx # Session creation
│   └── EditSession.jsx   # Session editing
├── App.jsx               # Main component with routes
└── main.jsx              # Application entry point
```

## Implemented Features

So far, the following features have been implemented:

### Authentication System
- **Home Page**: Landing page with application information and links to authentication
- **Login Form**: Allows users to authenticate in the application
- **Registration Form**: Allows new users to create an account
- **Authentication Context**: Global state for user authentication status

### User Dashboard
- **Dashboard Overview**: Shows stats and recent programs/sessions
- **Navigation Menu**: Responsive menu with links to all sections
- **Layout System**: Common layout with navigation for authenticated pages

### Training Programs Management
- **Programs Listing**: View all training programs
- **Program Creation**: Create new training programs
- **Program Details**: View detailed information about a program
- **Program Editing**: Update existing program information
- **Program Deletion**: Remove programs from the system

### Training Sessions Management
- **Sessions Listing**: View all training sessions
- **Session Creation**: Create new training sessions
- **Session Details**: View detailed information about a session
- **Session Editing**: Update existing session information
- **Session Deletion**: Remove sessions from the system

### UI Components
- **Alert System**: Notifications for user feedback
- **Loading Indicators**: Show loading states during operations
- **Empty States**: Appropriate display when no data is available
- **Confirmation Dialogs**: Request confirmation for critical actions
- **Responsive Design**: Works on mobile and desktop devices

## API Integration

Integration with the Laravel REST API is done through dedicated services that encapsulate HTTP calls using Axios. The base configuration includes:

- **Base URL**: Connection to the main API endpoint
- **Request Interceptors**: Automatically inject the JWT token into headers
- **Response Interceptors**: Handle authentication errors (401) by redirecting to login

Configuration example:

```javascript
// src/api/config.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export default apiClient;
```

## Mock Services

For development purposes, the application currently uses mock services that simulate API responses. These services allow testing the application without a running backend:

```javascript
// Example of a mock service for programs
export const getPrograms = async () => {
  // Simulation: in a real implementation, this would be:
  // return apiClient.get('/programs');
  
  return Promise.resolve({ data: mockPrograms });
};
```

This approach provides several benefits:
- Development can proceed without waiting for the backend
- UI can be tested with realistic data
- Easy transition to the real API by simply uncommenting the API calls
- Consistent data format matching the expected API responses

## Next Steps

The following features and improvements are planned for future development:

- Connect to the real Laravel API by updating the service implementations
- Implement advanced form validations with better error handling
- Add exercise management within training sessions
- Implement progress tracking features
- Add filtering and sorting capabilities to listings
- Implement user profile management
- Add data visualization for training progress
- Implement testing with Jest and React Testing Library

This README will be progressively updated as new features are implemented.