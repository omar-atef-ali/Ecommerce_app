import React, { useState } from 'react';
import style from './ProductDetails.module.css';

export default function ProductDetails() {
  const [qty, setQty] = useState(1);
  const [activeSize, setActiveSize] = useState('Small');
  const [activeThumbnail, setActiveThumbnail] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1572013343866-df3000b991b5?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=200&q=80'
  ];

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

  return (
    <div className={style.pageWrapper}>
      <div className={style.container}>
        <div className={style.breadcrumb}>
          <span>Home</span> &gt; <span>Shop</span> &gt; <span>Amber Oud</span>
        </div>

        <div className={style.productLayout}>
          {/* IMAGE SECTION */}
          <div className={style.imageSection}>
            <div className={style.mainImageContainer}>
              <img src={images[activeThumbnail]} alt="Amber Oud" className={style.mainImage} />
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
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`${style.thumbnailWrapper} ${activeThumbnail === index ? style.active : ''}`}
                  onClick={() => setActiveThumbnail(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className={style.thumbnail} />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className={style.detailsSection}>
            <h1 className={style.title}>Amber Oud</h1>


            <div className={style.rating}>
              <div className={style.stars}>
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <span className={style.ratingText}>4.8 (47 reviews)</span>
            </div>

            <div className={style.notesSection}>
              <div className={style.noteRow}>
                <span className={style.noteLabel}>TOP NOTES</span>
                <div className={style.noteTags}>
                  <span className={style.noteTag}>Bergamot</span>
                  <span className={style.noteTag}>Pink Pepper</span>
                </div>
              </div>
              <div className={style.noteRow}>
                <span className={style.noteLabel}>HEART NOTES</span>
                <div className={style.noteTags}>
                  <span className={style.noteTag}>Rose</span>
                  <span className={style.noteTag}>Oud</span>
                </div>
              </div>
              <div className={style.noteRow}>
                <span className={style.noteLabel}>BASE NOTES</span>
                <div className={style.noteTags}>
                  <span className={style.noteTag}>Amber</span>
                  <span className={style.noteTag}>Musk</span>
                  <span className={style.noteTag}>Sandalwood</span>
                </div>
              </div>
            </div>

            <div className={style.sizeSection}>
              <span className={style.sectionLabel}>SIZE</span>
              <div className={style.sizeOptions}>
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    className={`${style.sizeOption} ${activeSize === size ? style.active : ''}`}
                    onClick={() => setActiveSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className={style.burnTime}>Burns for ~25 hours · EGP 180</div>
            </div>

            <div className={style.price}>EGP 180</div>

            <div className={style.actionsSection}>
              <div className={style.qtySection}>
                <span className={style.qtyLabel}>QTY</span>
                <div className={style.qtyControl}>
                  <button className={style.qtyBtn} onClick={() => handleQtyChange('dec')}>−</button>
                  <span className={style.qtyValue}>{qty}</span>
                  <button className={style.qtyBtn} onClick={() => handleQtyChange('inc')}>+</button>
                </div>
              </div>
              <button className={style.addToCartBtn}>Add to Cart</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
