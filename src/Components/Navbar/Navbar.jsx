
import React, { useEffect, useRef, useState, useContext } from 'react'
import style from "./Navbar.module.css"
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../../assets/28fda194-ac8f-4c3c-8eb4-f1a9ba2e7d16.jpg';
import { CartContext } from '../../Context/CartContext';
import { userContext } from '../../Context/UserContext';

export default function Navbar() {
  const { setIsCartOpen, cartvalue } = useContext(CartContext);
  const { userToken } = useContext(userContext);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();


  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }

    function handleScroll() {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return <>

    <nav ref={navRef} className={`${style.navbar} ${isScrolled ? style.scrolled : ''} sticky-top`}>
      <div className={`container-fluid ${style.navbarContainer}`}>

        {/* Standard Navbar Content */}
        {!isSearchOpen && (
          <>
            <div onClick={() => navigate('/home')} className={style.navLogo}>
              <div className={`${style.logoImageContainer}`}>
                <img src={logo} alt="Wed Logo" className={`${style.logoImage}`} onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }} />

              </div>
              <span className={style.logoText}>Wed</span>
            </div>

            <div className={`${style.navbarNavCenter} ${isMobileMenuOpen ? style.mobileActive : ''}`}>
              <ul className={style.navbarNav}>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `${style.navLink} ${isActive ? style.active : ''}`} to="/home">

                    HOME
                  </NavLink>
                </li>
                <li className={`${style.dropdownContainer}`}>
                  <NavLink className={({ isActive }) => `${style.navLink} ${isActive ? style.active : ''}`} to="/shop">

                    SHOP
                    {/* <svg className={style.dropdownArrow} width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: '4px' }}>
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> */}
                  </NavLink>
                  <div className={style.dropdownMenu}>
                    <NavLink to="/shop" className={style.dropdownItem}>All Products</NavLink>
                    <NavLink to="/shop?category=candles" className={style.dropdownItem}>Candles</NavLink>
                    <NavLink to="/shop?category=chocolates" className={style.dropdownItem}>Chocolates</NavLink>
                  </div>
                </li>
                {/* <li className="nav-item">
                  <a className={style.navLink} href="#">
                    GIFT KITS
                  </a>
                </li>
                <li className="nav-item">
                  <a className={style.navLink} href="#">
                    GIVEAWAYS
                  </a>
                </li>
                <li className="nav-item">
                  <a className={style.navLink} href="#">
                    CUSTOM CANDLE
                  </a>
                </li>
                <li className="nav-item">
                  <a className={style.navLink} href="#">
                    WORKSHOPS
                  </a>
                </li> */}
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `${style.navLink} ${isActive ? style.active : ''}`} to="/ourstory">

                    OUR STORY
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className={style.navbarIcons}>
              {/* <button className={style.iconBtn} onClick={() => setIsSearchOpen(true)}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <circle cx="8.5" cy="8.5" r="7.1875" stroke="#72706E" strokeWidth="1.3125" />
                  <path d="M15.75 15.75L19.25 19.25" stroke="#72706E" strokeWidth="1.3125" strokeLinecap="round" />
                </svg>
              </button> */}
              {/* <a href="#" className={style.iconBtn}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path d="M10.5 18.375C10.5 18.375 2.625 13.125 2.625 7.875C2.625 6.88044 3.02009 5.92661 3.72335 5.22335C4.42661 4.52009 5.38044 4.125 6.375 4.125C8.01562 4.125 9.1875 4.71875 10.5 6.5625C11.8125 4.71875 12.9844 4.125 14.625 4.125C15.6196 4.125 16.5734 4.52009 17.2766 5.22335C17.9799 5.92661 18.375 6.88044 18.375 7.875C18.375 13.125 10.5 18.375 10.5 18.375Z" stroke="#72706E" strokeWidth="1.3125" />
                </svg>
              </a> */}

              <button className={`${style.iconBtn} position-relative`} onClick={() => setIsCartOpen(true)}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <circle cx="7.875" cy="18.375" r="0.875" stroke="#72706E" strokeWidth="1.3125" />
                  <circle cx="17.5" cy="18.375" r="0.875" stroke="#72706E" strokeWidth="1.3125" />
                  <path d="M1.75 2.625H4.375L6.5625 13.5625C6.65625 14.0625 7.1875 14.4375 7.6875 14.4375H16.625C17.125 14.4375 17.6562 14.0625 17.75 13.5625L19.25 6.5625H5.25" stroke="#72706E" strokeWidth="1.3125" strokeLinecap="round" />
                </svg>
                {cartvalue && cartvalue.length > 0 && (
                  <span className={style.cartBadge}>{cartvalue.length}</span>
                )}
              </button>
              <div className={style.profileContainer} ref={profileRef}>
                <button className={style.iconBtn} onClick={() =>{userToken ? navigate("/profile") : setIsProfileMenuOpen(!isProfileMenuOpen)} }>
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <circle cx="10.5" cy="6.125" r="3.0625" stroke="#72706E" strokeWidth="1.3125" />
                    <path d="M17.5 18.375V16.625C17.5 14.4148 15.7102 12.625 13.5 12.625H7.5C5.28984 12.625 3.5 14.4148 3.5 16.625V18.375" stroke="#72706E" strokeWidth="1.3125" strokeLinecap="round" />
                  </svg>
                </button>

                {isProfileMenuOpen && (
                  <div className={style.profileMenu}>
                    <h4 className={style.profileMenuTitle}>Welcome to Wed</h4>
                    <p className={style.profileMenuSubtitle}>Sign in to access your account</p>
                    <div className={style.profileMenuActions}>
                      <button onClick={() => navigate("/login")} className={style.signInBtn}>Sign In</button>
                      <button onClick={() => navigate("/register")} className={style.createAccountBtn}>Create Account</button>
                    </div>
                  </div>
                )}
              </div>
              <button className={`${style.iconBtn} ${style.mobileMenuToggle}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="#72706E" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className={style.searchOverlay}>
            <svg width="20" height="20" viewBox="0 0 21 21" fill="none" className={style.searchOverlayIcon}>
              <circle cx="8.5" cy="8.5" r="7.1875" stroke="#72706E" strokeWidth="1.3125" />
              <path d="M15.75 15.75L19.25 19.25" stroke="#72706E" strokeWidth="1.3125" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search for products, categories..."
              className={style.searchInput}
              autoFocus
            />
            <button className={style.searchCloseBtn} onClick={() => setIsSearchOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#1C1814" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  </>
}
