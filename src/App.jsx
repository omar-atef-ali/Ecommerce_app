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
import ProductDetails from "./Components/ProductDetails/ProductDetails";
let routers = createBrowserRouter([
  {path:"/register",element:<Register/>},
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> },
      {path:"/productdetails",element:<ProductDetails />}


    ],
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
