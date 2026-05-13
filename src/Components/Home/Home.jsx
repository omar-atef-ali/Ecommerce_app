import React, { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import style from "./Home.module.css";
import img0 from "../../assets/bubble candles!.jpg"
import img2 from "../../assets/Immerse yourself in the ambiance of our Aesthetic….jpg"
import img3 from "../../assets/download.webp"
import api from "../../api"
export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [AllCategories, setAllCategories] = useState([]);

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

  const products = [
    {
      id: 1,
      name: "Amber Oud",
      minPrice: "EGP 180",
      image: "/candels.webp",
      hoverVideo: "/vidcandels.mp4",
      badges: [
        { label: "ONLY 3 LEFT", type: "limited" },
        { label: "BESTSELLER", type: "bestseller" },
      ],
    },
    {
      id: 2,
      name: "Velvet Rose",
      minPrice: "EGP 210",
      image: "/candels.webp",
      hoverVideo: "/vidcandels.mp4",
      badges: [{ label: "BESTSELLER", type: "bestseller" }],
    },
    {
      id: 3,
      name: "Cedar Noir",
      minPrice: "EGP 195",
      image: "/candels.webp",
      hoverVideo: "/vidcandels.mp4",
      badges: [{ label: "NEW", type: "new" }],
    },
    {
      id: 4,
      name: "White Musk",
      minPrice: "EGP 175",
      image: "/candels.webp",
      hoverVideo: "/vidcandels.mp4",
      badges: [{ label: "ONLY 2 LEFT", type: "limited" }],
    },
    {
      id: 5,
      name: "Sandalwood Dusk",
      minPrice: "EGP 220",
      image: "/candels.webp",
      hoverVideo: "/vidcandels.mp4",
      badges: [{ label: "BESTSELLER", type: "bestseller" }],
    },
    {
      id: 6,
      name: "Citrus Bloom",
      minPrice: "EGP 165",
      image: "/candels.webp",
      hoverVideo: "/vidcandels.mp4",
      badges: [],
    },
  ];


  async function categories() {
    try {
      const { data } = await api.get(`/Categories`)
      console.log(data);
      setAllCategories(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    categories();
  }, []);

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

            <Swiper
              modules={[Navigation]}
              loop={true}
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
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className={`${style.product_card}`}>
                    <div className={style.image_wrapper}>
                      <a
                        className={style.product_image_link}
                        href="#"

                      >
                        <img
                          src={product.image}
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
                          src={product.hoverVideo}
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                        />

                        {product.badges.length > 0 && (
                          <div className={style.product_badges}>
                            {product.badges.map((badge, i) => (
                              <span
                                key={i}
                                className={`${style.badge_base} ${badge.type === "limited"
                                  ? style.badge_limited
                                  : badge.type === "new"
                                    ? style.badge_new
                                    : style.badge_bestseller
                                  }`}
                              >
                                {badge.label}
                              </span>
                            ))}
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

      {/* <!-- Featured Categories --> */}
      <section className={style.featuredCategoriesSection}>
        <div className={`container-fluid ${style.sectionContainer}`}>
          <div className="row justify-content-center" style={{ gap: '32px' }}>
            {AllCategories.map((category) =>

              <div key={category.id} className="col-12 col-md-5">
                <div className={style.categoryCard}>
                  <img
                    src={category.mediaURL?.startsWith("http") ? category.mediaURL : `https://wedd.runasp.net${category.mediaURL?.startsWith("/") ? "" : "/"}${category.mediaURL}`}
                    alt={category.name || "Category"}
                    className={style.categoryImage}
                  />
                  <h3 className={style.categoryTitle}>{category.name}</h3>
                  <a href="#" className={style.categoryBtn}>Shop {category.name}</a>
                </div>
              </div>
            )}



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

      {/* <!-- Best Sellers Section --> */}
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
              loop={true}
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
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className={`${style.product_card}`}>
                    <div className={style.image_wrapper}>
                      <a
                        className={style.product_image_link}
                        href="#"

                      >
                        <img
                          src={product.image}
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
                          src={product.hoverVideo}
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => e.target.pause()}
                        />

                        {product.badges.length > 0 && (
                          <div className={style.product_badges}>
                            {product.badges.map((badge, i) => (
                              <span
                                key={i}
                                className={`${style.badge_base} ${badge.type === "limited"
                                  ? style.badge_limited
                                  : badge.type === "new"
                                    ? style.badge_new
                                    : style.badge_bestseller
                                  }`}
                              >
                                {badge.label}
                              </span>
                            ))}
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
          <i className="fa-solid fa-arrow-right"></i>
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
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
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
