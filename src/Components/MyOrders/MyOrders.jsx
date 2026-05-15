import React, { useState } from 'react';
import style from './MyOrders.module.css';

export default function MyOrders() {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const orders = [
    { id: 'WD-109823', date: 'May 8, 2026', status: 'Delivered', items: 3, total: 680 },
    { id: 'WD-108451', date: 'April 22, 2026', status: 'Shipped', items: 2, total: 380 },
    { id: 'WD-107002', date: 'April 10, 2026', status: 'Awaiting Payment', items: 4, total: 980 },
    { id: 'WD-105678', date: 'March 28, 2026', status: 'Cancelled', items: 1, total: 220 },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return style.statusDelivered;
      case 'Shipped': return style.statusShipped;
      case 'Awaiting Payment': return style.statusAwaiting;
      case 'Cancelled': return style.statusCancelled;
      default: return '';
    }
  };

  const toggleAccordion = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  return (
    <div className={style.ordersContainer}>
      <h2 className={style.pageTitle}>My Orders</h2>
      
      <div className={style.ordersList}>
        {orders.map((order, index) => (
          <div key={index} className={`${style.orderCard} ${expandedOrder === index ? style.expanded : ''}`}>
            <div className={style.orderHeader} onClick={() => toggleAccordion(index)}>
              <div className={style.orderId}>{order.id}</div>
              <div className={style.orderDate}>{order.date}</div>
              <div className={style.orderStatusContainer}>
                <span className={`${style.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className={style.orderItems}>{order.items} items</div>
              <div className={style.orderTotal}>
                EGP {order.total}
                <i className={`fa-solid fa-chevron-down ${style.chevron} ${expandedOrder === index ? style.chevronUp : ''}`}></i>
              </div>
            </div>
            
            <div className={`${style.orderDetails} ${expandedOrder === index ? style.detailsOpen : ''}`}>
              <div className={style.detailsInner}>
                <h4 className={style.detailsTitle}>Order Summary</h4>
                <div className={style.dummyItem}>
                  <span>Dummy Product 1</span>
                  <span>EGP 200</span>
                </div>
                <div className={style.dummyItem}>
                  <span>Dummy Product 2</span>
                  <span>EGP 480</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
