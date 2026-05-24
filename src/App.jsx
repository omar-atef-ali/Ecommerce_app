import { useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login";
import ProfileLayout from "./Components/ProfileLayout/ProfileLayout";
import Profile from "./Components/Profile/Profile";
import MyOrders from "./Components/MyOrders/MyOrders";
import Cart from "./Components/Cart/Cart";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Shop from "./Components/Shop/Shop";
import Ourstory from "./Components/OurStory/Ourstory";
import CheckOut from "./Components/CheckOut/CheckOut";


let routers = createBrowserRouter([
  { path: "/login", element: <Login /> },
    {path:"/register",element:<Register/>},
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <CheckOut /> },
      {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <Profile /> },
          { path: "orders", element: <MyOrders /> },
          // Add other nested profile routes here later
        ]
      },
      {path:"/productdetails/:id",element:<ProductDetails />},
      {path:"/shop",element:<Shop />},
      {path:"/ourstory",element:<Ourstory />},
      

    ],
  },


]);

function App() {

  return (
    <>
      <Toaster />
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
