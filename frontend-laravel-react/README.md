# React Frontend for Laravel REST API - STAY STRONG

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
- Fetch API for HTTP requests
- Tailwind CSS for styling
- Vite as bundler
- Context API for state management
- JWT for authentication
- FontAwesome for icons
- React-Toastify for notifications

## Installation

To install and run this project locally, you’ll need to set up both the backend and frontend. Follow these steps to get started:

### Runing the backend

1. Clone the repository:
   ```sh
   git clone https://github.com/SimonMMB/Sprint_5.git
   ```
2. Install dependencies: 
   ```sh
   composer install
   npm install
   ```
3. Copy `.env.example` to `.env`  
4. Generate app key:  
   ```sh
   php artisan key:generate
   ```
5. Configure database credentials in `.env`  
6. Start your MySQL server and create a database named `StayStrong`
7. Generate Passport keys:
   ```sh
   php artisan passport:install
   ```
   *Use `--force` if keys already exist*
8. Run migrations and seed the database:
   ```sh
   php artisan migrate --seed
   ```
9. Start the local server:
   ```sh
   php artisan serve
   ```

### Runing the frontend

1. Clone the repository
```bash
git clone https://github.com/SimonMMB/Sprint_5_vol_II.git
```
2. Navigate to the project directory
```bash
cd frontend-laravel-react
```
3. Install dependencies
```bash
npm install
```
4. Create .env file with API URL
```bash
echo "VITE_API_URL=http://localhost:8000/api" > .env.local
```
5. Start the development server
```bash
npm run dev
```

#### Ready! The application will be available at http://localhost:5173.

## Project Structure

The project follows a modular architecture and is organized as follows:

```
src/
├── api/                  # Services for backend communication
│   ├── authService.js    # Authentication service
│   ├── userService.js    # User management service
│   ├── programService.js # Program management service
│   ├── sessionService.js # Session management service
│   └── exerciseService.js # Exercise management service
├── components/           # Reusable components
│   ├── auth/             # Authentication components
│   │   ├── Login.jsx     # Login form
│   │   └── Register.jsx  # Registration form
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
- **Registration Form**: Allows new users to create an account (now restricted to trainee role only)
- **JWT Token Management**: Secure storage and usage of authentication tokens
- **Protected Routes**: Restricts access to authenticated users
- **Role-Based Authorization**: Different features based on user roles
- **Authentication Debugging**: Tools to diagnose authentication issues
- **Logout Functionality**: Secure session termination with proper redirection
- **Auth State Management**: Improved detection of authentication state changes

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
- **Program Creation**: Create new training programs with duration and frequency (now with minimum duration of 2 months)
- **Program Details**: View detailed information about a program
- **Program Deletion**: Remove programs from the system
- **Error Handling**: Robust error handling for API communication issues

### Training Sessions Management

- **Sessions Listing**: View all training sessions for a program
- **Pagination**: Display sessions in pages of 10 for better usability
- **Session Details**: View detailed information about a session
- **Exercise Tracking**: Mark exercises as completed and record weights
- **Session Completion**: Track completed vs pending sessions

### UI Components

- **Responsive Navigation**: Works on mobile and desktop devices
- **Brand Identity**: Consistent "STAY STRONG" branding across all components
- **Alert System**: Notifications for user feedback using React-Toastify
- **Loading Indicators**: Show loading states during operations
- **Confirmation Dialogs**: Request confirmation for critical actions
- **Simplified Header**: Eliminated redundant headers for cleaner navigation

## API Integration

Integration with the Laravel REST API is done through dedicated services using the Fetch API. The authentication service implementation includes:

```javascript
// src/api/authService.js
export const register = async (userData) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};
```

Services are structured to match the API endpoints and provide clear method signatures:

```javascript
// Example of program service with real API integration
export const getPrograms = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/programs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
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
- **Injection**: Added to API requests via Authorization headers
- **Validation**: Checks for token presence to determine authentication state

