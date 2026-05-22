
import React from 'react';
import style from './Profile.module.css';

export default function Profile() {
  return (
    <div className={style.profileContent}>
      <h2 className={style.pageTitle}>My Profile</h2>
      <div className={style.formCard}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className={style.inputGroup}>
              <label>FIRST NAME</label>
              <input type="text" defaultValue="Nour" className={style.input} />
            </div>
          </div>
          <div className="col-md-6">
            <div className={style.inputGroup}>
              <label>LAST NAME</label>
              <input type="text" defaultValue="Ahmed" className={style.input} />
            </div>
          </div>
          <div className="col-md-12">
            <div className={style.inputGroup}>
              <label>EMAIL</label>
              <input type="email" defaultValue="nour@example.com" className={style.input} />
            </div>
          </div>
          <div className="col-md-12">
            <div className={style.inputGroup}>
              <label>PHONE</label>
              <input type="tel" defaultValue="+20 100 234 5678" className={style.input} />
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
