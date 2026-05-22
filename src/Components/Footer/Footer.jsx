import React, { useState } from 'react'
import style from "./Footer.module.css"
import logo from '../../assets/02574a11-e65b-4322-9afc-0a8af45029da.jpg';
export default function Footer() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    return (
        <>
            {/* <!-- Footer --> */}
            <footer className={`${style.footer}`}>
                <div className={`container-fluid ${style.footer_container}`}>
                    <div className={`row`}>
                        <div className={`col-md-4`}>
                            <div className={style.navLogo}>
                                <div className={`${style.logoImageContainer}`}>
                                    <img src={logo} alt="Wed Logo" className={`${style.logoImage}`} onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }} />

                                </div>
                                
                            </div>
                            <p className={`${style.footer_description}`}>
                                Premium candles & chocolates, crafted <br />
                                with warmth.
                            </p>
                            <div className={`${style.footer_social}`}>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                            </div>
                        </div>
                        <div className={`col-md-2`}>
                            <div
                                className={style.footer_accordion}
                                onClick={() => toggleSection("shop")}
                            >
                                <h4 className={`${style.footer_heading}`}>Shop</h4>
                                <svg
                                    className={`${style.accordion_arrow} ${openSection === "shop" ? style.accordion_arrow_open : ""}`}
                                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                                >
                                    <path d="M4 6L8 10L12 6" stroke="rgba(240,178,45,0.63)" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <ul className={`${style.footer_links} ${openSection === "shop" ? style.links_open : ""}`}>
                                <li><a href="#">All Products</a></li>
                                <li><a href="#">Candles</a></li>
                                <li><a href="#">Chocolates</a></li>
                                <li><a href="#">Gift Kits</a></li>
                                <li><a href="#">Custom Candle</a></li>
                            </ul>
                        </div>
                        <div className={`col-md-2`}>
                            <div
                                className={style.footer_accordion}
                                onClick={() => toggleSection("explore")}
                            >
                                <h4 className={`${style.footer_heading}`}>EXPLORE</h4>
                                <svg
                                    className={`${style.accordion_arrow} ${openSection === "explore" ? style.accordion_arrow_open : ""}`}
                                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                                >
                                    <path d="M4 6L8 10L12 6" stroke="rgba(240,178,45,0.63)" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <ul className={`${style.footer_links} ${openSection === "explore" ? style.links_open : ""}`}>
                                <li><a href="#">Workshops</a></li>
                                <li><a href="#">Our Story</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className={`col-md-4`}>
                            <h4 className={`${style.footer_heading}`}>GET EARLY ACCESS</h4>
                            <p className={`${style.footer_text}`}>
                                Get early access to new collections and <br /> workshops.
                            </p>
                            <form className={`${style.newsletter_form}`}>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className={`${style.newsletter_input}`}
                                />
                                <button className={`${style.newsletter_btn}`} type="submit">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={`${style.footer_bottom}`}>
                        <p className={`${style.footer_copyright}`}>
                            &copy; 2026 Wed. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

        </>
    )
}
