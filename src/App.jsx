import { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import ProfileLayout from "./Components/ProfileLayout/ProfileLayout";
import Profile from "./Components/Profile/Profile";
import MyOrders from "./Components/MyOrders/MyOrders";
import Cart from "./Components/Cart/Cart";

let routers = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <Profile /> },
          { path: "orders", element: <MyOrders /> },
          // Add other nested profile routes here later
        ]
      },
    ]
  },


]);

function App() {

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
