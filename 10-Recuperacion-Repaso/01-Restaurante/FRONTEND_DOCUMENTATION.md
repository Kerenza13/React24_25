# Restaurant Application Frontend Documentation

## Overview

This frontend application provides a user-friendly interface for a restaurant ordering system. Users can browse the menu, manage their cart, and place orders either for dine-in or takeout.

## Core Features

### Authentication System

- Users can register and log in to access personalized features
  - Implementation: Uses JWT tokens stored in localStorage
  - AuthContext manages global authentication state
  - Login/Register forms with field validation
  - Token refresh mechanism for session persistence

- Protected routes ensure only authenticated users can access certain features
  - Implementation: React Router with PrivateRoute component
  - Automatically redirects unauthorized users to login
  - Preserves attempted URL for post-login redirect

### Menu Display

- **Browse Menu Items**: Users can view all available dishes with their details
  - Implementation: Fetches menu data from API endpoint `/menu`
  - Uses React Query for efficient data caching
  - Implements infinite scroll for large menus

- **Category Filtering**: Menu items can be filtered by categories:
  - Implementation: Client-side filtering using array methods
  - Categories: All, Entrantes, Principales, Postres, Bebidas
  - Updates URL query params for shareable filtered views

- **Item Details**: Each menu item displays:
  - Implementation: Card component with consistent styling
  - Responsive images with lazy loading
  - Price formatting with locale support
  - Conditional rendering of Add to Cart button based on auth state

### Shopping Cart

- **Cart Management**: Users can:
  - Implementation: CartContext provides global cart state
  - Add items: Updates quantity if item exists, adds new entry if not
  - Remove items: Decrements quantity or removes item entirely
  - View contents: Persistent cart state using localStorage
  - Real-time price calculations with subtotal and total

- **Cart Context**: Cart state is managed globally
  - Implementation: React Context API with reducer pattern
  - Handles all cart operations (add, remove, clear)
  - Persists cart data across page refreshes
  - Provides cart total and item count to all components

### Order Processing

- **Order Details Form**:
  - Implementation: Formik for form management
  - Dynamic validation based on order type
  - Table number validation for dine-in orders
  - Real-time order summary updates

- **Order Confirmation**:
  - Implementation: Multi-step confirmation process
  - Validates cart contents and user details
  - Sends order to API with error handling
  - Success/error notifications using toast messages

## User Flow

1. User browses the menu (authenticated or not)
   - Public routes accessible to all users
   - Category filters and search functionality available

2. User logs in to access ordering features
   - Form validation with error messages
   - JWT token storage and management
   - Automatic redirect to previous page

3. User adds desired items to cart
   - Instant UI updates via CartContext
   - Animated notifications for cart changes
   - Persistent cart data in localStorage

4. User proceeds to order details
   - Protected route requiring authentication
   - Form validation with user feedback
   - Dynamic fields based on order type

5. User specifies dining preferences
   - Conditional rendering of relevant fields
   - Real-time validation and feedback
   - Table number required for dine-in orders

6. User confirms and places the order
   - Final validation of all details
   - API call with error handling
   - Success confirmation and redirect

## Technical Features

- Responsive design using Flexbox and Grid
- Real-time cart updates via Context API
- Form validation using Formik and Yup
- Error boundary implementation for stability
- Protected routes with React Router
- Global state management patterns

## UI Components

- **Navigation**: Responsive header with dynamic menu
- **Menu Filters**: Accessible category selection
- **Product Cards**: Optimized image loading
- **Cart Interface**: Slide-in cart panel
- **Order Form**: Step-by-step process
- **Loading States**: Skeleton loading UI
- **Error Messages**: Toast notifications

## User Experience

- Intuitive navigation with breadcrumbs
- Clear visual hierarchy using design system
- Responsive feedback with animations
- Smooth transitions using React Transition Group
- Consistent error handling patterns
- Mobile-first responsive design

## Application Status

The application meets all established requirements:
- ✅ Complete authentication system
- ✅ Functional cart management
- ✅ Menu filtering by categories
- ✅ Order processing implementation
- ✅ Responsive and user-friendly interface
- ✅ Robust error handling
- ✅ Intuitive and complete user flow
