import React, { useEffect, useState } from 'react';
import style from './MyOrders.module.css';
import toast from 'react-hot-toast';
import api from '../../api';

export default function MyOrders() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'workshops'
  const [isLoading, setIsLoading] = useState(true);
  
  const token = localStorage.getItem('token') || localStorage.getItem('userToken');

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        
        // 1. Fetch product orders
        const ordersPromise = api.get('Orders/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // 2. Fetch workshop registrations
        const workshopsPromise = api.get('/Workshops/registrations/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const [ordersRes, workshopsRes] = await Promise.allSettled([
          ordersPromise,
          workshopsPromise
        ]);

        if (ordersRes.status === 'fulfilled') {
          setOrders(ordersRes.value.data);
          console.log("My Orders:", ordersRes.value.data);
        } else {
          console.error("Error fetching orders:", ordersRes.reason);
          toast.error("Failed to load product orders.");
        }

        if (workshopsRes.status === 'fulfilled') {
          setWorkshops(workshopsRes.value.data);
          console.log("My Workshops:", workshopsRes.value.data);
        } else {
          console.error("Error fetching workshops:", workshopsRes.reason);
        }

      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error(
          error.response?.data?.errors[1] ||
          "Something went wrong while fetching orders.",
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
        setIsLoading(false);
      }
    };

    if (token) {
      fetchAllData();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const getStatusClass = (status) => {
    const statusKey = status !== undefined && status !== null ? status.toString() : '';
    
    switch (statusKey) {
      case '0':
      case 'PendingPayment':
        return style.statusPendingPayment;
      case '1':
      case 'PaymentSubmitted':
        return style.statusPaymentSubmitted;
      case '2':
      case 'PaymentRejected':
        return style.statusPaymentRejected;
      case '3':
      case 'Processing':
        return style.statusProcessing;
      case '4':
      case 'Shipped':
        return style.statusShipped;
      case '5':
      case 'Delivered':
        return style.statusDelivered;
      case '6':
      case 'Cancelled':
        return style.statusCancelled;
      case '7':
      case 'Failed':
        return style.statusFailed;
      case '8':
      case 'Refunded':
        return style.statusRefunded;
      default:
        return style.statusPendingPayment;
    }
  };

  const getStatusText = (status) => {
    const statusKey = status !== undefined && status !== null ? status.toString() : '';
    
    switch (statusKey) {
      case '0':
      case 'PendingPayment':
        return 'Pending Payment';
      case '1':
      case 'PaymentSubmitted':
        return 'Payment Submitted';
      case '2':
      case 'PaymentRejected':
        return 'Payment Rejected';
      case '3':
      case 'Processing':
        return 'Processing';
      case '4':
      case 'Shipped':
        return 'Shipped';
      case '5':
      case 'Delivered':
        return 'Delivered';
      case '6':
      case 'Cancelled':
        return 'Cancelled';
      case '7':
      case 'Failed':
        return 'Failed';
      case '8':
      case 'Refunded':
        return 'Refunded';
      default:
        return 'Pending Payment';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return '';
    }
  };

  const toggleAccordion = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className={style.ordersContainer}>
        <h2 className={style.pageTitle}>My Orders</h2>
        <span className={style.loader}></span>
      </div>
    );
  }

  return (
    <div className={style.ordersContainer}>
      <h2 className={style.pageTitle}>My Orders</h2>

      {/* Modern Tabs Navigation */}
      <div className={style.tabContainer}>
        <button 
          className={`${style.tabButton} ${activeTab === 'orders' ? style.activeTab : ''}`}
          onClick={() => { setActiveTab('orders'); setExpandedOrder(null); }}
        >
          <i className="fa-solid fa-box-open" style={{ marginRight: '8px' }}></i>
          Product Orders
        </button>
        <button 
          className={`${style.tabButton} ${activeTab === 'workshops' ? style.activeTab : ''}`}
          onClick={() => { setActiveTab('workshops'); setExpandedOrder(null); }}
        >
          <i className="fa-solid fa-palette" style={{ marginRight: '8px' }}></i>
          Workshop Bookings
        </button>
      </div>

      {activeTab === 'orders' ? (
        orders.length === 0 ? (
          <div className={style.noOrders}>
            <div className={style.noOrdersIcon}>
              <i className="fa-solid fa-box-open"></i>
            </div>
            <p>You haven't placed any product orders yet.</p>
          </div>
        ) : (
          <div className={style.ordersList}>
            {orders.map((order, index) => (
              <div key={order.id || index} className={`${style.orderCard} ${expandedOrder === index ? style.expanded : ''}`}>
                <div className={style.orderHeader} onClick={() => toggleAccordion(index)}>
                  <div className={style.orderId}>WD-{order.id}</div>
                  <div className={style.orderDate}>{formatDate(order.orderTime)}</div>
                  <div className={style.orderStatusContainer}>
                    <span className={`${style.statusBadge} ${getStatusClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className={style.orderItems}>
                    {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                  </div>
                  <div className={style.orderTotal}>
                    EGP {order.total || order.totalPrice || 0}
                    <i className={`fa-solid fa-chevron-down ${style.chevron} ${expandedOrder === index ? style.chevronUp : ''}`}></i>
                  </div>
                </div>

                <div className={`${style.orderDetails} ${expandedOrder === index ? style.detailsOpen : ''}`}>
                  <div className={style.detailsInner}>
                    <h4 className={style.detailsTitle}>Order Summary</h4>
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, itemIdx) => (
                        <div key={item.itemSnapshotId || itemIdx} className={style.dummyItem}>
                          <span>
                            {item.name} ({item.selectedSize || 'Default'}) <strong style={{ marginLeft: '4px' }}>x{item.quantity}</strong>
                          </span>
                          <span>EGP {item.lineTotal || (item.unitPrice * item.quantity)}</span>
                        </div>
                      ))
                    ) : (
                      <p style={{ fontSize: '13px', color: '#7E7771', margin: 0 }}>No items details available.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        workshops.length === 0 ? (
          <div className={style.noOrders}>
            <div className={style.noOrdersIcon}>
              <i className="fa-solid fa-palette"></i>
            </div>
            <p>You haven't booked any workshops yet.</p>
          </div>
        ) : (
          <div className={style.ordersList}>
            {workshops.map((registration, index) => (
              <div key={registration.id || index} className={`${style.orderCard} ${expandedOrder === index ? style.expanded : ''}`}>
                <div className={style.orderHeader} onClick={() => toggleAccordion(index)}>
                  <div className={style.orderId}>WS-{registration.id}</div>
                  <div className={style.orderDate}>
                    {formatDate(registration.startDate || registration.registrationDate)}
                  </div>
                  <div className={style.orderStatusContainer}>
                    <span className={`${style.statusBadge} ${getStatusClass(registration.paymentStatus)}`}>
                      {registration.paymentStatus }
                    </span>
                  </div>
                  <div className={style.orderItems}>
                    {registration.seats || 1} {registration.seats === 1 ? 'seat' : 'seats'}
                  </div>
                  <div className={style.orderTotal}>
                    EGP {registration.totalPrice}
                    <i className={`fa-solid fa-chevron-down ${style.chevron} ${expandedOrder === index ? style.chevronUp : ''}`}></i>
                  </div>
                </div>

                <div className={`${style.orderDetails} ${expandedOrder === index ? style.detailsOpen : ''}`}>
                  <div className={style.detailsInner}>
                    <h4 className={style.detailsTitle}>Workshop Details</h4>
                    <div className={style.workshopDetailItem}>
                      <span className={style.workshopDetailLabel}>Workshop Title:</span>
                      <strong className={style.workshopDetailVal}>{registration.workshopTitle}</strong>
                    </div>
                    <div className={style.workshopDetailItem}>
                      <span className={style.workshopDetailLabel}>Date & Time:</span>
                      <span className={style.workshopDetailVal}>
                        {formatDate(registration.startDate)} @ {formatTime(registration.startDate)} - {formatTime(registration.endDate)}
                      </span>
                    </div>
                    <div className={style.workshopDetailItem}>
                      <span className={style.workshopDetailLabel}>Location:</span>
                      <span className={style.workshopDetailVal}>{registration.location}</span>
                    </div>
                    <div className={style.workshopDetailItem}>
                      <span className={style.workshopDetailLabel}>Attendees:</span>
                      <span className={style.workshopDetailVal}>
                        {registration.attendeeNames && registration.attendeeNames.length > 0
                          ? registration.attendeeNames.join(", ")
                          : 'Guest'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
