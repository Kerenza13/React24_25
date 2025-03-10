import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import DashboardLayout from "../components/DashboardLayout";
import PrivateRoute from "../components/PrivateRoute";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Orders />,
          },
          {
            path: "pedido",
            element: <OrderDetails />,
          },
        ],
      },
    ],
  },
]);
