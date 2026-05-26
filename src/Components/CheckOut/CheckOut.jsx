import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './CheckOut.module.css';
import { CartContext } from '../../Context/CartContext';
import api from '../../api';
import toast from 'react-hot-toast';



export default function CheckOut() {
  const navigate = useNavigate();
  const { cartvalue, setcartvalue } = useContext(CartContext);

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [governorateId, setGovernorateId] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('regular'); // regular (EGP 50) or fast (EGP 100)
  const [paymentOption, setPaymentOption] = useState('full'); // full or deposit
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [regularDeliveryPrice, setRegularDeliveryPrice] = useState('');
  const [regularDeliveryTime, setRegularDeliveryTime] = useState('');
  const [fastDeliveryPrice, setFastDeliveryPrice] = useState('');
  const [fastDeliveryTime, setFastDeliveryTime] = useState('');
  const [successData, setSuccessData] = useState({});


  // API Data
  const [governorates, setGovernorates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fileInputRef = useRef(null);
  const govDropdownRef = useRef(null);
  const [isGovDropdownOpen, setIsGovDropdownOpen] = useState(false);
  const userToken = localStorage.getItem('token') || localStorage.getItem('userToken');

  useEffect(() => {
    function handleClickOutside(event) {
      if (govDropdownRef.current && !govDropdownRef.current.contains(event.target)) {
        setIsGovDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch Governorates & User Profile
  useEffect(() => {
    if (!userToken) {

      toast.error(
        "Please login to proceed to checkout.",
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
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    async function loadData() {
      try {
        // 1. Fetch Governorates
        try {
          const { data } = await api.get('/Governorates');
          setGovernorates(data);
          // console.log(data); 
        } catch (error) {
          console.warn("Failed fetching governorates", error);
        }

        // 2. Fetch User Profile
        if (userToken) {
          try {
            const { data } = await api.get('/Accounts/profile', {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            });
            if (data) {
              setFullName(`${data.firstName || ''} ${data.lastName || ''}`.trim());
              setEmail(data.email || '');
              setPhone(data.phoneNumber || '');
              setStreetAddress(data.address || '');
            }
          } catch (error) {
            console.warn("Failed to pre-populate user profile", error);
          }
        }
      } catch (err) {
        console.error("Error loading checkout data", err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    }

    loadData();
  }, [userToken]);

  // Handle Receipt Upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // Validate File Size (8 MB limit)
    if (file.size > 8 * 1024 * 1024) {
      toast.error(
        "File size must be less than 8MB.",
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
    // Validate File Type
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      toast.error(
        "Only JPG, JPEG, and PNG files are supported.",
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

    // Clear receipt error if set
    if (errors.receipt) {
      setErrors(prev => ({ ...prev, receipt: null }));
    }
  };

  // Drag and Drop Handlers
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

  const removeReceipt = (e) => {
    e.stopPropagation();
    setReceiptFile(null);
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
      setReceiptPreview('');
    }
  };

  // Copy InstaPay Link to Clipboard
  const copyInstaPayLink = () => {
    navigator.clipboard.writeText('https://ipn.eg/il/red/instapay/XXXXXX');
    toast.success("InstaPay Link Copied!");
  };

  // Dynamic Calculations
  const subtotal = cartvalue.reduce((acc, item) => {
    const price = item.price || item.size?.price || item.itemSize?.price || 0;
    const qty = item.quantity || item.qty || item.count || 1;
    return acc + price * qty;
  }, 0);

  const shippingCost = deliveryMethod === 'fast' ? (Number(fastDeliveryPrice) || 0) : (Number(regularDeliveryPrice) || 0);
  const total = subtotal + shippingCost;

  // Split payment
  const depositNow = Math.round(total / 2);
  const codOnDelivery = total - depositNow;

  const amountToTransfer = paymentOption === 'full' ? total : depositNow;

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "A valid email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    
    if (!streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    } else if (streetAddress.trim().length < 5 || streetAddress.trim().length > 500) {
      newErrors.streetAddress = `'Address' must be between 5 and 500 characters. You entered ${streetAddress.trim().length} characters.`;
    }
    
    if (!governorateId) newErrors.governorateId = "Governorate selection is required";
    if (!receiptFile) newErrors.receipt = "Payment transfer receipt is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormComplete = fullName.trim() &&
    email.trim() &&
    /\S+@\S+\.\S+/.test(email) &&
    phone.trim() &&
    streetAddress.trim().length >= 5 &&
    streetAddress.trim().length <= 500 &&
    governorateId &&
    receiptFile;

  // Handle Order Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(
        "Please fill in all required fields and upload your payment receipt.",
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
      const formData = new FormData();
      formData.append('FullName', fullName);
      formData.append('Email', email);
      formData.append('Phone', phone);
      formData.append('Address', streetAddress);
      formData.append('GovernorateId', governorateId);
      formData.append('DeliveryType', deliveryMethod);
      formData.append('Receipt', receiptFile);
      
      // FormData is an internal browser object and logs as empty FormData {} by default.
      // To view its actual filled values, we convert it to a standard key-value object:
      console.log("FormData Contents:", Object.fromEntries(formData.entries()));

      const { data } = await api.post('/Orders', formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Order Placed Success Response:", data);
      toast.success("Order placed successfully!");
      setIsSuccess(true);
      setSuccessData(data);
    } catch (error) {
      console.error("Order submission error:", error);
      console.log("Server Error Response Details:", error.response?.data);
      
      toast.error(
        error.response?.data?.message || 
        (error.response?.data?.errors ? Object.values(error.response.data.errors).flat().join(" | ") : null) || 
        "Something went wrong while placing your order. Please try again.",
        {
          position: "top-center",
          duration: 5000,
          style: {
            background:
              "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 20px",
            color: "#ffffff",
            fontSize: "0.95rem",
            borderRadius: "5px",
            width: "350px",
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

  // Render Loading Screen
  if (isLoading) {
    return (
      <div className={style.loadingOverlay}>
        <div className={style.spinner}></div>
      </div>
    );
  }

  // Render Success Screen
  if (isSuccess) {
    return (
      <div className={style.successContainer}>
        <div className={style.successCard}>
          <div className={style.successIconWrapper}>
            <svg className={style.successCheckmark} viewBox="0 0 52 52">
              <circle className={style.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
              <path className={style.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2 className={style.successTitle}>Order Placed Successfully!</h2>
          <p className={style.successSubtitle}>Thank you for your order. We have received your payment transfer receipt and are verifying your payment.</p>

          <div className={style.successDetails}>
            <div className={style.detailRow}>
              <span>ORDER ID</span>
              <strong>{successData.id}</strong>
            </div>
            <div className={style.detailRow}>
              <span>TOTAL AMOUNT</span>
              <strong>EGP {total}</strong>
            </div>
            <div className={style.detailRow}>
              <span>PAYMENT METHOD</span>
              <strong>{paymentOption === 'full' ? 'InstaPay (Full Amount)' : 'InstaPay (Deposit + COD)'}</strong>
            </div>
            <div className={style.detailRow}>
              <span>DELIVERY PERIOD</span>
              <strong>{successData?.deliveryPeriod}</strong>
            </div>
            <div className={style.detailRow}>
              <span>GOVERNORATE NAME</span>
              <strong>{successData?.governorateName}</strong>
            </div>
            <div className={style.detailRow}>
              <span>TRANSFERRED</span>
              <strong className={style.successHighlight}>EGP {amountToTransfer}</strong>
            </div>
          </div>

          <div className={style.successActions}>
            <button className={style.primaryBtn} onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
            <button className={style.secondaryBtn} onClick={() => navigate('/profile/orders')}>
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty cart state
  if (cartvalue.length === 0) {
    return (
      <div className={style.emptyCheckout}>
        <div className={style.emptyContent}>
          <div className={style.emptyIcon}><i class="fa-solid fa-cart-shopping"></i></div>
          <h2 className={style.emptyTitle}>Your cart is empty</h2>
          <p className={style.emptyText}>You cannot checkout with an empty cart. Please add some products first!</p>
          <button className={style.primaryBtn} onClick={() => navigate('/shop')}>
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageWrapper}>
      <form onSubmit={handleSubmit} className={style.container}>
        <div className="row g-5">
          {/* Left Column: Form Details */}
          <div className="col-12 col-lg-8">
            {/* 1. Shipping Details */}
            <div className={style.sectionCard}>
              <h3 className={style.sectionTitle}>Shipping Details</h3>

              <div className="row g-4">
                <div className="col-12">
                  <div className={style.inputGroup}>
                    <label className={style.label}>FULL NAME</label>
                    <input
                      type="text"
                      placeholder="e.g. Nour Ahmed"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors(prev => ({ ...prev, fullName: null }));
                      }}
                      className={`${style.input} ${errors.fullName ? style.inputError : ''}`}
                    />
                    {errors.fullName && <span className={style.errorText}>{errors.fullName}</span>}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className={style.inputGroup}>
                    <label className={style.label}>EMAIL</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                      }}
                      className={`${style.input} ${errors.email ? style.inputError : ''}`}
                    />
                    {errors.email && <span className={style.errorText}>{errors.email}</span>}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className={style.inputGroup}>
                    <label className={style.label}>PHONE</label>
                    <input
                      type="tel"
                      placeholder="+20 100 000 0000"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                      }}
                      className={`${style.input} ${errors.phone ? style.inputError : ''}`}
                    />
                    {errors.phone && <span className={style.errorText}>{errors.phone}</span>}
                  </div>
                </div>

                <div className="col-12">
                  <div className={style.inputGroup}>
                    <label className={style.label}>STREET ADDRESS</label>
                    <input
                      type="text"
                      placeholder="building, street, area"
                      value={streetAddress}
                      onChange={(e) => {
                        setStreetAddress(e.target.value);
                        if (errors.streetAddress) setErrors(prev => ({ ...prev, streetAddress: null }));
                      }}
                      className={`${style.input} ${errors.streetAddress ? style.inputError : ''}`}
                    />
                    {errors.streetAddress && <span className={style.errorText}>{errors.streetAddress}</span>}
                  </div>
                </div>

                <div className="col-12">
                  <div className={style.inputGroup} ref={govDropdownRef}>
                    <label className={style.label}>GOVERNORATE</label>
                    <div className={style.selectWrapper}>
                      <div
                        className={`${style.select} ${errors.governorateId ? style.inputError : ''}`}
                        onClick={() => setIsGovDropdownOpen(!isGovDropdownOpen)}
                      >
                        {governorateId
                          ? (governorates.find(gov => gov.id.toString() === governorateId)?.name ||
                            governorates.find(gov => gov.id.toString() === governorateId)?.nameEn ||
                            "Select your governorate")
                          : "Select your governorate"
                        }
                        <div className={`${style.selectIcon} ${isGovDropdownOpen ? style.iconRotated : ''}`}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>

                      {isGovDropdownOpen && (
                        <div className={style.dropdownList}>
                          <div
                            className={style.dropdownOption}
                            onClick={() => {
                              setGovernorateId('');
                              setIsGovDropdownOpen(false);
                              if (errors.governorateId) setErrors(prev => ({ ...prev, governorateId: null }));
                            }}
                          >
                            Select your governorate
                          </div>
                          {governorates.map(gov => (
                            <div
                              key={gov.id}
                              className={`${style.dropdownOption} ${governorateId === gov.id.toString() ? style.dropdownOptionSelected : ''}`}
                              onClick={() => {
                                setGovernorateId(gov.id.toString());
                                setIsGovDropdownOpen(false);
                                setRegularDeliveryPrice(gov.regularDeliveryPrice);
                                setRegularDeliveryTime(gov.regularDeliveryPeriod);
                                setFastDeliveryPrice(gov.fastDeliveryPrice);
                                setFastDeliveryTime(gov.fastDeliveryPeriod);
                                if (errors.governorateId) setErrors(prev => ({ ...prev, governorateId: null }));
                              }}
                            >
                              {gov.name || gov.nameEn}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.governorateId && <span className={style.errorText}>{errors.governorateId}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Delivery Method */}
            <div className={style.sectionCard}>
              <h3 className={style.sectionTitle}>Delivery Method</h3>

              <div className={style.selectionGroup}>
                <div
                  className={`${style.selectCard} ${deliveryMethod === 'regular' ? style.selectedCard : ''}`}
                  onClick={() => setDeliveryMethod('regular')}
                >
                  <div className={style.cardRadioWrapper}>
                    <div className={`${style.customRadio} ${deliveryMethod === 'regular' ? style.customRadioChecked : ''}`} />
                    <div className={style.cardContent}>
                      <div className={style.deliveryHeader}>
                        <span className={style.deliveryName}>
                          <span className={style.deliveryIcon}><i class="fa-regular fa-truck"></i></span>
                          Regular Delivery
                        </span>
                        <span className={style.deliveryPrice}>EGP {regularDeliveryPrice}</span>
                      </div>
                      <p className={style.deliveryTime}>{regularDeliveryTime}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`${style.selectCard} ${deliveryMethod === 'fast' ? style.selectedCard : ''}`}
                  onClick={() => setDeliveryMethod('fast')}
                >
                  <div className={style.cardRadioWrapper}>
                    <div className={`${style.customRadio} ${deliveryMethod === 'fast' ? style.customRadioChecked : ''}`} />
                    <div className={style.cardContent}>
                      <div className={style.deliveryHeader}>
                        <span className={style.deliveryName}>
                          <span className={style.deliveryIcon}><i class="fa-solid fa-bolt"></i></span>Fast Delivery
                        </span>
                        <span className={style.deliveryPrice}>EGP {fastDeliveryPrice}</span>
                      </div>
                      <p className={style.deliveryTime}>{fastDeliveryTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment via InstaPay */}
            <div className={style.sectionCard}>
              <h3 className={style.sectionTitle}>Payment via InstaPay</h3>

              {/* <div className={style.selectionGroupRow}>
                <div 
                  className={`${style.selectCardHalf} ${paymentOption === 'full' ? style.selectedCard : ''}`}
                  onClick={() => setPaymentOption('full')}
                >
                  <div className={style.cardRadioWrapper}>
                    <div className={`${style.customRadio} ${paymentOption === 'full' ? style.customRadioChecked : ''}`} />
                    <div className={style.cardContent}>
                      <span className={style.paymentOptionLabel}>Full Amount</span>
                      <strong className={style.paymentSubText}>EGP {total} </strong>
                    </div>
                  </div>
                </div>

                <div 
                  className={`${style.selectCardHalf} ${paymentOption === 'deposit' ? style.selectedCard : ''}`}
                  onClick={() => setPaymentOption('deposit')}
                >
                  <div className={style.cardRadioWrapper}>
                    <div className={`${style.customRadio} ${paymentOption === 'deposit' ? style.customRadioChecked : ''}`} />
                    <div className={style.cardContent}>
                      <span className={style.paymentOptionLabel}>Deposit + COD</span>
                      <strong className={style.paymentSubText}>
                        EGP {depositNow} now + EGP {codOnDelivery} on delivery
                      </strong>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Amount to transfer banner */}
              <div className={style.amountBanner}>
                <span className={style.bannerLabel}>Amount to transfer</span>
                <span className={style.bannerValue}>EGP {amountToTransfer}</span>
              </div>

              {/* QR and Transfer Info */}
              <div className={style.transferGrid}>
                {/* QR Code Container */}
                <div className={style.qrContainer}>
                  <div className={style.qrBox}>
                    {/* Simulated SVG QR Code */}
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M0,0 h30 v10 h-20 v20 h-10 Z" />
                      <path d="M70,0 h30 v30 h-10 v-20 h-20 Z" />
                      <path d="M0,70 h10 v20 h20 v10 h-30 Z" />
                      <path d="M90,70 h10 v30 h-30 v-10 h20 Z" />
                      {/* Inner QR patterns */}
                      <rect x="15" y="15" width="20" height="20" />
                      <rect x="65" y="15" width="20" height="20" />
                      <rect x="15" y="65" width="20" height="20" />
                      <rect x="45" y="45" width="10" height="10" />
                      <rect x="65" y="65" width="5" height="5" />
                      <rect x="75" y="75" width="10" height="10" />
                      <rect x="65" y="45" width="10" height="5" />
                      <rect x="45" y="65" width="5" height="15" />
                    </svg>
                  </div>
                  <span className={style.qrText}>Scan to pay</span>
                </div>

                {/* Link Copy Box */}
                <div className={style.linkBoxContainer}>
                  <label className={style.linkLabel}>INSTAPAY LINK</label>
                  <div className={style.linkInputGroup}>
                    <input
                      type="text"
                      readOnly
                      value="https://ipn.eg/il/red/instapay/XXXXXX"
                      className={style.linkInput}
                    />
                    <button
                      type="button"
                      onClick={copyInstaPayLink}
                      className={style.copyBtn}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Receipt Dropzone */}
              <div className={style.uploadGroup}>
                <label className={style.label}>UPLOAD TRANSFER RECEIPT</label>
                <div
                  className={`${style.dropzone} ${isDragActive ? style.dropzoneActive : ''} ${errors.receipt ? style.dropzoneError : ''}`}
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
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                      <p className={style.uploadText}>
                        <strong>Drop your screenshot here</strong> or <span className={style.browseLink}>click to browse</span>
                      </p>
                      <p className={style.uploadHint}>JPG, PNG up to 8 MB</p>
                    </div>
                  )}
                </div>
                {errors.receipt && <span className={style.errorText}>{errors.receipt}</span>}
              </div>

              {/* Transaction ID Optional */}
              {/* <div className={style.inputGroup} style={{ marginTop: '24px' }}>
                <label className={style.label}>TRANSACTION ID (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="e.g. TRN1234567890"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className={style.input}
                />
              </div> */}
            </div>

            {/* Agreement Policy */}
            <p className={style.agreementText}>
              By placing your order you agree to our terms of service and privacy policy.
            </p>
          </div>

          {/* Right Column: Order Summary */}
          <div className="col-12 col-lg-4">
            <div className={style.summaryCard}>
              <h3 className={style.summaryTitle}>Order Summary</h3>

              {/* Cart Items List */}
              <div className={style.summaryItemsList}>
                {cartvalue.map((item, index) => {
                  const productName = item.itemName || item.product?.name || 'Unknown Product';
                  const sizeName = item.chosenSize || item.size?.size || item.itemSize?.size || 'Default Size';
                  const price = item.price || item.size?.price || item.itemSize?.price || 0;
                  const qty = item.quantity || item.qty || item.count || 1;
                  const mediaUrl = item.imageUrl || item.image || item.product?.media?.[0]?.url || item.product?.imageUrl || '';
                  const imageSrc = mediaUrl ? (mediaUrl.startsWith('http') ? mediaUrl : `https://wedd.runasp.net${mediaUrl}`) : '';

                  return (
                    <div key={`${item.itemId}-${item.itemSizeId}-${index}`} className={style.summaryItem}>
                      <div className={style.itemImageWrapper}>
                        {imageSrc ? (
                          <img src={imageSrc} alt={productName} className={style.summaryItemImage} />
                        ) : (
                          <div className={style.summaryItemFallback}>📦</div>
                        )}
                      </div>

                      <div className={style.summaryItemDetails}>
                        <span className={style.summaryItemName}>{productName}</span>
                        <span className={style.summaryItemMeta}>{sizeName} x {qty}</span>
                      </div>

                      <span className={style.summaryItemPrice}>EGP {price * qty}</span>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal, Shipping, Total Rows */}
              <div className={style.pricingBlock}>
                <div className={style.pricingRow}>
                  <span>Subtotal</span>
                  <span>EGP {subtotal}</span>
                </div>
                <div className={style.pricingRow}>
                  <span>Shipping</span>
                  <span>EGP {shippingCost}</span>
                </div>
                <div className={style.totalDivider} />
                <div className={style.totalRow}>
                  <span>Total</span>
                  <span>EGP {total}</span>
                </div>
              </div>

              {/* Dynamic CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${style.submitBtn} ${isFormComplete ? style.submitBtnActive : ''}`}
              >
                {isSubmitting ? (
                  <span className={style.loader}></span>
                ) : isFormComplete ? (
                  "Place Order"
                ) : (
                  "Fill in details & upload receipt"
                )}
              </button>

              <p className={style.submitHint}>
                Receipt upload required to place order
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
