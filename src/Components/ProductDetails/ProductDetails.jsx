import React, { useEffect, useState, useContext } from 'react';
import style from './ProductDetails.module.css';
import { data, useParams } from 'react-router-dom';
import api from "../../api"
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams()
  const [qty, setQty] = useState(1);
  const [activeSize, setActiveSize] = useState('Small');
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsCartOpen, getCart } = useContext(CartContext);
  const userToken = localStorage.getItem('userToken');

  console.log(product.scents)


  const handleQtyChange = (type) => {
    if (type === 'inc') {
      setQty(qty + 1);
    } else if (type === 'dec' && qty > 1) {
      setQty(qty - 1);
    }
  };

  const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  async function getProduct() {
    try {
      const { data } = await api.get(`/Items/${id}`)
      console.log(data)
      setProduct(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  async function addToCart(id, Sizeid, qty) {
    const token = localStorage.getItem('token') || localStorage.getItem('userToken');

    if (token) {
      try {
        let response = await api.post(`/Cart`, {
          itemId: id,
          itemSizeId: Sizeid,
          quantity: qty
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response)
        toast.success("Added to cart successfully");
        getCart();
        setIsCartOpen(true);

      }
      catch (error) {
        console.log(error)
        toast.error(
          error.response?.data?.errors?.[1] ||
          "Something went wrong while adding to cart.",
          {
            position: "top-center",
            duration: 4000,
          }
        );
      }
    } else {
      let localCart = localStorage.getItem('local cart') ? JSON.parse(localStorage.getItem('local cart')) : [];
      const existingItemIndex = localCart.findIndex(item => item.itemId === id && item.itemSizeId === Sizeid);

      if (existingItemIndex !== -1) {
        localCart[existingItemIndex].quantity += qty;
      } else {
        localCart.push({
          itemId: id,
          itemSizeId: Sizeid,
          quantity: qty,
          product: product,
          size: activeSize
        });
      }

      localStorage.setItem('local cart', JSON.stringify(localCart));
      toast.success("Added to cart successfully");
      getCart();
      setIsCartOpen(true);
    }
  }
  useEffect(() => {
    getProduct()
  }, [id])

  useEffect(() => {
    if (product.sizes?.length) {
      setActiveSize(product.sizes[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className={style.pageWrapper}>
        <div className={style.loadingOverlay}>
          <div className={style.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageWrapper}>
      <div className={style.container}>
        <div className={style.breadcrumb}>
          <span>Home</span> &gt; <span>Shop</span> &gt; <span>{product.name}</span>
        </div>

        <div className={style.productLayout}>
          {/* IMAGE SECTION */}
          <div className={style.imageSection}>
            <div className={style.mainImageContainer}>
              <img src={`https://wedd.runasp.net${product.media?.[activeThumbnail].url}`} alt="Amber Oud" className={style.mainImage} />
              {/* <button className={style.zoomButton} aria-label="Zoom Image">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button> */}
            </div>

            <div className={style.thumbnailsContainer}>
              {product.media?.map((img, index) => (
                <div
                  key={index}
                  className={`${style.thumbnailWrapper} ${activeThumbnail === index ? style.active : ''}`}
                  onClick={() => setActiveThumbnail(index)}
                >
                  <img src={`https://wedd.runasp.net${img.url}`} alt={`Thumbnail ${index + 1}`} className={style.thumbnail} />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className={style.detailsSection}>
            <h1 className={style.title}>{product.name}</h1>

            <p className={style.description}>{product.description}</p>  

            {product.discountPercentage && (
              <p>{`Discount Percentage : ${product.discountPercentage}`}</p>
            )}


            <div className={style.rating}>
              {product.averageRating > 0 ?
                <div className={style.stars}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div> : ""}
              <span className={style.ratingText}>{product.averageRating ? product.averageRating : ""} {product.reviewCount ? `( ${product.reviewCount} reviews )` : ""} </span>
            </div>

            <div className={style.notesSection}>
              {["Top", "Heart", "Base"].map((position) => {
                const filteredScents = product.scents?.filter((scent) => scent.position === position
                );

                if (!filteredScents?.length) return null;

                return (
                  <div className={style.noteRow} key={position}>
                    <span className={style.noteLabel}>
                      {position.toUpperCase()} NOTES
                    </span>

                    <div className={style.noteTags}>
                      {filteredScents.map((scent) => (
                        <span className={style.noteTag} key={scent.id}>
                          {scent.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {product.flavor ? <p>{`Flavor : ${product.flavor}`}</p> : ""}

            <div className={style.sizeSection}>
              <span className={style.sectionLabel}>SIZE</span>

              <div className={style.sizeOptions}>
                {product.sizes?.map((item) => (
                  <button
                    key={item.id}
                    className={`${style.sizeOption} ${activeSize?.id === item.id ? style.active : ""
                      }`}
                    onClick={() => setActiveSize(item)}
                  >
                    {item.size}
                  </button>
                ))}
              </div>

              {activeSize?.lastForInHours && (
                <div className={style.burnTime}>
                  Burns for ~{activeSize?.lastForInHours} hours · EGP{" "}
                  {activeSize?.price}
                </div>
              )}
            </div>



            {activeSize?.price && (
              <div className={style.price}>
                EGP {activeSize?.price}
              </div>
            )}

            {activeSize?.price && (
              <div className={style.stock}>
                Stock : {activeSize?.stockQuantity}
              </div>
            )}

            <div className={style.actionsSection}>
              <div className={style.qtySection}>
                <span className={style.qtyLabel}>QTY</span>
                <div className={style.qtyControl}>
                  <button className={style.qtyBtn} onClick={() => handleQtyChange('dec')} disabled={qty === 1}>−</button>
                  <span className={style.qtyValue}>{qty}</span>
                  <button className={style.qtyBtn} onClick={() => handleQtyChange('inc')}>+</button>
                </div>
              </div>
              <button className={style.addToCartBtn} onClick={() => addToCart(product.id, activeSize.id, qty)}>Add to Cart</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
