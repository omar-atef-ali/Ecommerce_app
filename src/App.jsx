import { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Shop from "./Components/Shop/Shop";
import Ourstory from "./Components/OurStory/Ourstory";
import { Toaster } from "react-hot-toast";


let routers = createBrowserRouter([
  { path: "/login", element: <Login /> },
    {path:"/register",element:<Register/>},
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> },
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
