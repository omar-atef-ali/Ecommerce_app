import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import style from './ProfileLayout.module.css';

export default function ProfileLayout() {
  return (
    <div className={` container ${style.profileContainer}`}>
      <div className="row">
        {/* Left Sidebar */}
        <div className={`col-12 col-lg-3 `}>
          <div className={style.sidebar}>
            <div className={style.userInfo}>
              <div className={style.avatar}>NA</div>
              <h3 className={style.userName}>Nour Ahmed</h3>
              <p className={style.userEmail}>oatef266@gmail.com</p>
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
          <button className={style.signOutBtn}>
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
