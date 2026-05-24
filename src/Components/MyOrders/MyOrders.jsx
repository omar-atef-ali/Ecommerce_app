import React, { useEffect, useState } from 'react';
import style from './MyOrders.module.css';
import toast from 'react-hot-toast';
import api from '../../api';

export default function MyOrders() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
const token = localStorage.getItem('token');
  useEffect(() => {

    const fetchOrders = async () => {
      try {
        
        const { data } = await api.get('Orders/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(data);
        console.log(data);

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

    fetchOrders();
  }, []);

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

      {orders.length === 0 ? (
        <div className={style.noOrders}>
          <div className={style.noOrdersIcon}>
            <i className="fa-solid fa-box-open"></i>
          </div>
          <p>You haven't placed any orders yet.</p>
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
      )}
    </div>
  );
}
