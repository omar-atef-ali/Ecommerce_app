import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import style from "./Home.module.css";
import api from "../../api";
export default function Home() {
  // Swiper 1
  const bestPrevRef = useRef(null);
  const bestNextRef = useRef(null);

  // Swiper 2
  const pickedPrevRef = useRef(null);
  const pickedNextRef = useRef(null);
  const [imageHovered, setImageHovered] = useState(false);

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const [products, setproducts] = useState([])
  const [pickedData, setpickedData] = useState([])

  // const products = [
  //   {
  //     id: 1,
  //     name: "Amber Oud",
  //     minPrice: "EGP 180",
  //     image: "/candels.webp",
  //     hoverVideo: "/vidcandels.mp4",
  //     badges: [
  //       { label: "ONLY 3 LEFT", type: "limited" },
  //       { label: "BESTSELLER", type: "bestseller" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Velvet Rose",
  //     minPrice: "EGP 210",
  //     image: "/candels.webp",
  //     hoverVideo: "/vidcandels.mp4",
  //     badges: [{ label: "BESTSELLER", type: "bestseller" }],
  //   },
  //   {
  //     id: 3,
  //     name: "Cedar Noir",
  //     minPrice: "EGP 195",
  //     image: "/candels.webp",
  //     hoverVideo: "/vidcandels.mp4",
  //     badges: [{ label: "NEW", type: "new" }],
  //   },
  //   {
  //     id: 4,
  //     name: "White Musk",
  //     minPrice: "EGP 175",
  //     image: "/candels.webp",
  //     hoverVideo: "/vidcandels.mp4",
  //     badges: [{ label: "ONLY 2 LEFT", type: "limited" }],
  //   },
  //   {
  //     id: 5,
  //     name: "Sandalwood Dusk",
  //     minPrice: "EGP 220",
  //     image: "/candels.webp",
  //     hoverVideo: "/vidcandels.mp4",
  //     badges: [{ label: "BESTSELLER", type: "bestseller" }],
  //   },
  //   {
  //     id: 6,
  //     name: "Citrus Bloom",
  //     minPrice: "EGP 165",
  //     image: "/candels.webp",
  //     hoverVideo: "/vidcandels.mp4",
  //     badges: [],
  //   },
  // ];

  async function getBestSeller() {

    try {
      let { data } = await api.get(`/Items/best-sellers`);
      console.log(data);
      setproducts(data)



    } catch (error) {
      console.log(error);

    }

  }
  async function getpicked() {

    try {
      let { data } = await api.get(`/Items/picked-for-you`);
      console.log(data);
      setpickedData(data)



    } catch (error) {
      console.log(error);

    }

  }





  useEffect(() => {
    getBestSeller()
    getpicked()
  }, []);


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
      <section className={`${style.best_sellers_section}`}>
        <div className={`container-fluid ${style.section_container}`}>
          <div className={`${style.section_header}`}>
            <h2 className={`${style.section_title}`}>Best Sellers</h2>
            <a className={`${style.section_link}`} href="#">
              shop more
            </a>
          </div>

          <div onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)} className={style.swiper_outer}>
            {/* Left Arrow */}
            <button
              ref={bestPrevRef}
              className={`${style.product_arrow} ${style.product_arrow_left} ${imageHovered ? style.arrow_visible : ""}`}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11.25 13.5L6.75 9L11.25 4.5"
                  stroke="#1C1814"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              ref={bestNextRef}
              className={`${style.product_arrow} ${style.product_arrow_right} ${imageHovered ? style.arrow_visible : ""}`}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M6.75 13.5L11.25 9L6.75 4.5"
                  stroke="#1C1814"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {products.length > 0 && (
              <Swiper
                modules={[Navigation]}
                loop={products.length > 4}
                navigation={{
                  prevEl: bestPrevRef.current,
                  nextEl: bestNextRef.current,
                }}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    if (swiper.params?.navigation) {
                      swiper.params.navigation.prevEl = bestPrevRef.current;
                      swiper.params.navigation.nextEl = bestNextRef.current;
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }
                  });
                }}
                spaceBetween={24}
                slidesPerView={1.2}
                breakpoints={{
                  480: { slidesPerView: 1.8 },
                  640: { slidesPerView: 2.2 },
                  900: { slidesPerView: 3.2 },
                  1200: { slidesPerView: 4 },
                }}
                className={style.swiper}
              >
                {products?.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className={`${style.product_card}`}>
                      <div className={style.image_wrapper}>
                        <a
                          className={style.product_image_link}
                          href="#"

                        >
                          <img
                            src={`https://wedd.runasp.net${product.image.url}`}

                            alt={product.name}
                            className={style.product_image}
                          />
                          {/* <img
                          src={product.hoverImage}
                          alt={product.name}
                          className={`${style.product_image} ${style.product_image_hover}`}
                        /> */}
                          <video
                            className={`${style.product_image} ${style.product_image_hover}`}
                            src={`https://wedd.runasp.net${product.secondaryMedia.url}`}
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => e.target.pause()}
                          />

                          {product.labels && (
                            <div className={style.product_badges}>

                              {product.labels.isNew && (
                                <span className={`${style.badge_base} ${style.badge_new}`}>
                                  New
                                </span>
                              )}

                              {product.labels.isOnSale && product.discountPercentage != null && (
                                <span className={`${style.badge_base} ${style.badge_limited}`}>
                                  {product.discountPercentage}% OFF
                                </span>
                              )}



                              {product.labels.isLowStock && product.stockRemaining != null && (
                                <span className={`${style.badge_base} ${style.badge_bestseller}`}>
                                  ONLY {product.stockRemaining} LEFT
                                </span>
                              )}

                              {product.labels.isOutOfStock && (
                                <span className={`${style.badge_base} ${style.badge_out}`}>
                                  Out of Stock
                                </span>
                              )}

                            </div>
                          )}
                          <div className={style.wish_list}>
                            <i className="fa-regular fa-heart"></i>
                          </div>

                          <div className={style.option_btn}>
                            <button>Select option</button>
                          </div>
                        </a>
                      </div>

                      <div className={`${style.product_info}`}>
                        <p className={`${style.product_name}`}>{product.name}</p>
                        <p className={`${style.product_minPrice}`}>{product.minPrice}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
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
                      className={`${style.product_image}`}
                    />
                    <div class="product-badges">
                      <span class="badge-bestseller">BESTSELLER</span>
                    </div>
                  </a>
                  <div class="product-info">
                    <p class="product-name">Deluxe Gift Set</p>
                    <p class="product-minPrice">EGP 350</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/d90a3dc185a9c5adcf90bb11be5e6e9b656cae07.png"
                      alt="Gift Kit 2"
                      className={`${style.product_image}`}
                    />
                  </a>
                  <div class="product-info">
                    <p class="product-name">Comfort Kit</p>
                    <p class="product-minPrice">EGP 280</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/b8c7394e36c2195570bc4e8beb95ab184f34825f.png"
                      alt="Gift Kit 3"
                      className={`${style.product_image}`}
                    />
                  </a>
                  <div class="product-info">
                    <p class="product-name">Celebration Box</p>
                    <p class="product-minPrice">EGP 420</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="product-card">
                  <a href="#" class="product-image-link">
                    <img
                      src="../src/imports/ECommerceWebsite/50a4dc93eba2cb05d982e25bdba89de1020fe2bb.png"
                      alt="Gift Kit 4"
                      className={`${style.product_image}`}
                    />
                    <div class="product-badges">
                      <span class="badge-new">NEW</span>
                    </div>
                  </a>
                  <div class="product-info">
                    <p class="product-name">Mini Moments</p>
                    <p class="product-minPrice">EGP 220</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Custom Candle Making Section --> */}
      {/* <section class="custom-candle-section">
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
      </section> */}

      {/* <!-- picked Section --> */}
      <section className={`${style.best_sellers_section}`}>
        <div className={`container-fluid ${style.section_container}`}>
          <div className={`${style.section_header}`}>
            <h2 className={`${style.section_title}`}>Picked For You</h2>
            <a className={`${style.section_link}`} href="#">
              shop more
            </a>
          </div>

          <div onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)} className={style.swiper_outer}>
            {/* Left Arrow */}
            <button
              ref={pickedPrevRef}
              className={`${style.product_arrow} ${style.product_arrow_left} ${imageHovered ? style.arrow_visible : ""}`}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11.25 13.5L6.75 9L11.25 4.5"
                  stroke="#1C1814"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              ref={pickedNextRef}
              className={`${style.product_arrow} ${style.product_arrow_right} ${imageHovered ? style.arrow_visible : ""}`}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M6.75 13.5L11.25 9L6.75 4.5"
                  stroke="#1C1814"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <Swiper
              modules={[Navigation]}
              loop={products.length > 4}
              navigation={{
                prevEl: pickedPrevRef.current,
                nextEl: pickedNextRef.current,
              }}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  if (swiper.params?.navigation) {
                    swiper.params.navigation.prevEl = pickedPrevRef.current;
                    swiper.params.navigation.nextEl = pickedNextRef.current;
                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                });
              }}
              spaceBetween={24}
              slidesPerView={1.2}
              breakpoints={{
                480: { slidesPerView: 1.8 },
                640: { slidesPerView: 2.2 },
                900: { slidesPerView: 3.2 },
                1200: { slidesPerView: 4 },
              }}
              className={style.swiper}
            >
              {pickedData?.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className={`${style.product_card}`}>
                    <div className={style.image_wrapper}>
                      <a
                        className={style.product_image_link}
                        href="#"

                      >
                        <img
                          src={`https://wedd.runasp.net${product.image.url}`}

                          alt={product.name}
                          className={style.product_image}
                        />
                        {/* <img
                          src={product.hoverImage}
                          alt={product.name}
                          className={`${style.product_image} ${style.product_image_hover}`}
                        /> */}
                        <video
                          className={`${style.product_image} ${style.product_image_hover}`}
                          src={`https://wedd.runasp.net${product.secondaryMedia.url}`}
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                        />

                        {product.labels && (
                          <div className={style.product_badges}>

                            {product.labels.isNew && (
                              <span className={`${style.badge_base} ${style.badge_new}`}>
                                New
                              </span>
                            )}

                            {product.labels.isOnSale && product.discountPercentage != null && (
                              <span className={`${style.badge_base} ${style.badge_limited}`}>
                                {product.discountPercentage}% OFF
                              </span>
                            )}



                            {product.labels.isLowStock && product.stockRemaining != null && (
                              <span className={`${style.badge_base} ${style.badge_bestseller}`}>
                                ONLY {product.stockRemaining} LEFT
                              </span>
                            )}

                            {product.labels.isOutOfStock && (
                              <span className={`${style.badge_base} ${style.badge_out}`}>
                                Out of Stock
                              </span>
                            )}

                          </div>
                        )}

                        <div className={style.wish_list}>
                          <i className="fa-regular fa-heart"></i>
                        </div>

                        <div className={style.option_btn}>
                          <button>Select option</button>
                        </div>
                      </a>
                    </div>

                    <div className={`${style.product_info}`}>
                      <p className={`${style.product_name}`}>{product.name}</p>
                      <p className={`${style.product_minPrice}`}>{product.minPrice}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* <!-- Workshops Section --> */}
      <section className={`${style.workShops}`}>
        <div className={`${style.workShops_info}`}>
          <p>MADE JUST FOR YOU</p>
          <h3>Make It Yours</h3>
        </div>

        <div className={`container`}>
          <div
            className={style.workShops_image_parent}
            style={{ backgroundImage: "url('/candels.webp')" }}
          ></div>
        </div>

        <div className={`${style.workShops_info2}`}>
          <p>Attend a workshop or let us craft your custom candle - your <br /> scent. your vessel, your story</p>
        </div>

        <div className={`${style.workShops_buttons}`}>
          <button className={`${style.workShops_btn1}`}>Design Your Candle</button>
          <button className={`${style.workShops_btn2}`}>Attend a Workshop</button>
        </div>
      </section>

      <section className={`${style.ourstory}`}>
        <h3>"Born from the desire to gite warmth - in <br /> every form. "</h3>
        <div className={`${style.ourstory_link}`}>
          <a href="#" className={`${style.section_link}`}>Our Story </a>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer className={`${style.footer}`}>
        <div className={`container-fluid ${style.footer_container}`}>
          <div className={`row`}>
            <div className={`col-md-4`}>
              <h3 className={`${style.footer_brand}`}>Wed</h3>
              <p className={`${style.footer_description}`}>
                Premium candles & chocolates, crafted <br />
                with warmth.
              </p>
              <div className={`${style.footer_social}`}>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
              </div>
            </div>
            <div className={`col-md-2`}>
              <div
                className={style.footer_accordion}
                onClick={() => toggleSection("shop")}
              >
                <h4 className={`${style.footer_heading}`}>Shop</h4>
                <svg
                  className={`${style.accordion_arrow} ${openSection === "shop" ? style.accordion_arrow_open : ""}`}
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                >
                  <path d="M4 6L8 10L12 6" stroke="rgba(240,178,45,0.63)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <ul className={`${style.footer_links} ${openSection === "shop" ? style.links_open : ""}`}>
                <li><a href="#">All Products</a></li>
                <li><a href="#">Candles</a></li>
                <li><a href="#">Chocolates</a></li>
                <li><a href="#">Gift Kits</a></li>
                <li><a href="#">Custom Candle</a></li>
              </ul>
            </div>
            <div className={`col-md-2`}>
              <div
                className={style.footer_accordion}
                onClick={() => toggleSection("explore")}
              >
                <h4 className={`${style.footer_heading}`}>EXPLORE</h4>
                <svg
                  className={`${style.accordion_arrow} ${openSection === "explore" ? style.accordion_arrow_open : ""}`}
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                >
                  <path d="M4 6L8 10L12 6" stroke="rgba(240,178,45,0.63)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <ul className={`${style.footer_links} ${openSection === "explore" ? style.links_open : ""}`}>
                <li><a href="#">Workshops</a></li>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className={`col-md-4`}>
              <h4 className={`${style.footer_heading}`}>GET EARLY ACCESS</h4>
              <p className={`${style.footer_text}`}>
                Get early access to new collections and <br /> workshops.
              </p>
              <form className={`${style.newsletter_form}`}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`${style.newsletter_input}`}
                />
                <button className={`${style.newsletter_btn}`} type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className={`${style.footer_bottom}`}>
            <p className={`${style.footer_copyright}`}>
              &copy; 2026 Wed. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
