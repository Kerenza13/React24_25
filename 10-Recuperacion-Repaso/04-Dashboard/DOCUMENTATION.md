# Dashboard Application Documentation

## Overview
The Dashboard application is a React-based analytics and inventory management interface that provides real-time statistics, data visualization, and inventory monitoring capabilities.

## Core Features
- Real-time statistics display
- Interactive data visualization using recharts
- Date range filtering
- CSV export functionality
- Low stock alerts
- Responsive design

## Architecture

### Components

#### Dashboard (`Dashboard.jsx`)
Main component that serves as the application's primary interface.

**Key Features:**
- Statistics cards display
- Date range filtering
- Data visualization with BarChart
- Low stock alerts table
- CSV export functionality

#### StatCard
Reusable component for displaying individual statistics.
- Supports loading states with skeleton animation
- Displays title and value with consistent styling

### Custom Hooks

#### useDashboardStats
Manages the dashboard's data and business logic.

**Functionality:**
- Fetches and calculates statistics
- Manages loading and error states
- Handles date range filtering
- Provides CSV export functionality
- Auto-refreshes data every 30 seconds

### Protected Routes
The dashboard is wrapped in a `ProtectedRoute` component that ensures only authenticated users can access it.

## State Management
- Uses React's built-in useState and useEffect hooks
- Implements custom hook pattern for business logic separation
- Maintains loading and error states
- Handles date range filtering state

## Data Flow
1. Dashboard component mounts
2. useDashboardStats hook initializes and fetches data
3. Data is processed and categorized
4. UI updates with new data
5. Auto-refresh cycle maintains data freshness

## API Integration
- Connects to a REST API endpoint (`http://localhost:3000/api/products`)
- Fetches product data and calculates statistics
- Handles API errors gracefully

## Features in Detail

### Statistics Display
- Total Products Count
- Total Inventory Value
- Low Stock Items Count
- Category Count

### Data Visualization
- Bar chart showing products by category
- Interactive tooltips
- Responsive container adaptation

### Date Filtering
- Start and end date selection
- Dynamic data refresh on filter change
- Filter state management

### CSV Export
- Exports category-based statistics
- Generates downloadable CSV file
- Proper blob handling and cleanup

### Low Stock Alerts
- Displays products with stock below threshold (10 items)
- Tabular presentation with product details
- Conditional rendering based on alert presence

## UI/UX Considerations
- Responsive design for various screen sizes
- Loading states with skeleton animations
- Error handling with user feedback
- Clean and intuitive layout
- Consistent styling with Tailwind CSS

## Performance Optimization
- Debounced data fetching
- Efficient state updates
- Proper cleanup of intervals and event listeners
- Conditional rendering to minimize DOM updates

## Security
- Protected route implementation
- API error handling
- Data validation

## Dependencies
- React
- React Router DOM
- Recharts for data visualization
- Tailwind CSS for styling

## Best Practices Implemented
- Component composition
- Custom hook abstraction
- Error boundary implementation
- Responsive design principles
- Proper TypeScript/PropTypes usage
- Clean code structure

## Future Enhancements
- Additional chart types
- More detailed product analytics
- Custom date range presets
- Advanced filtering options
- Real-time notifications
- Export in multiple formats