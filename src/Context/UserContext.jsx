import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../api";


export let userContext = createContext();

export default function UserContextProvider(props) {
  let [userToken, setUserToken] = useState(null);
  let [loading, setLoading] = useState(true);
  let [email, setemail] = useState('')


  // 1. Check storage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
    setLoading(false);
  }, []);




  return (
    <>
      <userContext.Provider value={{ userToken, setUserToken, loading, email, setemail}}>
        {props.children}
      </userContext.Provider>
    </>
  );
}
