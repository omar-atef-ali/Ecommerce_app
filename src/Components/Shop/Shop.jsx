import React, { useEffect, useState } from "react"
import style from "./Shop.module.css"
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Shop() {
    const [products, setproducts] = useState([])
    const navigate = useNavigate()
    async function getBestSeller() {

        try {
            let { data } = await api.get(`/Items/best-sellers`);
            console.log(data);
            setproducts(data)




        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        getBestSeller()
    }, []);
    return (
        <>

            <section className={`${style.best_sellers_section}`}>
                <div className={`container ${style.section_container}`}>
                    <div className={`${style.section_header}`}>
                        <h2 className={`${style.section_title}`}>Products</h2>
                        {/* <a className={`${style.section_link}`} href="#">
                            shop Now
                        </a> */}
                    </div>

                    <div>



                        <div className={`row`}>

                            {products?.map((product) => (
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
                                            <div className={style.wish_list}>
                                                <i className="fa-regular fa-heart"></i>
                                            </div>

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