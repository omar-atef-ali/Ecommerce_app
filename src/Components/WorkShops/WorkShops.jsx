import React, { useState } from 'react';
import style from "./WorkShops.module.css";
import Img1 from "../../assets/photo-1772485719348-761b3c608eef.jpg";
import Img2 from "../../assets/photo-1694538905360-61086447423b.jpg";
import Img3 from "../../assets/photo-1572726729207-a78d6feb18d7.jpg";

export default function WorkShops() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const stats = [
    { value: "7+", label: "WORKSHOPS HELD" },
    { value: "44+", label: "HAPPY ATTENDEES" },
    { value: "3", label: "INSTRUCTORS" }
  ];

  const upcomingWorkshops = [
    {
      id: 1,
      image: Img1,
      date: "June 14, 2026",
      title: "Candle Pour Essentials",
      time: "4:00 PM - 7:00 PM",
      location: "Wed Studio, Zamalek, Cairo",
      duration: "3 hours",
      instructor: { name: "Layla Hassan", initial: "L" },
      seatsLeft: 4,
      totalSeats: 12,
      price: "EGP 450"
    },
    {
      id: 2,
      image: Img2,
      date: "June 21, 2026",
      title: "Advanced Scent Blending",
      time: "3:00 PM - 6:30 PM",
      location: "Wed Studio, Zamalek, Cairo",
      duration: "3.5 hours",
      instructor: { name: "Sara Amin", initial: "S" },
      seatsLeft: 2,
      totalSeats: 8,
      price: "EGP 650"
    },
    {
      id: 3,
      image: Img3,
      date: "June 28, 2026",
      title: "Couples Candle Date",
      time: "6:00 PM - 8:30 PM",
      location: "Wed Studio, Zamalek, Cairo",
      duration: "2.5 hours",
      instructor: { name: "Layla Hassan", initial: "L" },
      seatsLeft: 6,
      totalSeats: 6,
      price: "EGP 800"
    }
  ];

  const pastWorkshops = [
    {
      id: 101,
      image: "https://images.unsplash.com/photo-1596435764223-4a53e3c1e60c?q=80&w=600&auto=format&fit=crop",
      date: "May 10, 2026",
      title: "Introduction to Soy Wax",
      time: "2:00 PM - 5:00 PM",
      location: "Wed Studio, Zamalek, Cairo",
      duration: "3 hours",
      instructor: { name: "Layla Hassan", initial: "L" },
      price: "EGP 400",
      completed: true
    },
    {
      id: 102,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      date: "May 21, 2026",
      title: "Mother's Day Special Pouring",
      time: "4:30 PM - 7:30 PM",
      location: "Wed Studio, Zamalek, Cairo",
      duration: "3 hours",
      instructor: { name: "Sara Amin", initial: "S" },
      price: "EGP 500",
      completed: true
    },
    {
      id: 103,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      date: "April 15, 2026",
      title: "Aromatherapy Basics",
      time: "3:00 PM - 6:00 PM",
      location: "Wed Studio, Zamalek, Cairo",
      duration: "3 hours",
      instructor: { name: "Sara Amin", initial: "S" },
      price: "EGP 450",
      completed: true
    },
    {
      id: 104,
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
      date: "April 30, 2026",
      title: "Spring Scent Collection",
      time: "5:00 PM - 7:30 PM",
      location: "Wed Studio, Zamalek, Cairo",
      duration: "2.5 hours",
      instructor: { name: "Layla Hassan", initial: "L" },
      price: "EGP 450",
      completed: true
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The most relaxing three hours I've had in months. Left with a candle that smells like pure joy and a full heart.",
      reviewer: "Layla M.",
      workshop: "Scent Foundations",
      initial: "L"
    },
    {
      id: 2,
      quote: "Nour's guidance made it so easy to create something I'm genuinely proud of. Can't wait to book the next one!",
      reviewer: "Omar K.",
      workshop: "Custom Candle Workshop",
      initial: "G"
    },
    {
      id: 3,
      quote: "Beautiful space, thoughtful instruction, and a perfect blend of creativity and relaxation. Highly recommend.",
      reviewer: "Zara M.",
      workshop: "Botanical Blends",
      initial: "Z"
    },
    {
      id: 4,
      quote: "I brought my sister for her birthday and we both left glowing. Such a special experience - we'll be back!",
      reviewer: "Dina A.",
      workshop: "Scent Foundations",
      initial: "D"
    }
  ];

  return (
    <div className={style.pageWrapper}>
      {/* Hero Section */}
      <section className={style.heroSection}>
        <div className={style.heroOverlay}></div>
        <div className={style.heroContent}>
          <span className={style.heroEyebrow}>LEARN & CREATE</span>
          <h1 className={style.heroTitle}>Candle Workshops</h1>
          <p className={style.heroSubtitle}>
            Craft your own scent story. Hands-on, intimate, unforgettable.
          </p>

          <div className={style.statsRow}>
            {stats.map((stat, index) => (
              <div key={index} className={style.statCol}>
                <span className={style.statValue}>{stat.value}</span>
                <span className={style.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className={style.tabSection}>
        <div className={style.tabsContainer}>
          <button
            className={`${style.tabBtn} ${activeTab === 'upcoming' ? style.activeTab : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming <span className={style.tabCount}>3</span>
          </button>
          <button
            className={`${style.tabBtn} ${activeTab === 'past' ? style.activeTab : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Workshops <span className={style.tabCount}>4</span>
          </button>
        </div>
      </section>

      {/* Workshop Cards Section */}
      <section className={style.gridSection}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {activeTab === 'upcoming' ? (
              upcomingWorkshops.map((w) => {
                // Calculate filled seats progress
                const seatsTaken = w.totalSeats - w.seatsLeft;
                const fillPercent = (seatsTaken / w.totalSeats) * 100;
                const isLow = w.seatsLeft <= 2;

                return (
                  <div key={w.id} className="col-12 col-md-6 col-lg-4">
                    <div className={style.workshopCard}>
                      <div className={style.imageContainer}>
                        <img src={w.image} alt={w.title} className={style.workshopImage} />
                        <span className={style.dateBadge}>{w.date}</span>
                      </div>
                      
                      <div className={style.cardBody}>
                        <h3 className={style.cardTitle}>{w.title}</h3>

                        <div className={style.detailsList}>
                          <div className={style.detailItem}>
                            <svg className={style.detailIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>{w.time}</span>
                          </div>

                          <div className={style.detailItem}>
                            <svg className={style.detailIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{w.location}</span>
                          </div>

                          <div className={style.detailItem}>
                            <svg className={style.detailIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>{w.duration}</span>
                          </div>
                        </div>

                        <div className={style.instructorRow}>
                          <div className={style.avatarCircle}>
                            {w.instructor.initial}
                          </div>
                          <span className={style.instructorName}>{w.instructor.name}</span>
                        </div>

                        <div className={style.seatsWrapper}>
                          <div className={style.seatsInfo}>
                            <span className={style.seatsLeftText}>
                              <svg className={style.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                              </svg>
                              {w.seatsLeft} seats left
                            </span>
                            <span className={style.totalSeatsText}>{w.totalSeats} total</span>
                          </div>
                          <div className={style.progressBarBg}>
                            <div 
                              className={`${style.progressBarFill} ${isLow ? style.lowSeats : style.goodSeats}`} 
                              style={{ width: `${fillPercent}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className={style.cardFooter}>
                          <span className={style.cardPrice}>{w.price}</span>
                          <button className={style.bookBtn}>
                            Book Now 
                            <svg className={style.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              pastWorkshops.map((w) => (
                <div key={w.id} className="col-12 col-md-6 col-lg-4">
                  <div className={`${style.workshopCard} ${style.pastCard}`}>
                    <div className={style.imageContainer}>
                      <img src={w.image} alt={w.title} className={style.workshopImage} />
                      <span className={`${style.dateBadge} ${style.pastBadge}`}>{w.date}</span>
                    </div>
                    
                    <div className={style.cardBody}>
                      <h3 className={style.cardTitle}>{w.title}</h3>

                      <div className={style.detailsList}>
                        <div className={style.detailItem}>
                          <svg className={style.detailIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>{w.time}</span>
                        </div>

                        <div className={style.detailItem}>
                          <svg className={style.detailIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{w.location}</span>
                        </div>

                        <div className={style.detailItem}>
                          <svg className={style.detailIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>{w.duration}</span>
                        </div>
                      </div>

                      <div className={style.instructorRow}>
                        <div className={`${style.avatarCircle} ${style.pastAvatar}`}>
                          {w.instructor.initial}
                        </div>
                        <span className={style.instructorName}>{w.instructor.name}</span>
                      </div>

                      <div className={style.pastStatus}>
                        <span className={style.pastStatusLabel}>Completed</span>
                      </div>

                      <div className={style.cardFooter}>
                        <span className={style.cardPrice}>{w.price}</span>
                        <button className={`${style.bookBtn} ${style.soldOutBtn}`} disabled>
                          Sold Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={style.testimonialsSection}>
        <div className="container">
          <span className={style.testimonialsEyebrow}>WHAT ATTENDEES SAY</span>
          
          <div className={style.testimonialsBorderBox}>
            <div className="row g-4">
              {testimonials.map((t) => (
                <div key={t.id} className="col-12 col-md-6">
                  <div className={style.testimonialCard}>
                    <div className={style.starsRow}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={style.starIcon} viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    <p className={style.testimonialQuote}>"{t.quote}"</p>

                    <div className={style.reviewerRow}>
                      <div className={style.reviewerAvatar}>
                        {t.initial}
                      </div>
                      <div className={style.reviewerInfo}>
                        <h4 className={style.reviewerName}>{t.reviewer}</h4>
                        <span className={style.reviewerWorkshop}>{t.workshop}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
