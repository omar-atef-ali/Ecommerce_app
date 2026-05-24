
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import style from "./Home.module.css";
import api from "../../api";
import img0 from "../../assets/bubble candles!.jpg"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import curatedimg from "../../assets/photo-1592903297149-37fb25202dfa.jpg"


export default function Home() {
  const navigate = useNavigate()

  const [currentSlide, setCurrentSlide] = useState(0);
  const [AllCategories, setAllCategories] = useState([]);
  const [homeSliders, setHomeSliders] = useState([]);

  // Swiper 1
  const bestPrevRef = useRef(null);
  const bestNextRef = useRef(null);

  // Swiper 2
  const pickedPrevRef = useRef(null);
  const pickedNextRef = useRef(null);
  const [imageHovered, setImageHovered] = useState(false);

  // Scroll Animation for Categories
  const categoriesRef = useRef(null);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  // Scroll Animation for Curated Section
  const curatedRef = useRef(null);
  const [curatedVisible, setCuratedVisible] = useState(false);

  useEffect(() => {
    if (categoriesVisible) return;
    if (AllCategories.length === 0) return;

    // Delay registration by 1 second to let Swiper and async content render and settle heights
    const timer = setTimeout(() => {
      if (!categoriesRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setCategoriesVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0, rootMargin: '100px' }
      );

      observer.observe(categoriesRef.current);
    }, 1000);

    return () => clearTimeout(timer);
  }, [AllCategories, categoriesVisible]);

  useEffect(() => {
    if (curatedVisible) return;
    if (AllCategories.length === 0) return;

    const timer = setTimeout(() => {
      if (!curatedRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setCuratedVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0, rootMargin: '100px' }
      );

      observer.observe(curatedRef.current);
    }, 1000);

    return () => clearTimeout(timer);
  }, [AllCategories, curatedVisible]);



  const [products, setproducts] = useState([])
  const [pickedData, setpickedData] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  const nextSlide = () => {
    if (homeSliders.length > 0) setCurrentSlide((prev) => (prev + 1) % homeSliders.length);
  };
  const prevSlide = () => {
    if (homeSliders.length > 0) setCurrentSlide((prev) => (prev - 1 + homeSliders.length) % homeSliders.length);
  };
  const goToSlide = (index) => setCurrentSlide(index);

  useEffect(() => {
    if (homeSliders.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeSliders.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [homeSliders.length]);


  async function getSliders() {

    try {
      let { data } = await api.get(`/HomeSliders`);
      console.log(data);
      setHomeSliders(data.filter(slide => slide.isActive))
    } catch (error) {
      console.log(error);

    }

  }


  async function getBestSeller() {

    try {
      let { data } = await api.get(`/Items/best-sellers`);
      // console.log(data);
      setproducts(data)




    } catch (error) {
      console.log(error);

    }

  }
  async function getpicked() {

    try {
      let { data } = await api.get(`/Items/picked-for-you`);
      // console.log(data);
      setpickedData(data)



    } catch (error) {
      console.log(error);

    }

  }

  async function categories() {
    try {
      const { data } = await api.get(`/Categories`)
      // console.log(data);
      setAllCategories(data);
    } catch (err) {
      console.log(err);
    }
  }





  useEffect(() => {
    async function loadData() {
      try {
        await Promise.all([
          getBestSeller(),
          getpicked(),
          categories(),
          getSliders()
        ]);
      } catch (error) {
        console.error("Error loading home data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className={style.loadingOverlay}>
        <div className={style.spinner}></div>
      </div>
    );
  }

  return (
    <>


      <section className={style.heroSection}>
        {homeSliders.map((slide, index) => (

          <React.Fragment key={slide.id}>
            <div
              className={style.heroImageContainer}
              style={{
                opacity: currentSlide === index ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: currentSlide === index ? 1 : 0
              }}
            >
              <img
                src={slide.mediaURL?.startsWith("http") ? slide.mediaURL : `https://wedd.runasp.net${slide.mediaURL?.startsWith("/") ? "" : "/"}${slide.mediaURL}`}
                alt={slide.title}
                className={style.heroImage}
              />
              <div className={style.heroOverlayGradient}></div>
              <div className={style.heroOverlayTint}></div>
            </div>


            <div className={`${style.heroContent} ${currentSlide === index ? style.activeSlide : ''}`} style={{ opacity: currentSlide === index ? 1 : 0, transition: 'opacity 0.8s ease-in-out', zIndex: currentSlide === index ? 2 : 0 }}>
              <h1 className={style.heroTitle}>{slide.title}</h1>
              <p className={style.heroSubtitle}>
                {slide.subTitle}
              </p>
              <a href="/shop" className={`  ${style.heroBtn}`}>
                {slide.buttonText || "Shop Now"}
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
          </React.Fragment>
        ))}

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
          {homeSliders.map((slide, index) => (
            <span
              key={slide.id}
              className={`${style.indicator} ${currentSlide === index ? style.active : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
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
                spaceBetween={20}
                slidesPerView={1}
                speed={1100}
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
                          {/* <video
                            className={`${style.product_image} ${style.product_image_hover}`}
                            src={`https://wedd.runasp.net${product.secondaryMedia.url}`}
                            muted
                            loop
                            playsInline
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => e.target.pause()}
                          /> */}
                          {product.secondaryMedia?.url && (
                            <video
                              className={`${style.product_image} ${style.product_image_hover}`}
                              muted
                              loop
                              autoPlay
                              playsInline
                            >
                              <source
                                src={`https://wedd.runasp.net${product.secondaryMedia.url}`}
                                type="video/mp4"
                              />
                            </video>
                          )}

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
                          {/* <div className={style.wish_list}>
                            <i className="fa-regular fa-heart"></i>
                          </div> */}

                          <div className={style.option_btn}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(`/productdetails/${product.id}`);
                              }}
                            >
                              Select option
                            </button>
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

      {/* <!-- Featured Categories --> */}
      <section ref={categoriesRef} className={style.featuredCategoriesSection}>
        <div className={`container-fluid ${style.sectionContainer}`}>
          <div className="row justify-content-center" style={{ gap: '32px' }}>
            {AllCategories.map((category, index) =>

              <div
                key={category.id}
                className={`col-12 col-md-5 ${categoriesVisible ? style.cardVisible : style.cardHidden}`}
                style={{ transitionDelay: `${index * 0.70}s` }}
              >
                <div className={style.categoryCard}>
                  <div className={style.categoryImageWrapper}>
                    <img
                      src={category.mediaURL?.startsWith("http") ? category.mediaURL : `https://wedd.runasp.net${category.mediaURL?.startsWith("/") ? "" : "/"}${category.mediaURL}`}
                      alt={category.name || "Category"}
                      className={style.categoryImage}
                    />
                  </div>
                  <h3 className={style.categoryTitle}>{category.name}</h3>
                  <a href="/shop" className={style.categoryBtn}>Shop {category.name}</a>
                </div>
              </div>
            )}



          </div>
        </div>
      </section>

      <section ref={curatedRef} className={style.curatedSection}>
        <div className="container-fluid p-0 overflow-hidden">
          <div className="row m-0 g-4 align-items-center">
            <div className="col-12 col-md-6 px-0">
              <div className={style.curatedImageWrapper}>
                <img
                  src={curatedimg}
                  alt="Curated Gift Box"
                  className={`${style.curatedImage} ${curatedVisible ? style.imageVisible : style.imageHidden}`}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <div className={style.curatedContent}>
                <span className={`${style.curatedEyebrow} ${curatedVisible ? style.textVisible : style.textHidden}`} style={{ transitionDelay: '0.3s' }}>CURATED FOR EVERY OCCASION</span>
                <h2 className={`${style.curatedTitle} ${curatedVisible ? style.textVisible : style.textHidden}`} style={{ transitionDelay: '0.6s' }}>A Gift That Means<br />Something</h2>
                <p className={`${style.curatedDescription} ${curatedVisible ? style.textVisible : style.textHidden}`} style={{ transitionDelay: '0.9s' }}>
                  Every kit is assembled with intention — candles and chocolates that together create a memory worth keeping. For every occasion, big or small.
                </p>
                <a href="#" className={`${style.curatedBtn} ${curatedVisible ? style.textVisible : style.textHidden}`} style={{ transitionDelay: '1.2s' }}>
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

      {/* <!-- Featured Product - Chocolates --> */}
      {/* <section class="featured-section chocolates-section">
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
      </section> */}

      {/* <!-- Gift Kits Section --> */}
      {/* <section class="gift-kits-section">
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
              spaceBetween={20}
              slidesPerView={1}
              speed={1100}
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
                        {/* <video
                          className={`${style.product_image} ${style.product_image_hover}`}
                          src={`https://wedd.runasp.net${product.secondaryMedia.url}`}
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                        /> */}
                        {product.secondaryMedia?.url && (
                          <video
                            className={`${style.product_image} ${style.product_image_hover}`}
                            muted
                            loop
                            autoPlay
                            playsInline
                          >
                            <source
                              src={`https://wedd.runasp.net${product.secondaryMedia.url}`}
                              type="video/mp4"
                            />
                          </video>
                        )}

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

                        {/* <div className={style.wish_list}>
                          <i className="fa-regular fa-heart"></i>
                        </div> */}

                        <div className={style.option_btn}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigate(`/productdetails/${product.id}`);
                            }}
                          >
                            Select option
                          </button>
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
            style={{ backgroundImage: "url('/staticphoto.jfif')" }}
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
        <h3>"Born from the desire to gite warmth in — every <br /> form. "</h3>
        <div className={`${style.ourstory_link}`}>
          <a href="/ourStory" className={`${style.section_link}`}>Our Story </a>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </section>


    </>
  );
}
