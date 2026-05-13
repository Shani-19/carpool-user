"use client";
import React from "react";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
export default function Checkout() {
  const { cartProducts, totalPrice } = useContextElement();
  return (
    <section className="checkout-section layout-radius">
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
          <h2>Shop Checkout</h2>
        </div>
        <div className="row">
          {/* content-column */}
          <div className="content-column col-lg-8 col-md-12 col-sm-12">
            <div className="inner-column">
              <h6 className="title">Billing details</h6>
              <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                <div className="form-column col-lg-6">
                  <div className="form_boxes">
                    <label>First Name</label>
                    <input required type="text" name="name" placeholder="Ali" />
                  </div>
                </div>
                <div className="form-column col-lg-6">
                  <div className="form_boxes">
                    <label>Last Name</label>
                    <input
                      required
                      type="text"
                      name="last-name"
                      placeholder="Tufan"
                    />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>Company Name</label>

                    <SelectComponent options={["Select", "Select"]} />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>Country / Region *</label>

                    <SelectComponent
                      options={["Select", "pakistan", "america"]}
                    />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>House number and street name</label>
                    <input
                      required
                      type="text"
                      name="addresss"
                      placeholder="Home"
                    />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>Apartment, suite, unit, etc. (optional)</label>
                    <input
                      required
                      type="text"
                      name="addresss2"
                      placeholder="Ali"
                    />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>Town / City *</label>

                    <SelectComponent
                      options={["Select", "pakistan", "america"]}
                    />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>State</label>

                    <SelectComponent options={["Ali Tufan", "Ali Tufan"]} />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>Zip Code</label>
                    <input
                      required
                      type="number"
                      name="zip"
                      placeholder={"02111"}
                    />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>Phone</label>
                    <input
                      required
                      type="number"
                      name="phone"
                      placeholder="+70 8485 283 181"
                    />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <div className="form_boxes">
                    <label>Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Creativelayers088@Gmail.Com"
                    />
                  </div>
                </div>
                <div className="form-column col-lg-12">
                  <h6 className="title">Additional information</h6>
                  <div className="form_boxes v2">
                    <label>Order Notes (optional)</label>
                    <div className="drop-menu">
                      <textarea
                        name="text"
                        placeholder="Lorem Ipsum Dolar Sit Amet"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* side-bar */}
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="side-bar">
              <div className="order-box">
                <h6 className="title">Your order</h6>
                <ul className="order-list">
                  <li>
                    Product<span>Subtotal</span>
                  </li>
                  {cartProducts.map((elm, i) => (
                    <li key={i} className="v2">
                      {elm.title} x{elm.quantity}
                      <span>${elm.discountedPrice.toFixed(2)}</span>
                    </li>
                  ))}

                  <li>
                    Subtotal<span>${totalPrice.toFixed(2)}</span>
                  </li>
                  <li>
                    Shipping<span>${(20).toFixed(2)}</span>
                  </li>
                  <li>
                    Total<span>${(totalPrice + 20).toFixed(2)}</span>
                  </li>
                </ul>
              </div>
              <div className="payment-options">
                <ul>
                  <li>
                    <div className="shipp">
                      <input type="radio" id="c4" name="cc2" />
                      <label htmlFor="c4">
                        <span />
                        <small>Direct Bank Transfer</small>
                      </label>
                    </div>
                    <p>
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      won’t be shipped until the funds have cleared in our
                      account.
                    </p>
                  </li>
                  <li>
                    <div className="shipp">
                      <input type="radio" id="c5" name="cc2" />
                      <label htmlFor="c5">
                        <span />
                        <small>Check Payments</small>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="shipp">
                      <input type="radio" id="c6" name="cc2" />
                      <label htmlFor="c6">
                        <span />
                        <small>Cash on Delivery</small>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="shipp">
                      <input type="radio" id="c7" name="cc2" />
                      <label htmlFor="c7">
                        <span />
                        <small>PayPal</small>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="form-submit">
                <button type="submit" className="theme-btn w-100">
                  Place order{" "}
                  <Image
                    alt=""
                    width={14}
                    height={14}
                    src="/images/arrow.svg"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
