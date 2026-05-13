import { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> }


    ],
  },


]);

function App() {

  return (
    <>
      <RouterProvider router={routers} />;
    </>
  );
}

export default App;
