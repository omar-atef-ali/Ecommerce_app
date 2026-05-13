import React, { useState, useEffect, useRef } from "react";
import style from "./Home.module.css";
import img0 from "../../assets/bubble candles!.jpg"
import img2 from "../../assets/Immerse yourself in the ambiance of our Aesthetic….jpg"
import img3 from "../../assets/download.webp"
export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 0,
      image: img0,
      title: "A Gift That Feels Like Home",
      subtitle: "Premium handcrafted candles & chocolates, made with warmth and intention.",
      btn: "Shop Now"
    },
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=1440",
      title: "Curated Gift Kits",
      subtitle: "Beautiful boxes, thoughtfully assembled for every occasion that matters.",
      btn: "Explore Kits"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&q=80&w=1440",
      title: "Chocolates Worth Gifting",
      subtitle: "Bring warmth and relaxation to your space with our premium natural wax candles.",
      btn: "Discover Chocolates"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);



  return (
    <>


      <section className={style.heroSection}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={style.heroImageContainer}
            style={{
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: currentSlide === index ? 1 : 0
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={style.heroImage}
            />
            <div className={style.heroOverlayGradient}></div>
            <div className={style.heroOverlayTint}></div>
          </div>
        ))}

        <div className={style.heroContent} key={currentSlide}>
          <h1 className={style.heroTitle}>{heroSlides[currentSlide].title}</h1>
          <p className={style.heroSubtitle}>
            {heroSlides[currentSlide].subtitle}
          </p>
          <a href="#" className={`  ${style.heroBtn}`}>
            {heroSlides[currentSlide].btn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.33333 8H12.6667"
                stroke="#FAF6F0"
                strokeWidth="1.33333"
                strokeLinecap="round"
              />
              <path
                d="M8 3.33333L12.6667 8L8 12.6667"
                stroke="#FAF6F0"
                strokeWidth="1.33333"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>

        <button className={`${style.carouselBtn} ${style.carouselPrev}`} onClick={prevSlide}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M13.75 16.5L8.25 11L13.75 5.5"
              stroke="white"
              strokeWidth="1.83333"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button className={`${style.carouselBtn} ${style.carouselNext}`} onClick={nextSlide}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M8.25 16.5L13.75 11L8.25 5.5"
              stroke="white"
              strokeWidth="1.83333"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className={style.carouselIndicatorsCustom}>
          {heroSlides.map((slide, index) => (
            <span
              key={slide.id}
              className={`${style.indicator} ${currentSlide === index ? style.active : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* <!-- Best Sellers Section --> */}
      <section class="best-sellers-section">
        <div class="container-fluid section-container">
          <div class="section-header">
            <h2 class="section-title">Best Sellers</h2>
            <a href="#" class="section-link">
              shop more
            </a>
          </div>

          <div class="position-relative">
            <button class="product-arrow product-arrow-left">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11.25 13.5L6.75 9L11.25 4.5"
                  stroke="#1C1814"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <button class="product-arrow product-arrow-right">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M6.75 13.5L11.25 9L6.75 4.5"
                  stroke="#1C1814"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <div class="row products-row">
              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/331822da47669a5ccfa34c3581d7963a362dfd95.png"
                      alt="Amber Oud"
                      class="product-image"
                    />
                    <div class="product-badges">
                      <span class="badge-limited">ONLY 3 LEFT</span>
                      <span class="badge-bestseller">BESTSELLER</span>
                    </div>
                  </a>
                  <div class="product-info">
                    <p class="product-name">Amber Oud</p>
                    <p class="product-price">EGP 180</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/d90a3dc185a9c5adcf90bb11be5e6e9b656cae07.png"
                      alt="Rose & Musk"
                      class="product-image"
                    />
                    <div class="product-badges">
                      <span class="badge-bestseller">BESTSELLER</span>
                    </div>
                  </a>
                  <div class="product-info">
                    <p class="product-name">Rose & Musk</p>
                    <p class="product-price">EGP 160</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/b8c7394e36c2195570bc4e8beb95ab184f34825f.png"
                      alt="Fig Noir"
                      class="product-image"
                    />
                    <div class="product-badges">
                      <span class="badge-limited">ONLY 4 LEFT</span>
                      <span class="badge-new">NEW</span>
                      <span class="badge-bestseller">BESTSELLER</span>
                    </div>
                  </a>
                  <div class="product-info">
                    <p class="product-name">Fig Noir</p>
                    <p class="product-price">EGP 190</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/50a4dc93eba2cb05d982e25bdba89de1020fe2bb.png"
                      alt="Vanilla Dream"
                      class="product-image"
                    />
                    <div class="product-badges">
                      <span class="badge-new">NEW</span>
                    </div>
                  </a>
                  <div class="product-info">
                    <p class="product-name">Vanilla Dream</p>
                    <p class="product-price">EGP 175</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Featured Categories --> */}
      <section className={style.featuredCategoriesSection}>
        <div className={`container-fluid ${style.sectionContainer}`}>
          <div className="row justify-content-center" style={{ gap: '32px' }}>
            <div className="col-12 col-md-5">
              <div className={style.categoryCard}>
                <img
                  src={img2}
                  alt="Candles"
                  className={style.categoryImage}
                />
                <h3 className={style.categoryTitle}>Candles</h3>
                <a href="#" className={style.categoryBtn}>Shop Candles</a>
              </div>
            </div>

            <div className="col-12 col-md-5">
              <div className={style.categoryCard}>
                <img
                  src={img3}
                  alt="Chocolates"
                  className={style.categoryImage}
                />
                <h3 className={style.categoryTitle}>Chocolates</h3>
                <a href="#" className={style.categoryBtn}>Shop Chocolates</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Curated Section --> */}
      <section className={style.curatedSection}>
        <div className="container-fluid p-0">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-6">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1000"
                alt="Curated Gift Box"
                className={style.curatedImage}
              />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <div className={style.curatedContent}>
                <span className={style.curatedEyebrow}>CURATED FOR EVERY OCCASION</span>
                <h2 className={style.curatedTitle}>A Gift That Means<br />Something</h2>
                <p className={style.curatedDescription}>
                  Every kit is assembled with intention — candles and chocolates that together create a memory worth keeping. For every occasion, big or small.
                </p>
                <a href="#" className={style.curatedBtn}>
                  Explore Kits
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '8px' }}>
                    <path d="M2.91667 7H11.0833" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" />
                    <path d="M7 2.91667L11.0833 7L7 11.0833" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Gift Kits Section --> */}
      <section class="gift-kits-section">
        <div class="container-fluid section-container">
          <div class="section-header">
            <h2 class="section-title">Gift Kits</h2>
            <a href="#" class="section-link">
              shop more
            </a>
          </div>

          <div class="position-relative">
            <button class="product-arrow product-arrow-left">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11.25 13.5L6.75 9L11.25 4.5"
                  stroke="#1C1814"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <button class="product-arrow product-arrow-right">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M6.75 13.5L11.25 9L6.75 4.5"
                  stroke="#1C1814"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <div class="row products-row">
              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/331822da47669a5ccfa34c3581d7963a362dfd95.png"
                      alt="Gift Kit 1"
                      class="product-image"
                    />
                    <div class="product-badges">
                      <span class="badge-bestseller">BESTSELLER</span>
                    </div>
                  </a>
                  <div class="product-info">
                    <p class="product-name">Deluxe Gift Set</p>
                    <p class="product-price">EGP 350</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/d90a3dc185a9c5adcf90bb11be5e6e9b656cae07.png"
                      alt="Gift Kit 2"
                      class="product-image"
                    />
                  </a>
                  <div class="product-info">
                    <p class="product-name">Comfort Kit</p>
                    <p class="product-price">EGP 280</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/b8c7394e36c2195570bc4e8beb95ab184f34825f.png"
                      alt="Gift Kit 3"
                      class="product-image"
                    />
                  </a>
                  <div class="product-info">
                    <p class="product-name">Celebration Box</p>
                    <p class="product-price">EGP 420</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/50a4dc93eba2cb05d982e25bdba89de1020fe2bb.png"
                      alt="Gift Kit 4"
                      class="product-image"
                    />
                    <div class="product-badges">
                      <span class="badge-new">NEW</span>
                    </div>
                  </a>
                  <div class="product-info">
                    <p class="product-name">Mini Moments</p>
                    <p class="product-price">EGP 220</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* <!-- Footer --> */}
      <footer class="footer">
        <div class="container-fluid footer-container">
          <div class="row">
            <div class="col-md-4">
              <h3 class="footer-brand">maison</h3>
              <p class="footer-description">
                Handcrafted candles and chocolates made with warmth and
                intention.
              </p>
            </div>
            <div class="col-md-2">
              <h4 class="footer-heading">Shop</h4>
              <ul class="footer-links">
                <li>
                  <a href="#">Candles</a>
                </li>
                <li>
                  <a href="#">Chocolates</a>
                </li>
                <li>
                  <a href="#">Gift Kits</a>
                </li>
                <li>
                  <a href="#">Giveaways</a>
                </li>
              </ul>
            </div>
            <div class="col-md-2">
              <h4 class="footer-heading">Learn</h4>
              <ul class="footer-links">
                <li>
                  <a href="#">Workshops</a>
                </li>
                <li>
                  <a href="#">Custom Candles</a>
                </li>
                <li>
                  <a href="#">Our Story</a>
                </li>
              </ul>
            </div>
            <div class="col-md-4">
              <h4 class="footer-heading">Stay Connected</h4>
              <p class="footer-text">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <form class="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="newsletter-input"
                />
                <button type="submit" class="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div class="footer-bottom">
            <p class="footer-copyright">
              &copy; 2024 Maison. All rights reserved.
            </p>
            <div class="footer-social">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Pinterest</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
