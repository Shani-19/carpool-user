"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SelectComponent from "../common/SelectComponent";
import { products } from "@/data/products";
import { useContextElement } from "@/context/Context";
import Pagination from "../common/Pagination";
import Slider from "rc-slider";
export default function ShopList() {
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const [price, setPrice] = useState([5000, 35000]);
  const handlePrice = (value) => {
    setPrice(value);
  };
  return (
    <section className="cars-section-fourteen layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>Cars for Sale</span>
            </li>
          </ul>
          <h2>Shop List</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="side-bar">
              <div className="categories-box">
                <h6 className="title">Categories</h6>
                <div className="cheak-box">
                  <label className="contain">
                    Accessories (1,456)
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Body Kit (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Interior (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Exterior (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Sound (1,456)
                    <input type="checkbox" defaultChecked="checked" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Fuel Systems (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Wheels (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                  <label className="contain">
                    Oil &amp; Filters (1,456)
                    <input type="checkbox" />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
              <div className="price-box">
                <h6 className="title">Price</h6>
                <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                  <div className="form-column col-lg-6">
                    <div className="form_boxes">
                      <label>Min price</label>
                      <div className="drop-menu">${price[0]}</div>
                    </div>
                  </div>
                  <div className="form-column v2 col-lg-6">
                    <div className="form_boxes">
                      <label>Max price</label>
                      <div className="drop-menu">${price[1]}</div>
                    </div>
                  </div>
                </form>
                <div className="widget-price">
                  <Slider
                    formatLabel={() => ``}
                    range
                    max={50000}
                    min={0}
                    defaultValue={price}
                    onChange={(value) => handlePrice(value)}
                    id="slider"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content-column col-lg-9 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="text-box">
                <div className="text">Showing 1 to 16 of 1559 vehicles</div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form_boxes v3">
                    <small>Best Match</small>

                    <SelectComponent options={["Any Makes", "Audi", "Honda"]} />
                  </div>
                </form>
              </div>
              <div className="row">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="car-block-fourteen col-lg-4 col-md-6 col-sm-6"
                    data-wow-delay={product.wowDelay}
                  >
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image">
                          <Link href={`/shop-single/${product.id}`}>
                            <Image
                              alt={product.title}
                              src={product.imgSrc}
                              width={186}
                              height={186}
                            />
                          </Link>
                        </figure>
                      </div>
                      <div className="content-box">
                        <ul className="rating">
                          {[...Array(5)].map((_, i) => (
                            <li key={i}>
                              <i className="fa fa-star" />
                            </li>
                          ))}
                        </ul>
                        <div className="text">
                          <Link href={`/shop-single/${product.id}`} title="">
                            {product.title}
                          </Link>
                        </div>
                        <h6 className="title">
                          <del>${product.originalPrice}</del>$
                          {product.discountedPrice}
                        </h6>
                        <a
                          onClick={() => addProductToCart(product.id)}
                          className="shoping-btn"
                        >
                          <i className="fa-solid fa-cart-shopping" />
                          {isAddedToCartProducts(product.id)
                            ? "Already Added"
                            : "Add To Cart"}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination-sec">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <Pagination />
                  </ul>
                  <div className="text">Showing results 1-30 of 1,415</div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
