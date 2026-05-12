import React from "react";
import style from "./Home.module.css";

export default function Home() {
  return (
    <>
      <nav class="navbar navbar-light fixed-top">
        <div class="container-fluid navbar-container">
          <div class="nav-logo">
            <div class="logo-circle"></div>
            <span class="logo-text">Wed</span>
          </div>
          <div class="navbar-nav-center">
            <ul class="navbar-nav flex-row">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  CANDLES
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  CHOCOLATES
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  GIFT KITS
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  GIVEAWAYS
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  CUSTOM CANDLE
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  WORKSHOPS
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  OUR STORY
                </a>
              </li>
            </ul>
          </div>

          <div class="navbar-icons">
            <button class="icon-btn">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="7.1875"
                  stroke="#72706E"
                  stroke-width="1.3125"
                />
                <path
                  d="M15.75 15.75L19.25 19.25"
                  stroke="#72706E"
                  stroke-width="1.3125"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <a href="#" class="icon-btn">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path
                  d="M10.5 18.375C10.5 18.375 2.625 13.125 2.625 7.875C2.625 6.88044 3.02009 5.92661 3.72335 5.22335C4.42661 4.52009 5.38044 4.125 6.375 4.125C8.01562 4.125 9.1875 4.71875 10.5 6.5625C11.8125 4.71875 12.9844 4.125 14.625 4.125C15.6196 4.125 16.5734 4.52009 17.2766 5.22335C17.9799 5.92661 18.375 6.88044 18.375 7.875C18.375 13.125 10.5 18.375 10.5 18.375Z"
                  stroke="#72706E"
                  stroke-width="1.3125"
                />
              </svg>
            </a>
            <button class="icon-btn position-relative">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <circle
                  cx="7.875"
                  cy="18.375"
                  r="0.875"
                  stroke="#72706E"
                  stroke-width="1.3125"
                />
                <circle
                  cx="17.5"
                  cy="18.375"
                  r="0.875"
                  stroke="#72706E"
                  stroke-width="1.3125"
                />
                <path
                  d="M1.75 2.625H4.375L6.5625 13.5625C6.65625 14.0625 7.1875 14.4375 7.6875 14.4375H16.625C17.125 14.4375 17.6562 14.0625 17.75 13.5625L19.25 6.5625H5.25"
                  stroke="#72706E"
                  stroke-width="1.3125"
                  stroke-linecap="round"
                />
              </svg>
              <span class="cart-badge">1</span>
            </button>
            <button class="icon-btn">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                <circle
                  cx="10.5"
                  cy="6.125"
                  r="3.0625"
                  stroke="#72706E"
                  stroke-width="1.3125"
                />
                <path
                  d="M17.5 18.375V16.625C17.5 14.4148 15.7102 12.625 13.5 12.625H7.5C5.28984 12.625 3.5 14.4148 3.5 16.625V18.375"
                  stroke="#72706E"
                  stroke-width="1.3125"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <section class="hero-section">
        <div class="hero-image-container">
          <img
            src="../src/imports/ECommerceWebsite/96da4465ba2f9e80702d4bf7b59c9dedf62e1901.png"
            alt="Hero Image"
            class="hero-image"
          />
          <div class="hero-overlay-gradient"></div>
          <div class="hero-overlay-tint"></div>
        </div>

        <div class="hero-content">
          <h1 class="hero-title">A Gift That Feels Like Home</h1>
          <p class="hero-subtitle">
            Premium handcrafted candles & chocolates, made with warmth and
            intention.
          </p>
          <a href="#" class="btn btn-primary hero-btn">
            Shop Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.33333 8H12.6667"
                stroke="#FAF6F0"
                stroke-width="1.33333"
                stroke-linecap="round"
              />
              <path
                d="M8 3.33333L12.6667 8L8 12.6667"
                stroke="#FAF6F0"
                stroke-width="1.33333"
                stroke-linecap="round"
              />
            </svg>
          </a>
        </div>

        <button class="carousel-btn carousel-prev">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M13.75 16.5L8.25 11L13.75 5.5"
              stroke="white"
              stroke-width="1.83333"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <button class="carousel-btn carousel-next">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M8.25 16.5L13.75 11L8.25 5.5"
              stroke="white"
              stroke-width="1.83333"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <div class="carousel-indicators-custom">
          <span class="indicator"></span>
          <span class="indicator active"></span>
          <span class="indicator"></span>
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

      {/* <!-- Featured Product - Candles --> */}
      <section class="featured-section candles-section">
        <div class="container-fluid section-container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <img
                src="../src/imports/ECommerceWebsite/0c8aae329d84f0c8033cbf74ed2ac3cd11568369.png"
                alt="Candles"
                class="featured-image"
              />
            </div>
            <div class="col-md-6">
              <div class="featured-content">
                <h2 class="featured-title">Candles</h2>
                <p class="featured-description">
                  Hand-poured soy wax candles with natural, calming scents. Each
                  one is crafted to bring warmth and serenity to your space.
                </p>
                <a href="#" class="btn-featured">
                  Shop Candles
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.91667 7H11.0833"
                      stroke="#1C1814"
                      stroke-width="1.16667"
                      stroke-linecap="round"
                    />
                    <path
                      d="M7 2.91667L11.0833 7L7 11.0833"
                      stroke="#1C1814"
                      stroke-width="1.16667"
                      stroke-linecap="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Featured Product - Chocolates --> */}
      <section class="featured-section chocolates-section">
        <div class="container-fluid section-container">
          <div class="row align-items-center">
            <div class="col-md-6 order-md-2">
              <img
                src="../src/imports/ECommerceWebsite/9350b5f585fef822166a8797bcbb371ddb4e54f3.png"
                alt="Chocolates"
                class="featured-image"
              />
            </div>
            <div class="col-md-6 order-md-1">
              <div class="featured-content">
                <h2 class="featured-title">Chocolates</h2>
                <p class="featured-description">
                  Premium artisan chocolates made with the finest ingredients. A
                  delightful treat for yourself or a thoughtful gift for someone
                  special.
                </p>
                <a href="#" class="btn-featured">
                  Shop Chocolates
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.91667 7H11.0833"
                      stroke="#1C1814"
                      stroke-width="1.16667"
                      stroke-linecap="round"
                    />
                    <path
                      d="M7 2.91667L11.0833 7L7 11.0833"
                      stroke="#1C1814"
                      stroke-width="1.16667"
                      stroke-linecap="round"
                    />
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

      {/* <!-- Custom Candle Making Section --> */}
      <section class="custom-candle-section">
        <div class="custom-candle-container">
          <img
            src="../src/imports/ECommerceWebsite/51e464284e2bdeb69a77e96250283a1ae8d1938b.png"
            alt="Custom Candle Making"
            class="custom-candle-image"
          />
          <div class="custom-candle-content">
            <h2 class="custom-candle-title">Custom Candle Making</h2>
            <p class="custom-candle-description">
              Create your own signature scent. Choose your preferred wax,
              fragrance, and vessel to craft a candle that's uniquely yours.
            </p>
            <a href="#" class="btn btn-primary custom-candle-btn">
              Start Creating
            </a>
          </div>
        </div>
      </section>

      {/* <!-- Workshops Section --> */}
      <section class="workshops-section">
        <div class="workshops-container">
          <div class="workshops-content">
            <h2 class="workshops-title">Workshops</h2>
            <p class="workshops-description">
              Join our hands-on workshops and learn the art of candle making. A
              perfect activity for groups, date nights, or creative solo time.
            </p>
            <a href="#" class="btn btn-secondary workshops-btn">
              Book a Workshop
            </a>
          </div>
          <img
            src="../src/imports/ECommerceWebsite/4beed7112bddbd4fb04ea0ea5db40e83541559a0.png"
            alt="Workshop"
            class="workshops-image"
          />
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
