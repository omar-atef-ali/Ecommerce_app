import React, { useContext, useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import style from './ProfileLayout.module.css';
import toast from 'react-hot-toast';
import { userContext } from '../../Context/UserContext';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function ProfileLayout() {

    const {userToken , setUserToken} = useContext(userContext);
    const [customer,setCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

  async function profileData() {
    try{
      const {data} = await api.get("/Accounts/profile",{
        headers:{
          Authorization: `Bearer ${userToken}`
        }
      })
      // console.log(data);
      setCustomer(data);
      
    }catch(error){
      console.log(error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while getting profile data.",
        {
          position: "top-center",
          duration: 4000,
          style: {
            background:
              "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 20px",
            color: "#ffffff",
            fontSize: "0.95rem",
            borderRadius: "5px",
            width: "300px",
            height: "100%",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          },
          iconTheme: {
            primary: "#FF4D4F",
            secondary: "#ffffff",
          },
        },
      );
      
    } finally {
      setIsLoading(false);
    }
  }


  function logout(){
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/home");
  }



  useEffect(()=>{
    profileData();
  },[])

  if (isLoading) {
    return (
      <div className={style.loadingOverlay}>
        <div className={style.spinner}></div>
      </div>
    );
  }

  return (
    <div className={` container ${style.profileContainer}`}>
      <div className="row">
        {/* Left Sidebar */}
        <div className={`col-12 col-lg-3 `}>
          <div className={style.sidebar}>
            <div className={style.userInfo}>
              <div className={style.avatar}>{customer.firstName?.charAt(0)}{customer.lastName?.charAt(0)}</div>
              <h3 className={style.userName}>{customer.firstName} {customer.lastName}</h3>
              <p className={style.userEmail}>{customer.email}</p>
            </div>
            <nav className={style.navMenu}>
              <NavLink to="/profile" end className={({ isActive }) => isActive ? `${style.navItem} ${style.active}` : style.navItem}>
                <i className="fa-regular fa-user"></i> My Profile
              </NavLink>
              <NavLink to="/profile/orders" className={({ isActive }) => isActive ? `${style.navItem} ${style.active}` : style.navItem}>
                <i className="fa-solid fa-box"></i> My Orders
              </NavLink>

            </nav>

          </div>
          <button onClick={logout} className={style.signOutBtn}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
          </button>
        </div>

        {/* Right Content */}
        <div className={`col-12 col-lg-9 ${style.content}`}> 
          <Outlet />
        </div>
      </div>
    </div>
  );
}
