import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import style from "./WorkShopDetails.module.css";
import toast from 'react-hot-toast';
import api from '../../api';

import Img1 from "../../assets/photo-1772485719348-761b3c608eef.jpg";
import Img2 from "../../assets/photo-1694538905360-61086447423b.jpg";
import Img3 from "../../assets/photo-1572726729207-a78d6feb18d7.jpg";
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

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

export default function WorkShopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();


  // Form and widget states
  const [seatsCount, setSeatsCount] = useState(1);
  const [guestNames, setGuestNames] = useState([""]);
  const [paymentMethod, setPaymentMethod] = useState("instapay");
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [workshop, setWorkshop] = useState(null);
  const [bgImage, setBgImage] = useState("");

  const fileInputRef = useRef(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://instapay.eg/wed-studio");
    toast.success("Link copied to clipboard!", {
      position: "top-center"
    });
  };


  async function workshopDetails() {

    try {
      const { data } = await api.get(`/Workshops/${id}`);

      setWorkshop(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    workshopDetails();
  }, []);

  useEffect(() => {
    if (workshop?.imageUrl) {
      const remoteUrl = workshop.imageUrl.startsWith("http")
        ? workshop.imageUrl
        : `https://wedd.runasp.net${workshop.imageUrl.startsWith("/") ? "" : "/"}${workshop.imageUrl}`;

      const img = new Image();
      img.src = remoteUrl;
      img.onload = () => {
        setBgImage(remoteUrl);
      };
      img.onerror = () => {
        setBgImage(workshop.imageUrl);
      };
    }
  }, [workshop?.imageUrl]);



  // Dynamic counter logic
  const handleSeatsChange = (newCount) => {
    if (newCount < 1 || newCount > workshop.seatsLeft) return;
    setSeatsCount(newCount);

    // Sync guestNames array
    setGuestNames(prev => {
      const updated = [...prev];
      if (newCount > prev.length) {
        for (let i = prev.length; i < newCount; i++) {
          updated.push("");
        }
      } else if (newCount < prev.length) {
        updated.splice(newCount);
      }
      return updated;
    });
  };

  const handleGuestNameChange = (index, value) => {
    setGuestNames(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // Drag and drop receipt
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (file.size > 8 * 1024 * 1024) {
      toast.error(
        "File size must be less than 8MB..",
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
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      toast.error(
        "Only JPG, JPEG, and PNG files are supported..",
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
      return;
    }
    setReceiptFile(file);
    const objectUrl = URL.createObjectURL(file);
    setReceiptPreview(objectUrl);
  };

  const removeReceipt = (e) => {
    e.stopPropagation();
    setReceiptFile(null);
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
      setReceiptPreview('');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Verify token
    const token = localStorage.getItem('token') || localStorage.getItem('userToken');
    if (!token) {
      toast.error(
        "Please login to proceed with booking.",
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
        }
      );
      navigate('/login', { state: { from: `/workshopdetails/${workshop.id}` } });
      return;
    }

  // Validation
  const hasEmptyNames = guestNames.some((name) => !name.trim());
  if (hasEmptyNames) {
    toast.error(
        "Please fill in all guest names.",
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

    return;
  }

  if (paymentMethod === 'instapay' && !receiptFile) {
        toast.error(
        "Please upload your transfer receipt for verification.",
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
    return;
  }

  setIsSubmitting(true);

  try {
    // Simulate backend server latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const createBooking = async () => {
      const formData = new FormData();
      formData.append('Seats', seatsCount);

      // Append each guest name to AttendeeNames
      guestNames.forEach((name) => {
        formData.append('AttendeeNames', name);
      });

      if (receiptFile) {
        formData.append('Receipt', receiptFile);
      }

      const { data } = await api.post(`/Workshops/${workshop.id}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    };

    const apiResponse = await createBooking();
    console.log("API Response:", apiResponse);

    const bDetails = {
      bookingId: apiResponse?.id || `WKB-${Math.floor(100000 + Math.random() * 900000)}`,
      title: workshop?.title || '',
      date: formatDate(workshop?.startDate),
      time: `${formatTime(workshop?.startDate)} - ${formatTime(workshop?.endDate)}`,
      location: workshop?.location || '',
      seats: seatsCount,
      guests: guestNames,
      pricePerPerson: workshop?.price || 0,
      total: (workshop?.price || 0) * seatsCount,
      paymentMethod: paymentMethod === 'instapay' ? 'InstaPay' : 'Pay at Workshop',
      status: paymentMethod === 'instapay' ? 'Payment Submitted' : 'Pending Verification'
    };

    setBookingDetails(bDetails);
    setIsBooked(true);
    toast.success("Workshop booking request submitted!", {
      position: "top-center"
    });
  } catch (error) {
    console.error("Booking error:", error);
    const serverMsg = error.response?.data?.message ||
      (error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join(" | ") : null) ||
      "Failed to place booking. Please try again.";
    toast.error(
        serverMsg,
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
    setIsSubmitting(false);
  }
};

if (!workshop) {
  return (
    <div className={style.pageWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#FDFBF7' }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--color-primary)' }}>
        Loading Workshop Details...
      </div>
    </div>
  );
}

if (isBooked && bookingDetails) {
  return (
    <div className={style.successPageWrapper}>
      <div className={style.successCard}>
        <div className={style.successIconWrapper}>
          <svg className={style.successCheckmark} viewBox="0 0 52 52">
            <circle className={style.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
            <path className={style.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h2 className={style.successTitle}>Booking Successful!</h2>
        <p className={style.successSubtitle}>
          Your seats for <strong>{bookingDetails.title}</strong> have been reserved successfully.
        </p>

        <div className={style.successDetails}>
          <div className={style.detailRow}>
            <span>BOOKING ID</span>
            <strong>{bookingDetails.bookingId}</strong>
          </div>
          <div className={style.detailRow}>
            <span>DATE & TIME</span>
            <strong>{bookingDetails.date} @ {bookingDetails.time}</strong>
          </div>
          <div className={style.detailRow}>
            <span>LOCATION</span>
            <strong>{bookingDetails.location}</strong>
          </div>
          <div className={style.detailRow}>
            <span>NUMBER OF SEATS</span>
            <strong>{bookingDetails.seats} {bookingDetails.seats === 1 ? 'Seat' : 'Seats'}</strong>
          </div>
          <div className={style.detailRow}>
            <span>ATTENDEES</span>
            <strong>{bookingDetails.guests.join(", ")}</strong>
          </div>
          <div className={style.detailRow}>
            <span>PAYMENT METHOD</span>
            <strong>{bookingDetails.paymentMethod}</strong>
          </div>
          <div className={style.detailRow}>
            <span>TOTAL PAID</span>
            <strong className={style.successHighlight}>EGP {bookingDetails.total}</strong>
          </div>
        </div>

        <div className={style.successActions}>
          <button className={style.primaryBtn} onClick={() => navigate('/workshops')}>
            Explore Workshops
          </button>
          <button className={style.secondaryBtn} onClick={() => navigate('/profile/orders')}>
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

return (
  <div className={style.pageWrapper}>
    {/* Dynamic Banner Header */}
    <section
      className={style.heroSection}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={style.heroOverlay}></div>
      <button type="button" onClick={() => navigate('/workshops')} className={style.backButton}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to Workshops</span>
      </button>
      <div className={style.heroContent}>
        <span className={style.heroEyebrow}></span>
        <h1 className={style.heroTitle}>{workshop?.title}</h1>
      </div>
    </section>

    {/* Meta Bar */}
    <section className={style.metaBarSection}>
      <div className={style.metaContainer}>
        <div className={style.metaItem}>
          <i className="fa-regular fa-calendar-days" style={{ color: 'var(--color-primary)' }}></i>
          <span>{formatDate(workshop?.startDate)}</span>
        </div>
        <div className={style.metaItem}>
          <i className="fa-regular fa-clock" style={{ color: 'var(--color-primary)' }}></i>
          <span>{formatTime(workshop?.startDate) + ' - ' + formatTime(workshop?.endDate)}</span>
        </div>
        <div className={style.metaItem}>
          <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-primary)' }}></i>
          <span>{workshop?.location}</span>
        </div>
        <div className={style.metaItem}>
          <i className="fa-solid fa-user-group" style={{ color: 'var(--color-primary)' }}></i>
          <span>{workshop?.capacity} seats </span>
        </div>
      </div>
    </section>

    {/* Split Details & Sidebar Section */}
    <section className={style.mainContentSection}>
      <div className="container">
        <div className="row g-5">
          {/* Left Column: Workshop About Information */}
          <div className="col-12 col-lg-7">
            <div className={style.detailsCard}>
              <h2 className={style.sectionHeading}>About This Workshop</h2>
              <p className={style.aboutText}>{workshop?.description}</p>

              <h2 className={style.sectionHeading}>What You'll Make</h2>
              <ul className={style.checkList}>
                {workshop?.workshopOutcomes?.map((item, idx) => (
                  <li key={idx} className={style.checkListItem}>
                    <span className={style.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className={style.sectionHeading}>What's Included</h2>
              <div className="row g-3">
                {workshop?.includedItems?.map((item, idx) => (
                  <div key={idx} className="col-12 col-sm-6">
                    <div className={style.includedItem}>
                      <span className={style.bulletIcon}>•</span>
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className={style.sectionHeading} style={{ marginTop: '50px' }}>Your Instructor</h2>
              <div className={style.instructorRow}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {workshop.instructors && workshop.instructors.length > 0 ? (
                    workshop.instructors.map((instructor, idx) => (
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
                <div className={style.instructorDetails}>
                  <h4 className={style.instructorName}>{workshop.instructors && workshop.instructors.length > 0
                    ? workshop.instructors.map(ins => ins.name).join(' & ')
                    : 'Instructor'}</h4>
                  <p className={style.instructorTitle}></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Booking Widget */}
          <div className="col-12 col-lg-5">
            <div className={style.bookingWidgetCard}>
              {/* Pricing Area */}
              <div className={style.pricingRow}>
                <span className={style.priceText}>EGP {workshop?.price}</span>
                <span className={style.perPersonLabel}>per person</span>
              </div>

              {/* Remaining Seats Green Alert */}
              <div className={style.remainingAlert}>
                <i className="fa-solid fa-user-group"></i>
                <span>{workshop?.availableSeats} seats remaining</span>
              </div>

              <form onSubmit={handleBookingSubmit} className={style.bookingForm}>
                {/* Seat Counter */}
                <div className={style.formGroup}>
                  <label className={style.formLabel}>NUMBER OF SEATS</label>
                  <div className={style.counterControl}>
                    <button
                      type="button"
                      className={style.counterBtn}
                      onClick={() => handleSeatsChange(seatsCount - 1)}
                      disabled={seatsCount <= 1}
                    >
                      —
                    </button>
                    <span className={style.counterVal}>{seatsCount}</span>
                    <button
                      type="button"
                      className={style.counterBtn}
                      onClick={() => handleSeatsChange(seatsCount + 1)}
                      disabled={seatsCount >= workshop?.availableSeats}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dynamic Guest Fields */}
                <div className={style.guestFieldsContainer}>
                  {guestNames.map((name, index) => (
                    <div key={index} className={style.formGroup}>
                      <label className={style.formLabel}>Guest {index + 1} Name</label>
                      <input
                        type="text"
                        className={style.formInput}
                        placeholder={`Guest ${index + 1}`}
                        value={name}
                        onChange={(e) => handleGuestNameChange(index, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Payment Radio Methods */}
                <div className={style.paymentMethodsContainer}>
                  <label className={style.paymentOptionCard}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="instapay"
                      checked={paymentMethod === 'instapay'}
                      onChange={() => setPaymentMethod('instapay')}
                      className={style.radioInput}
                    />
                    <span className={style.radioCustom}></span>
                    <span className={style.paymentOptionLabel}>InstaPay</span>
                  </label>

                </div>

                {/* InstaPay Drag-and-drop Image Upload Area */}
                {paymentMethod === 'instapay' && (
                  <>
                    {/* InstaPay Payment Info Card */}
                    <div className={style.instapayCard}>
                      <span className={style.instapayTitle}>PAY VIA INSTAPAY</span>
                      <div className={style.qrContainer}>
                        <img src="/src/assets/instapay_qr.png" alt="Instapay QR Code" className={style.qrImage} />
                      </div>
                      <p className={style.instapaySubtext}>Scan to pay, then upload your receipt below</p>
                      <div className={style.linkBox}>
                        <span className={style.linkText}>https://instapay.eg/wed-studio</span>
                        <div className={style.linkActions}>
                          <button type="button" className={style.actionBtn} onClick={handleCopyLink} title="Copy Link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          </button>
                          <a href="https://instapay.eg/wed-studio" target="_blank" rel="noopener noreferrer" className={style.actionLink} title="Open Link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className={style.uploadGroup}>
                      <div
                        className={`${style.dropzone} ${isDragActive ? style.dropzoneActive : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/png, image/jpeg, image/jpg"
                          style={{ display: 'none' }}
                        />

                        {receiptPreview ? (
                          <div className={style.previewContainer}>
                            <img src={receiptPreview} alt="Receipt Preview" className={style.previewImage} />
                            <div className={style.previewOverlay}>
                              <span className={style.fileName}>{receiptFile?.name}</span>
                              <button type="button" className={style.removeFileBtn} onClick={removeReceipt}>
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className={style.dropzoneContent}>
                            <div className={style.uploadIcon}>
                              <i className="fa-solid fa-arrow-up-from-bracket"></i>
                            </div>
                            <span className={style.uploadText}>Upload receipt</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Total Pricing Summary */}
                <div className={style.totalPriceRow}>
                  <span className={style.totalLabel}>Total</span>
                  <span className={style.totalValue}>EGP {workshop?.price * seatsCount}</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={style.bookNowBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Booking...' : 'Book Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
}
