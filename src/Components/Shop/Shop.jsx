import React, { useEffect, useState } from "react"
import style from "./Shop.module.css"
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Shop() {
    const [products, setproducts] = useState([])
    const [activeFilter, setActiveFilter] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    async function getBestSeller() {

        try {
            let { data } = await api.get(`/Items`);
            console.log(data);
            setproducts(data)




        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }

   
    useEffect(() => {
        getBestSeller()
    }, []);

    const filteredProducts = activeFilter === 'all'
        ? products
        : products.filter(product => product.type === activeFilter);

    if (isLoading) {
        return (
            <div className={style.loadingOverlay}>
                <div className={style.spinner}></div>
            </div>
        );
    }

    return (
        <>

            <section className={`${style.best_sellers_section}`}>
                <div className={`container ${style.section_container}`}>
                    <div className={`${style.section_header}`}>
                        <h2 className={`${style.section_title}`}>Products</h2>
                        <div className={style.filters}>
                            <button
                                className={`${style.filter_btn} ${activeFilter === 'all' ? style.active_filter : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                {activeFilter === 'all' && <i className="fa-solid fa-check"></i>} All
                            </button>
                            <button
                                className={`${style.filter_btn} ${activeFilter === 'Candles' ? style.active_filter : ''}`}
                                onClick={() => setActiveFilter('Candles')}
                            >
                                {activeFilter === 'Candles' && <i className="fa-solid fa-check"></i>} Candles
                            </button>
                            <button
                                className={`${style.filter_btn} ${activeFilter === 'Chocolates' ? style.active_filter : ''}`}
                                onClick={() => setActiveFilter('Chocolates')}
                            >
                                {activeFilter === 'Chocolates' && <i className="fa-solid fa-check"></i>} Chocolates
                            </button>
                        </div>
                    </div>

                    <div>



                        <div className={`row`}>

                            {filteredProducts?.map((product) => (
                                <div key={product.id} className={`col-md-3 ${style.product_card}`}>
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

                            ))}

                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}