### Login and Registration

- **Form Validation**: Client-side validation before submission
- **Server Error Handling**: Display validation errors from the API
- **Redirect Logic**: Automatic redirection after successful authentication
- **Role Restriction**: Registration now restricted to trainee role only

### Authentication Flow

1. User submits credentials via login/registration form
2. Application sends request to API endpoint
3. On success, token is stored and user information is saved
4. User is redirected to the dashboard
5. Subsequent API calls include the token in Authorization header
6. Protected routes check authentication status before rendering

### Logout Mechanism

The application now includes an improved logout mechanism that ensures proper redirection:

```javascript
// Navbar.jsx - Logout handler with improved navigation
const handleLogout = () => {
  try {
    // First remove authentication tokens
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Show success message
    toast.success('Sesión cerrada correctamente');
    
    // Redirect to login (using replace to prevent going back)
    navigate('/login', { replace: true });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    toast.error('Error al cerrar sesión');
  }
};
```

### Authentication State Detection

The application now includes a reactive system to detect changes in authentication state:

```javascript
// App.jsx - Authentication state detection
function App() {
  // Add state to track authentication
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  
  // Check authentication when localStorage changes
  useEffect(() => {
    // Function to verify authentication
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };
    
    // Check initially
    checkAuth();
    
    // Listen for changes in localStorage
    window.addEventListener('storage', checkAuth);
    
    // Create an observer to periodically check
    const authCheckInterval = setInterval(checkAuth, 1000);
    
    // Clean up listeners and interval
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(authCheckInterval);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use local state instead of calling the function directly */}
      {authenticated && <Navbar />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
```

This approach ensures that the UI correctly reflects the current authentication state at all times.

## Development Process

The development has followed these phases:

1. **Initial Architecture**: Set up project structure and core components
2. **Mock Services**: Developed with simulated data for rapid UI development
3. **Component Implementation**: Created all UI components with mock data
4. **API Integration**: Connected frontend to the real Laravel API
5. **Authentication Implementation**: Set up the JWT authentication system
6. **Testing and Debugging**: Resolved integration issues and edge cases
7. **UI Refinement**: Updated components for better user experience
   - Renamed application from "Fitness Tracker" to "STAY STRONG"
   - Restricted registration to trainee role only
   - Set minimum program duration to 2 months
   - Added pagination to session listings (10 per page)
8. **Navigation Improvements**: Fixed issues with redirection and logout functionality
9. **Interface Streamlining**: Eliminated redundant UI elements and simplified navigation

## Recent Improvements

The latest development session focused on several key improvements:

### Navigation and UI Simplification
- **Header Consolidation**: Eliminated the redundant header, keeping only the functional Navbar for cleaner UI
- **Improved Authentication State Detection**: Added reactive state tracking for authentication status
- **Enhanced Error Handling**: Added robust error handling and recovery in ProgramsList component
- **Logout Redirection**: Fixed navigation issues when logging out to ensure proper redirection

### Authentication Refinements
- **Simplified Login/Logout Flow**: Improved the authentication flow with more reliable redirection
- **Authentication State Monitoring**: Implemented periodic and event-based authentication state checking
- **Login Persistence**: Better handling of authentication state after registration

### Technical Improvements
- **Error Boundary Implementation**: Added proper error handling for API communication failures
- **Data Validation**: Enhanced validation of API responses to prevent UI errors
- **Defensive Programming**: Added fallbacks and default values to handle edge cases
- **Format Date Handling**: Improved date formatting with proper error catching

## Next Steps

The following features and improvements are planned for future development:

- Implement advanced filtering and searching for listings
- Add exercise management and video tutorials within training sessions
- Implement advanced progress tracking and statistics
- Add data visualization for training progress
- Implement user profile management with image uploads
- Add notification system for upcoming sessions
- Implement testing with Jest and React Testing Library
- Add offline capabilities with service workers
- Optimize performance with lazy loading and code splitting