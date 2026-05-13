"use client";
import React from "react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";

import Link from "next/link";
export default function Cart() {
  const { cartProducts, setCartProducts, totalPrice } = useContextElement();
  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((elm) => elm.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);
      item.quantity = quantity;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };
  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };
  return (
    <section className="cart-page layout-radius">
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
          <h2>Shop Cart</h2>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className="cart-table">
              {cartProducts.length ? (
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((elm, i) => (
                      <tr key={i}>
                        <td>
                          <div className="shop-cart-product">
                            <div className="shop-product-cart-img">
                              <Image
                                alt=""
                                width={80}
                                height={80}
                                src={elm.imgSrc}
                              />
                            </div>
                            <div className="shop-product-cart-info">
                              <h3>
                                <Link href={`/shop-single/${elm.id}`} title="">
                                  {elm.title}
                                </Link>
                              </h3>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="price">${elm.discountedPrice}</span>
                        </td>
                        <td>
                          <div className="number">
                            <span
                              className="minus"
                              onClick={() =>
                                setQuantity(elm.id, elm.quantity - 1)
                              }
                            >
                              -
                            </span>
                            <input
                              type="number"
                              value={elm.quantity}
                              min={1}
                              onChange={(e) =>
                                setQuantity(elm.id, e.target.value / 1)
                              }
                            />
                            <span
                              className="plus"
                              onClick={() =>
                                setQuantity(elm.id, elm.quantity + 1)
                              }
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="price">
                            ${elm.discountedPrice * elm.quantity}
                          </span>
                        </td>
                        <td>
                          <a
                            onClick={() => removeItem(elm.id)}
                            className="remove-cart-item"
                          >
                            <Image
                              alt=""
                              width={18}
                              height={18}
                              src="/images/icons/remove.svg"
                            />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="row">
                  <div className="col-6">Your Cart is empty</div>
                  <div className="col-6">
                    <Link href="/shop-list" title="" className="theme-btn-web">
                      Shop Now!
                      <Image
                        alt=""
                        width={14}
                        height={14}
                        src="/images/arrow.svg"
                      />
                    </Link>
                  </div>
                </div>
              )}
              {cartProducts.length ? (
                <div className="cart-table-bottom">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="coupan-form"
                  >
                    <input
                      type="text"
                      name="coupan"
                      required
                      placeholder="Coupon Code"
                    />
                    <button type="submit" className="theme-btn-web">
                      Apply Coupan{" "}
                      <Image
                        alt=""
                        width={14}
                        height={14}
                        src="/images/arrow.svg"
                      />
                    </button>
                  </form>
                  <a href="#" title="" className="theme-btn-web">
                    Update Cart{" "}
                    <Image
                      alt=""
                      width={14}
                      height={14}
                      src="/images/arrow.svg"
                    />
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
            {/*cart-table*/}
          </div>
          <div className="col-lg-3">
            <div className="cart-totals">
              <h3>Cart Totals</h3>
              <table>
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>${totalPrice}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>${totalPrice ? totalPrice + 20 : 0}</td>
                  </tr>
                </tbody>
              </table>
              <a href="#" title="" className="theme-btn-web">
                Proceed to Checkout{" "}
                <Image alt="" width={14} height={14} src="/images/arrow.svg" />
              </a>
            </div>
            {/*cart-totals end*/}
          </div>
        </div>
      </div>
    </section>
  );
}
