# Restaurant Frontend Documentation

## Overview
A modern restaurant management system built with React that provides menu viewing, order management, and authentication functionality. The application uses React Router for navigation, Context API for state management, and Tailwind CSS for styling.

## Core Features
- Public menu viewing
- User authentication system
- Shopping cart functionality
- Order management dashboard
- Protected routes for authenticated users

## Project Structure

### Components
- **DashboardLayout**: Layout component for the admin dashboard
- **PrivateRoute**: HOC for protecting authenticated routes
- **Cart**: Shopping cart component for managing orders

### Pages
- **Menu**: Displays restaurant menu items with add to cart functionality
- **Login**: Handles user authentication
- **Orders**: Shows list of orders in the dashboard
- **OrderDetails**: Displays detailed information about specific orders

### Layouts
- **RootLayout**: Main layout component with navigation and cart

### Context
- **AuthContext**: Manages authentication state and methods
- **CartContext**: Handles shopping cart state and operations

## Routing Structure
```
/                 - Menu page (public)
/login            - Login page
/dashboard        - Orders list (protected)
/dashboard/pedido - Order details (protected)
```

## State Management

### Authentication Context
- User authentication status
- Login/Logout methods
- Protected route handling

### Cart Context
- Cart items management
- Add/Remove items
- Calculate total
- Order submission

## API Integration
- Menu fetching from backend API
- Authentication endpoints
- Order management API calls

## UI/UX Features
- Responsive design with Tailwind CSS
- Loading states
- Error handling
- User-friendly cart interface

## Security Features
- Protected routes implementation
- Authentication token management
- Secure API calls

## Best Practices
- Component composition
- Context API for state management
- Protected route pattern
- Error handling
- Loading states

## Dependencies
- React
- React Router DOM
- Tailwind CSS
- Vite (Build tool)

## Environment Configuration
- VITE_API_URL: Backend API endpoint

## Development Setup
1. Install dependencies: `npm install`
2. Set up environment variables
3. Start development server: `npm run dev`

## Build and Deployment
1. Build the project: `npm run build`
2. Preview build: `npm run preview`