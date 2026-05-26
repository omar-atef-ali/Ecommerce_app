import React, { useState, useEffect, useRef } from 'react';
import styles from './Ourstory.module.css';

// Import assets
import cafeImage from '/cafe.jfif';

import logo from '../../assets/28fda194-ac8f-4c3c-8eb4-f1a9ba2e7d16.jpg';
import heroimg from "/candlesBackground.jpg"
import candleimage from '/candleimage.jpg'
import { useNavigate } from 'react-router-dom';

const Ourstory = () => {
    const navigate = useNavigate()

    // Scroll animation refs
    const connectionRef = useRef(null);
    const beganRef = useRef(null);
    const healingRef = useRef(null);
    const storySection2Ref = useRef(null);
    const promiseRef = useRef(null);

    const [connectionVisible, setConnectionVisible] = useState(false);
    const [beganVisible, setBeganVisible] = useState(false);
    const [healingVisible, setHealingVisible] = useState(false);
    const [story2Visible, setStory2Visible] = useState(false);
    const [promiseVisible, setPromiseVisible] = useState(false);

    useEffect(() => {
        const sections = [
            { ref: connectionRef, visible: connectionVisible, set: setConnectionVisible },
            { ref: beganRef, visible: beganVisible, set: setBeganVisible },
            { ref: healingRef, visible: healingVisible, set: setHealingVisible },
            { ref: storySection2Ref, visible: story2Visible, set: setStory2Visible },
            { ref: promiseRef, visible: promiseVisible, set: setPromiseVisible },
        ].filter(s => !s.visible);

        if (sections.length === 0) return;

        const timer = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const match = sections.find(s => s.ref.current === entry.target);
                            if (match) {
                                match.set(true);
                                observer.unobserve(entry.target);
                            }
                        }
                    });
                },
                { threshold: 0.15, rootMargin: '-80px' }
            );

            sections.forEach(s => {
                if (s.ref.current) observer.observe(s.ref.current);
            });

            return () => observer.disconnect();
        }, 300);

        return () => clearTimeout(timer);
    }, [connectionVisible, beganVisible, healingVisible, story2Visible, promiseVisible]);

    return (
        <div className={styles.container}>
            {/* Section 2: Our Story (Full width background image) */}
            <section
                className={styles.storySection}
                style={{ backgroundImage: `url(${heroimg})` }}
            >
                <div className={styles.overlay}></div>
                <div className={styles.storyContent}>

                    <div className={`${styles.navLogo} ${styles.heroEntrance}`} style={{ animationDelay: '0.2s' }}>
                        <div className={`${styles.logoImageContainer}`}>
                            <img src={logo} alt="Wed Logo" className={`${styles.logoImage}`} onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }} />

                        </div>

                    </div>
                    <p className={styles.heroEntrance} style={{ animationDelay: '0.4s' }}>Wed</p>
                    <h2 className={`${styles.storyTitle} ${styles.heroEntrance}`} style={{ animationDelay: '0.7s' }}>Born from warmth.</h2>
                    <span className={`${styles.storySubTitle} ${styles.heroEntrance}`} style={{ animationDelay: '1s' }}>OUR STORY</span>
                </div>
            </section>

            {/* Section 5: Connection Message */}
            <section ref={connectionRef} className={styles.connectionSection}>
                <h2 className={`${styles.connectionTitle} ${connectionVisible ? styles.revealVisible : styles.revealHidden}`}>
                    In a world full of scrolling, <br /> we somehow forgot the warmth <br /> of real connection.
                </h2>
                <div className={`${styles.connectionSubTextWrapper} ${connectionVisible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.3s' }}>
                    <p className={styles.connectionSubText}>The long conversations.</p>
                    <p className={styles.connectionSubText}>The comforting silence.</p>
                    <p className={styles.connectionSubText}>The feeling of "wed."</p>
                </div>
            </section>




            {/* Section 3: How We Began (Two Column Layout) */}
            <section ref={beganRef} className={styles.beganSection}>
                <div
                    className={`${styles.imageSide} ${beganVisible ? styles.imageRevealVisible : styles.imageRevealHidden}`}
                    style={{ backgroundImage: `url(${cafeImage})` }}
                ></div>
                <div className={styles.textSide}>
                    <span className={`${styles.subTitle} ${beganVisible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.2s' }}>HOW WE BEGAN</span>
                    <h2 className={`${styles.beganTitle} ${beganVisible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.4s' }}>That's how Wed <br /> was born.</h2>
                    <p className={`${styles.beganText} ${beganVisible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.6s' }}>
                        We create moments that bring people closer again.
                    </p>
                    <p className={`${styles.beganText} ${beganVisible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.8s' }}>
                        Wed becomes part of your special moments, your <br /> gatherings, your quiet nights, and the memories you keep <br /> forever.
                    </p>
                </div>
            </section>

            {/* Section 4: Healing Quote */}
            <section ref={healingRef} className={styles.healingSection}>
                <div className={styles.healingContent}>
                    <div className={`${styles.quoteWrapper} ${healingVisible ? styles.revealVisible : styles.revealHidden}`}>
                        <h2 className={styles.quoteText}>
                            "Because sometimes, slowing down is healing."
                        </h2>
                    </div>
                    <p className={`${styles.healingText} ${healingVisible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.35s' }}>
                        Reconnecting with yourself can bring back a sense of peace — the kind of peace <br /> that helps you feel better emotionally and physically.
                    </p>
                </div>
            </section>




            {/* Section 2 (Repeated/Modified): Our Story */}
            <section
                ref={storySection2Ref}
                className={styles.storySection2}
                style={{ backgroundImage: `url(${candleimage})` }}
            >
                <div className={styles.overlay}></div>
                <div className={styles.storyContent}>
                    <p className={`${styles.storySubTitle1} ${story2Visible ? styles.revealVisible : styles.revealHidden}`}>What Wed means</p>
                    <h2 className={`${styles.storyTitle2} ${story2Visible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.25s' }}>Wed is not just a brand.</h2>
                    <span className={`${styles.storySubTitle} ${story2Visible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.45s' }}>It's comfort.</span>
                    <span className={`${styles.storySubTitle} ${story2Visible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.6s' }}>It's spanresence.</span>
                    <span className={`${styles.storySubTitle} ${story2Visible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.75s' }}>It's warmth.</span>
                    <p className={`${styles.storySubTitle2} ${story2Visible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.9s' }}>It's your soft escape from a fast world.</p>                </div>
            </section>

            {/* Section 1: Hero / Promise */}
            <section ref={promiseRef} className={styles.heroSection}>
                <span className={`${styles.subTitle} ${promiseVisible ? styles.revealVisible : styles.revealHidden}`}>OUR PROMISE</span>
                <h1 className={`${styles.title} ${promiseVisible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.3s' }}>Bring the warmth back.</h1>
                <div className={`${styles.buttonGroup} ${promiseVisible ? styles.revealVisible : styles.revealHidden}`} style={{ transitionDelay: '0.5s' }}>
                    <button onClick={() => navigate('/shop')} className={styles.btnPrimary}>SHOP NOW</button>
                    <button className={styles.btnSecondary}>GET IN TOUCH</button>
                </div>
            </section>

        </div>
    );
};

export default Ourstory;