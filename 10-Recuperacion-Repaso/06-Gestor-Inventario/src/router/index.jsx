import { createBrowserRouter } from 'react-router-dom';
import InventoryList from '../components/InventoryList';
import AddItem from '../components/AddItem';
import EditItem from '../components/EditItem';
import ItemDetails from '../components/ItemDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <InventoryList />
    },
    {
        path: '/add',
        element: <AddItem />
    },
    {
        path: '/edit/:id',
        element: <EditItem />
    },
    {
        path: '/item/:id',
        element: <ItemDetails />
    }
]);