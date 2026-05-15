import React from 'react';
import style from './Cart.module.css';

export default function Cart() {
  const cartItems = [
    {
      id: 1,
      name: 'Amber Oud',
      variant: 'Medium',
      price: 280,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      id: 1,
      name: 'Amber Oud',
      variant: 'Medium',
      price: 280,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=150&h=150'
    },
  ];

  return (
    <div className={`container ${style.cartContainer}`}>
      <div className={style.cartHeader}>
        <h2 className={style.pageTitle}>Your Cart</h2>
        <p className={style.itemsCount}>1 item</p>
      </div>

      <div className="row g-5">
        {/* Cart Items List */}
        <div className="col-12 col-lg-8">
          <div className={style.itemsList}>
            {cartItems.map(item => (
              <div key={item.id} className={style.cartItem}>
                <div className={style.itemImageWrapper}>
                  <img src={item.image} alt={item.name} className={style.itemImage} />
                </div>
                
                <div className={style.itemDetails}>
                  <div className={style.itemTopRow}>
                    <div>
                      <h3 className={style.itemName}>{item.name}</h3>
                      <p className={style.itemVariant}>{item.variant}</p>
                    </div>
                    <div className={style.itemTotalPrice}>
                      EGP {item.price * item.quantity}
                    </div>
                  </div>

                  <div className={style.itemBottomRow}>
                    <div className={style.quantityControls}>
                      <div className={style.qtyWrapper}>
                        <button className={style.qtyBtn}><i className="fa-solid fa-minus"></i></button>
                        <span className={style.qtyValue}>{item.quantity}</span>
                        <button className={style.qtyBtn}><i className="fa-solid fa-plus"></i></button>
                      </div>
                      <span className={style.priceEach}>EGP {item.price} each</span>
                    </div>
                    
                    <div className={style.itemActions}>

                      <button className={style.deleteBtn}>
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className={style.clearCartBtn}>Clear Cart</button>
        </div>

        {/* Order Summary */}
        <div className="col-12 col-lg-4">
          <div className={style.summaryCard}>
            <h3 className={style.summaryTitle}>Order Summary</h3>
            
            <div className={style.summaryRow}>
              <span>Items (1)</span>
              <span>EGP 280</span>
            </div>
            <div className={style.summaryRow}>
              <span>Shipping</span>
              <span>EGP 50</span>
            </div>
            
            <div className={style.summaryTotal}>
              <span>Total</span>
              <span>EGP 330</span>
            </div>
            
            <div className={style.discountSection}>
              <div className={style.discountInputWrapper}>
                <input type="text" placeholder="Discount code" className={style.discountInput} />
                <button className={style.applyBtn}>Apply</button>
              </div>
              <p className={style.discountHint}>Try: WED10 for 10% off</p>
            </div>
            
            <button className={style.checkoutBtn}>Proceed to Checkout</button>
            <div className={style.continueShoppingWrapper}>
              <a href="#" className={style.continueShopping}>Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
