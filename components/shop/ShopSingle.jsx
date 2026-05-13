"use client";
import { useEffect, useRef, useState } from "react";
import RelatedCars from "./RelatedCars";
import Slider from "react-slick";
import Image from "next/image";
import Review from "./sections/Review";
import Ratings from "./sections/Ratings";
import Replay from "./sections/Replay";
import CommentForm from "./sections/CommentForm";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
export default function ShopSingle({ product }) {
  const [value, setValue] = useState(1);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  const slickThumbOptions = {
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,

    dots: false,
    focusOnSelect: true,
    arrows: false,
    vertical: true,
    variableWidth: true,
  };
  const slickOptions = {
    autoplay: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    arrows: false,
    fade: false,
    dots: false,
  };
  const { cartProducts, setCartProducts } = useContextElement();
  const [quantity, setQuantity] = useState(1);

  const isIncludeCard = () => {
    const item = cartProducts.filter((elm) => elm.id == product.id)[0];
    return item;
  };
  const setQuantityCartItem = (id, quantity) => {
    if (isIncludeCard()) {
      if (quantity >= 1) {
        const item = cartProducts.filter((elm) => elm.id == id)[0];
        const items = [...cartProducts];
        const itemIndex = items.indexOf(item);
        item.quantity = quantity;
        items[itemIndex] = item;
        setCartProducts(items);
      }
    } else {
      setQuantity(quantity - 1 ? quantity : 1);
    }
  };
  const addToCart = () => {
    if (!isIncludeCard()) {
      const item = product;
      item.quantity = quantity;
      setCartProducts((pre) => [...pre, item]);
    }
  };

  return (
    <section className="cars-section-fifteen layout-radius">
      <div className="shop-c-box">
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
            <h2>Shop Single</h2>
          </div>
          <div className="row">
            <div className="image-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <Slider
                  {...slickThumbOptions}
                  infinite={false}
                  asNavFor={nav2}
                  ref={(slider) => (sliderRef1 = slider)}
                  className="shop-single-thumbs-slider"
                >
                  <div className="shop-single-thumb">
                    <div className="thumb-img">
                      <Image
                        alt=""
                        src="/images/resource/shop-thumb1.png"
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                  <div className="shop-single-thumb">
                    <div className="thumb-img">
                      <Image
                        alt=""
                        src="/images/resource/shop-thumb2.png"
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                  <div className="shop-single-thumb">
                    <div className="thumb-img">
                      <Image
                        alt=""
                        src="/images/resource/shop-thumb3.png"
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                </Slider>
                {/*shop-single-thumbs-slider*/}
                <Slider
                  {...slickOptions}
                  asNavFor={nav1}
                  infinite={false}
                  ref={(slider) => (sliderRef2 = slider)}
                  className="shop-single-product-slider"
                >
                  <div className="shop-single-product-slide">
                    <Image
                      alt=""
                      src="/images/resource/shop-single.png"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="shop-single-product-slide">
                    <Image
                      alt=""
                      src="/images/resource/shop-single.png"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="shop-single-product-slide">
                    <Image
                      alt=""
                      src="/images/resource/shop-single.png"
                      width={400}
                      height={400}
                    />
                  </div>
                </Slider>
                {/*shop-single-product-slider*/}
              </div>
            </div>
            <div className="content-column col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column">
                <h2>Kit Brembo DT BMW</h2>
                <span className="price">
                  $399<del>$699</del>
                </span>
                <small>
                  <i className="fa-solid fa-check" />
                  432 in stock
                </small>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tempus nulla faucibus viverra nisl non senectus tortor.
                </div>
                <div className="btn-box">
                  <div className="number">
                    <span
                      className="minus"
                      onClick={() =>
                        setQuantityCartItem(
                          product.id,
                          isIncludeCard()?.quantity - 1 || quantity - 1
                        )
                      }
                    >
                      -
                    </span>
                    <input
                      type="number"
                      min={1}
                      onChange={(e) => setValue(e.target.value / 1)}
                      value={
                        isIncludeCard() ? isIncludeCard().quantity : quantity
                      }
                    />
                    <span
                      className="plus"
                      onClick={() =>
                        setQuantityCartItem(
                          product.id,
                          isIncludeCard()?.quantity + 1 || quantity + 1
                        )
                      }
                    >
                      +
                    </span>
                  </div>
                  {isIncludeCard() ? (
                    <Link href={`/cart`} className="shoping-btn">
                      <i className="fa-solid fa-cart-shopping" />
                      View Cart
                    </Link>
                  ) : (
                    <a onClick={() => addToCart()} className="shoping-btn">
                      <i className="fa-solid fa-cart-shopping" />
                      Add to Cart
                    </a>
                  )}
                </div>
                <ul className="list">
                  <li>
                    <span>Sku:</span>RTA-0058
                  </li>
                  <li>
                    <span>Category:</span>Oil &amp; Filters, Parts
                  </li>
                  <li>
                    <span>Tags:</span>dealership, motors, parts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-sec">
        <div className="boxcar-container">
          <div className="right-box one">
            <div className="row">
              <div className="tab-column col-lg-4 col-md-4 col-sm-12">
                <div className="inner-column">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Description
                      </button>
                      <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Review
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="content-column col-lg-8 col-md-8 col-sm-12">
                <div className="inner-column">
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      {/* description-sec */}
                      <div className="description-sec">
                        <h4 className="title">Details</h4>
                        <div className="text two">
                          {" "}
                          This model is offered in sizes 17 to 20 inches with
                          widths ranging from 8 to 11 inches. Each wheel has an
                          approximate weight of 17.19lbs to 22.94lbs. Neque
                          porro quisquam est, qui dolorem ipsum quia dolor sit
                          amet, consectetur, adipisci velit, sed quia non
                          numquam eius modi tempora incidunt ut labore et dolore
                          magnam aliquam quaerat voluptatem.
                        </div>
                        <div className="text">
                          Ut enim ad minima veniam, quis nostrum exercitationem
                          ullam corporis suscipit laboriosam, nisi ut aliquid ex
                          ea commodi consequatur.
                        </div>
                      </div>
                      {/* features-sec */}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <div className="reviews">
                        <Ratings />
                      </div>
                      <div className="Reply-sec">
                        <Replay />
                      </div>
                      <CommentForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* cars-section-fourteen */}
      <RelatedCars />
      {/* End cars-section-fourteen */}
    </section>
  );
}
