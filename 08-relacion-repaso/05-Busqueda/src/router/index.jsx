import { createBrowserRouter } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import ResultsPage from '../components/ResultsPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <SearchPage />
    },
    {
        path: '/results',
        element: <ResultsPage />
    }
]);