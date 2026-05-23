import React from 'react';
import styles from './Ourstory.module.css';

// Import assets
import cafeImage from '/cafe.jfif';

import logo from '../../assets/28fda194-ac8f-4c3c-8eb4-f1a9ba2e7d16.jpg';
import heroimg from "/candlesBackground.jpg"
import candleimage from '/candleimage.jpg'
import { useNavigate } from 'react-router-dom';

const Ourstory = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            {/* Section 2: Our Story (Full width background image) */}
            <section
                className={styles.storySection}
                style={{ backgroundImage: `url(${heroimg})` }}
            >
                <div className={styles.overlay}></div>
                <div className={styles.storyContent}>

                    <div className={styles.navLogo}>
                        <div className={`${styles.logoImageContainer}`}>
                            <img src={logo} alt="Wed Logo" className={`${styles.logoImage}`} onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }} />

                        </div>

                    </div>
                    <p>Wed</p>
                    <h2 className={styles.storyTitle}>Born from warmth.</h2>
                    <span className={styles.storySubTitle}>OUR STORY</span>
                </div>
            </section>

            {/* Section 5: Connection Message */}
            <section className={styles.connectionSection}>
                <h2 className={styles.connectionTitle}>
                    In a world full of scrolling, <br /> we somehow forgot the warmth <br /> of real connection.
                </h2>
                <div className={styles.connectionSubTextWrapper}>
                    <p className={styles.connectionSubText}>The long conversations.</p>
                    <p className={styles.connectionSubText}>The comforting silence.</p>
                    <p className={styles.connectionSubText}>The feeling of "wed."</p>
                </div>
            </section>




            {/* Section 3: How We Began (Two Column Layout) */}
            <section className={styles.beganSection}>
                <div
                    className={styles.imageSide}
                    style={{ backgroundImage: `url(${cafeImage})` }}
                ></div>
                <div className={styles.textSide}>
                    <span className={styles.subTitle}>HOW WE BEGAN</span>
                    <h2 className={styles.beganTitle}>That's how Wed <br /> was born.</h2>
                    <p className={styles.beganText}>
                        We create moments that bring people closer again.
                    </p>
                    <p className={styles.beganText}>
                        Wed becomes part of your special moments, your <br /> gatherings, your quiet nights, and the memories you keep <br /> forever.
                    </p>
                </div>
            </section>

            {/* Section 4: Healing Quote */}
            <section className={styles.healingSection}>
                <div className={styles.healingContent}>
                    <div className={styles.quoteWrapper}>
                        <h2 className={styles.quoteText}>
                            "Because sometimes, slowing down is healing."
                        </h2>
                    </div>
                    <p className={styles.healingText}>
                        Reconnecting with yourself can bring back a sense of peace — the kind of peace <br /> that helps you feel better emotionally and physically.
                    </p>
                </div>
            </section>







            {/* Section 2 (Repeated/Modified): Our Story */}
            <section
                className={styles.storySection2}
                style={{ backgroundImage: `url(${candleimage})` }}
            >
                <div className={styles.overlay}></div>
                <div className={styles.storyContent}>
                    <p className={styles.storySubTitle1}>What Wed means</p>
                    <h2 className={styles.storyTitle2}>Wed is not just a brand.</h2>
                    <span className={styles.storySubTitle}>It's comfort.</span>
                    <span className={styles.storySubTitle}>It's spanresence.</span>
                    <span className={styles.storySubTitle}>It's warmth.</span>
                    <p className={styles.storySubTitle2}>It's your soft escape from a fast world.</p>                </div>
            </section>

            {/* Section 1: Hero / Promise */}
            <section className={styles.heroSection}>
                <span className={styles.subTitle}>OUR PROMISE</span>
                <h1 className={styles.title}>Bring the warmth back.</h1>
                <div className={styles.buttonGroup}>
                    <button onClick={() => navigate('/shop')} className={styles.btnPrimary}>SHOP NOW</button>
                    <button className={styles.btnSecondary}>GET IN TOUCH</button>
                </div>
            </section>

        </div>
    );
};

export default Ourstory;