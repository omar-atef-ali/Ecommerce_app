
import React, { useContext, useEffect, useState } from 'react';
import style from './Profile.module.css';
import { userContext } from '../../Context/UserContext';
import api from '../../api';
import toast from 'react-hot-toast';

export default function Profile() {
  const {userToken} = useContext(userContext);
  const [customer,setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function profileData() {
    try{
      const {data} = await api.get("/Accounts/profile",{
        headers:{
          Authorization: `Bearer ${userToken}`
        }
      })
      console.log(data);
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

useEffect(()=>{
  profileData();
},[])

  if (isLoading) {
    return (
      <div className={style.profileContent}>
        <div className={style.loadingOverlay}>
          <div className={style.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.profileContent}>
      <h2 className={style.pageTitle}>My Profile</h2>
      <div className={style.formCard}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className={style.inputGroup}>
              <label>FIRST NAME</label>
              <input type="text" value={customer.firstName || ''} disabled={true} className={style.input} />
            </div>
          </div>
          <div className="col-md-6">
            <div className={style.inputGroup}>
              <label>LAST NAME</label>
              <input type="text" value={customer.lastName || ''} disabled={true} className={style.input} />
            </div>
          </div>
          <div className="col-md-12">
            <div className={style.inputGroup}>
              <label>EMAIL</label>
              <input type="email" value={customer.email || ''} disabled={true} className={style.input} />
            </div>
          </div>
          <div className="col-md-12">
            <div className={style.inputGroup}>
              <label>PHONE</label>
              <input type="tel" value={customer.phoneNumber || 'empty'} disabled={true} className={style.input} />
            </div>
          </div>


        </div>
        
        <div className={style.formFooter}>
          <p className={style.memberInfo}>Member since January 2025 · 4 orders placed</p>

        </div>
      </div>
    </div>
  );
}
