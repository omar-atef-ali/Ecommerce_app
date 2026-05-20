import React, { useContext } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

export default function Cart() {
  const token = localStorage.getItem('token')
  const { isCartOpen, setIsCartOpen, cartvalue, getCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleBrowse = () => {
    setIsCartOpen(false);
    navigate('/shop');
  };

  async function UpdateCartItem(item, newQuantity) {
    const userToken = localStorage.getItem('token') || localStorage.getItem('userToken');
    if (userToken) {
      try {
        const response = await api.put(`/Cart/${item.id}`, {
          itemSizeId: item.itemSizeId || item.itemId,
          quantity: newQuantity
        }, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        console.log(response)
        await getCart()
      }
      catch (error) {
        console.log(error)
      }
    } else {
      let localCart = localStorage.getItem('local cart') ? JSON.parse(localStorage.getItem('local cart')) : [];
      const index = localCart.findIndex(cartItem => cartItem.itemId === item.itemId && cartItem.itemSizeId === item.itemSizeId);
      if (index !== -1) {
        localCart[index].quantity = newQuantity;
        localStorage.setItem('local cart', JSON.stringify(localCart));
        await getCart();
      }
    }
  }

  async function deleteItem(item) {
    const userToken = localStorage.getItem('token') || localStorage.getItem('userToken');
    if (userToken) {
      try {
        const response = await api.delete(`/Cart/${item.id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        console.log(response)
        toast.success("item removed from cart")
        await getCart()
      }
      catch (error) {
        console.log(error)
      }
    } else {
      let localCart = localStorage.getItem('local cart') ? JSON.parse(localStorage.getItem('local cart')) : [];
      localCart = localCart.filter(cartItem => !(cartItem.itemId === item.itemId && cartItem.itemSizeId === item.itemSizeId));
      localStorage.setItem('local cart', JSON.stringify(localCart));
      toast.success("item removed from cart")
      await getCart();
    }
  }

  async function RemoveAllItems() {
    const userToken = localStorage.getItem('token') || localStorage.getItem('userToken');
    if (userToken) {
      try {
        const response = await api.delete(`/Cart/all`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        console.log(response)
        toast.success("all items removed from cart")
        await getCart()
      }
      catch (error) {
        console.log(error)
      }
    } else {
      localStorage.removeItem('local cart');
      toast.success("all items removed from cart")
      await getCart();
    }
  }


  return (
    <>
      {/* Overlay */}
      <div
        className={`${style.cartOverlay} ${isCartOpen ? style.isOpen : ''}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className={`${style.cartDrawer} ${isCartOpen ? style.isOpen : ''}`}>
        <div className={style.header}>
          <h2 className={style.title}>Cart {cartvalue?.length > 0 ? `(${cartvalue.length})` : ''}</h2>
          <button className={style.closeBtn} onClick={handleClose} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={style.content}>
          {cartvalue && cartvalue.length > 0 ? (
            <div className={style.cartWrapper}>
              <div className={style.cartItems}>
                {cartvalue.map((item, index) => {
                  const productName = item.itemName || item.product?.name || 'Unknown Product';
                  const sizeName = item.chosenSize || item.size?.size || item.itemSize?.size || 'Default Size';
                  const price = item.price || item.size?.price || item.itemSize?.price || 0;
                  const originalPrice = item.originalPrice || item.size?.originalPrice || item.itemSize?.originalPrice || price;
                  const mediaUrl = item.imageUrl || item.image || item.product?.media?.[0]?.url || item.product?.imageUrl || '';
                  const imageSrc = mediaUrl ? (mediaUrl.startsWith('http') ? mediaUrl : `https://wedd.runasp.net${mediaUrl}`) : '';

                  return (
                    <>
                      <div key={`${item.itemId}-${item.itemSizeId}-${index}`} className={style.cartItem}>
                        <img src={imageSrc} alt={productName} className={style.itemImage} />

                        <div className={style.itemDetails}>
                          <div className={style.itemHeader}>
                            <div>
                              <h4 className={style.itemName}>{productName}</h4>
                              <span className={style.itemSize}>{sizeName}</span>
                            </div>
                            <button onClick={() => deleteItem(item)} className={style.removeBtn} aria-label="Remove item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>

                          <div className={style.itemFooter}>

                            {price === originalPrice ? (
                              <span className={style.itemPrice}>EGP {price}</span>
                            ) : (
                              <div className={style.priceContainer}>
                                <span className={style.oldPrice}>EGP {originalPrice}</span>
                                <span className={style.currentPrice}>EGP {price}</span>
                              </div>
                            )}

                            <div className={style.qtyControl}>
                              <button className={style.qtyBtn} onClick={() => UpdateCartItem(item, (item.quantity || item.qty || item.count || 1) - 1)} disabled={(item.quantity || item.qty || item.count || 1) === 1}>−</button>
                              <span className={style.qtyValue}>{item.quantity || item.qty || item.count || 1}</span>
                              <button className={style.qtyBtn} onClick={() => UpdateCartItem(item, (item.quantity || item.qty || item.count || 1) + 1)}>+</button>
                            </div>
                          </div>
                        </div>


                      </div>

                    </>
                  );
                })}
              </div>
              <button className={style.RemoveallitemsBtn} onClick={RemoveAllItems}>
                remove All
              </button>
            </div>
          ) : (
            <div className={style.emptyState}>
              <div className={style.emptyIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className={style.emptyTitle}>Your cart is empty</h3>
              <p className={style.emptyText}>Add something warm to your cart</p>
              <button className={style.browseBtn} onClick={() => {
                setIsCartOpen(false);
                navigate('/shop');
              }}>
                Browse Products
              </button>
            </div>
          )}
        </div>
        {cartvalue && cartvalue.length > 0 && (
          <div className={style.cartFooter}>
            <div className={style.subtotalRow}>
              <span className={style.subtotalLabel}>Subtotal</span>
              <span className={style.subtotalValue}>
                EGP {cartvalue.reduce((acc, item) => acc + (item.price || item.size?.price || item.itemSize?.price || 0) * (item.quantity || item.qty || item.count || 1), 0)}
              </span>
            </div>

            {/* <button className={style.viewCartBtn} onClick={handleBrowse}>
              View Cart
            </button> */}
            <button className={style.checkoutBtn}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
