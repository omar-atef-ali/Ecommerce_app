import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./WorkShops.module.css";
import Img1 from "../../assets/photo-1772485719348-761b3c608eef.jpg";
import Img2 from "../../assets/photo-1694538905360-61086447423b.jpg";
import Img3 from "../../assets/photo-1572726729207-a78d6feb18d7.jpg";
import api from "../../api"


export default function WorkShops() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [workshopsUpcoming, setWorkshopsUpcoming] = useState([]);
  const [workshopsPast, setWorkshopsPast] = useState([]);
  const [stats, setStats] = useState([]);
  const [reviews, setReviews] = useState([]);

  


  async function getWorkShopsUpcoming() {
    try {
      const { data } = await api.get('/Workshops/upcoming');

      setWorkshopsUpcoming(data);
    } catch (error) {
      console.log(error);
    }
  }

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "";
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (diffMinutes <= 0) diffMinutes += 24 * 60;

    const hours = diffMinutes / 60;
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };

async function getWorkShopsPast() {
    try {
      const { data } = await api.get('/Workshops/past');

      setWorkshopsPast(data);
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }

  async function workShopStats() {
    try{
      const { data } = await api.get("/Workshops/stats")
      setStats(data)
    }catch(error){
      console.log(error);
      
    }
  }


  async function workShopReviews() {
    try{
      const { data } = await api.get("/Workshops/reviews")
      setReviews(data)
    }catch(error){
      console.log(error);
      
    }
  }




  

  useEffect(() => {
    getWorkShopsUpcoming();
    getWorkShopsPast();
    workShopStats()
    workShopReviews()
  }, []);

  


  const upcomingWorkshops = workshopsUpcoming?.filter(w => w.isActive !== false);
  const pastWorkshops = workshopsPast;
  

  const formatTime = (timeString) => {
  if (!timeString) return '';
  if (timeString.includes('AM') || timeString.includes('PM')) return timeString;
  
  // Extract time portion if it's a full ISO datetime string
  let timePortion = timeString;
  if (timeString.includes('T')) {
    timePortion = timeString.split('T')[1];
  }
  
  const parts = timePortion.split(':');
  if (parts.length < 2) return timeString;
  
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
};


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
            
              <div className={style.statCol}>
                <span className={style.statValue}>{stats.workshopsHeld}</span>
                <span className={style.statLabel}>Workshops held</span>
              </div>
              <div className={style.statCol}>
                <span className={style.statValue}>{stats.happyAttendees}</span>
                <span className={style.statLabel}>Happy attendees</span>
              </div>
              <div className={style.statCol}>
                <span className={style.statValue}>{stats.totalUniqueInstructors}</span>
                <span className={style.statLabel}>Instructors</span>
              </div>
            
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
            Upcoming <span className={style.tabCount}>{upcomingWorkshops.length}</span>
          </button>
          <button
            className={`${style.tabBtn} ${activeTab === 'past' ? style.activeTab : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Workshops <span className={style.tabCount}>{pastWorkshops.length}</span>
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
                const seatsTaken = w.totalSeats - w.availableSeats;
                const fillPercent = (seatsTaken / w.totalSeats) * 100;
                const isLow = w.availableSeats <= 2;

                return (
                  <div key={w.id} className="col-12 col-md-6 col-lg-4">
                    <div className={style.workshopCard}>
                      <div className={style.imageContainer}>
                        <img
                          src={w.imageUrl?.startsWith("http") ? w.imageUrl : `https://wedd.runasp.net${w.imageUrl?.startsWith("/") ? "" : "/"}${w.imageUrl}`}
                          alt={w.title}
                          className={style.workshopImage}
                        />
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
                            <span>{formatTime(w.startTime)}</span>
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
                            <span>{calculateDuration(w.startTime, w.endTime)}</span>
                          </div>
                        </div>

                        <div className={style.instructorRow}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {w.instructors && w.instructors.length > 0 ? (
                              w.instructors.map((instructor, idx) => (
                                <div
                                  key={idx}
                                  className={style.avatarCircle}
                                  style={{
                                    marginLeft: idx > 0 ? '-10px' : '0',
                                    zIndex: 10 - idx,
                                    border: '2px solid #f8f1e6',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                  }}
                                  title={instructor.name}
                                >
                                  {instructor.name?.charAt(0).toUpperCase() || 'I'}
                                </div>
                              ))
                            ) : (
                              <div className={style.avatarCircle}>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                                  <circle cx="10.5" cy="6.125" r="3.0625" stroke="#fffefdff" strokeWidth="1.3125" />
                                  <path d="M17.5 18.375V16.625C17.5 14.4148 15.7102 12.625 13.5 12.625H7.5C5.28984 12.625 3.5 14.4148 3.5 16.625V18.375" stroke="#fffefdff" strokeWidth="1.3125" strokeLinecap="round" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className={style.instructorName} style={{ marginLeft: '8px' }}>
                            {w.instructors && w.instructors.length > 0
                              ? w.instructors.map(ins => ins.name).join(' & ')
                              : 'Instructor'}
                          </span>
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
                          <Link to={`/workshopdetails/${w.id}`} className={style.bookBtn}>
                            Book Now
                            <svg className={style.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </Link>
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
                      <div className={style.imageContainer}>
                        <img
                          src={w.imageUrl?.startsWith("http") ? w.imageUrl : `https://wedd.runasp.net${w.imageUrl?.startsWith("/") ? "" : "/"}${w.imageUrl}`}
                          alt={w.title}
                          className={style.workshopImage}
                        />
                        <span className={style.dateBadge}>{w.date}</span>
                      </div>
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
                          <span>{w.startTime}</span>
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
                          <span>{calculateDuration(w.startTime, w.endTime)}</span>
                        </div>
                      </div>

                      <div className={style.instructorRow}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {w.instructors && w.instructors.length > 0 ? (
                            w.instructors.map((instructor, idx) => (
                              <div
                                key={idx}
                                className={`${style.avatarCircle} ${style.pastAvatar}`}
                                style={{
                                  marginLeft: idx > 0 ? '-10px' : '0',
                                  zIndex: 10 - idx,
                                  border: '2px solid #f8f1e6',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                title={instructor.name}
                              >
                                {instructor.name?.charAt(0).toUpperCase() || 'I'}
                              </div>
                            ))
                          ) : (
                            <div className={`${style.avatarCircle} ${style.pastAvatar}`}>I</div>
                          )}
                        </div>
                        <span className={style.instructorName} style={{ marginLeft: '8px' }}>
                          {w.instructors && w.instructors.length > 0
                            ? w.instructors.map(ins => ins.name).join(' & ')
                            : 'Instructor'}
                        </span>
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
              {reviews.map((review) => (
                <div key={review.reviewId} className="col-12 col-md-6">
                  <div className={style.testimonialCard}>
                    <div className={style.starsRow}>
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className={style.starIcon} viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    <p className={style.testimonialQuote}>"{review.comment}"</p>

                    <div className={style.reviewerRow}>
                      <div className={style.reviewerAvatar}>
                        {review.reviewerName ? review.reviewerName.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className={style.reviewerInfo}>
                        <h4 className={style.reviewerName}>{review.reviewerName}</h4>
                        <span className={style.reviewerWorkshop}>{review.workshopTitle}</span>
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
