"use client";
import React from "react";
import Image from "next/image";
import {
  carBrands,
  contactItems,
  navItems,
  socialMediaLinks,
  vehicleTypes,
} from "@/data/footerLinks";
import Link from "next/link";
export default function Footer2() {
  return (
    <footer className="boxcar-footer footer-style-four">
      <div className="footer-top">
        <div className="boxcar-container">
          <div className="right-box">
            <div className="top-left wow fadeInUp" data-wow-delay="100ms">
              <h6 className="title">BoxCars</h6>
              <div className="text">
                Excepteur sint occaecat cupidatat non proident, sunt
                <br />
                in culpa qui officia deserunt mollit anim id es
              </div>
              <div className="btn-box">
                <a href="#" className="btn-two">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={26}
                    height={26}
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M17.3333 2.4375H8.66667C7.02325 2.4375 5.6875 3.77325 5.6875 5.41667V20.5833C5.6875 22.2268 7.02325 23.5625 8.66667 23.5625H17.3333C18.9768 23.5625 20.3125 22.2268 20.3125 20.5833V5.41667C20.3125 3.77325 18.9768 2.4375 17.3333 2.4375ZM18.6875 20.5833C18.6875 21.3298 18.0798 21.9375 17.3333 21.9375H8.66667C7.92025 21.9375 7.3125 21.3298 7.3125 20.5833V5.41667C7.3125 4.67025 7.92025 4.0625 8.66667 4.0625H17.3333C18.0798 4.0625 18.6875 4.67025 18.6875 5.41667V20.5833ZM14.8958 6.5C14.8958 6.9485 14.5318 7.3125 14.0833 7.3125H11.9167C11.4682 7.3125 11.1042 6.9485 11.1042 6.5C11.1042 6.0515 11.4682 5.6875 11.9167 5.6875H14.0833C14.5318 5.6875 14.8958 6.0515 14.8958 6.5Z"
                      fill="white"
                    />
                  </svg>
                  +76 956 039 967
                </a>
                <a href="#" className="btn-two">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={26}
                    height={26}
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M20.5833 4.60425H5.41667C3.77325 4.60425 2.4375 5.94 2.4375 7.58341V18.4167C2.4375 20.0602 3.77325 21.3959 5.41667 21.3959H20.5833C22.2268 21.3959 23.5625 20.0602 23.5625 18.4167V7.58341C23.5625 5.94 22.2268 4.60425 20.5833 4.60425ZM20.5833 6.22925C20.6083 6.22925 20.6299 6.24225 20.6538 6.24333L13.8125 11.3751C13.3337 11.7337 12.6653 11.7337 12.1875 11.3751L5.34625 6.24333C5.37117 6.24225 5.39175 6.22925 5.41667 6.22925H20.5833ZM21.9375 18.4167C21.9375 19.1632 21.3298 19.7709 20.5833 19.7709H5.41667C4.67025 19.7709 4.0625 19.1632 4.0625 18.4167V7.58341C4.0625 7.5 4.09608 7.42741 4.11017 7.34833L11.2125 12.6751C11.739 13.0694 12.3695 13.2666 13 13.2666C13.6305 13.2666 14.2621 13.0694 14.7875 12.6751L21.8898 7.34833C21.9039 7.42741 21.9375 7.5 21.9375 7.58341V18.4167Z"
                      fill="white"
                    />
                  </svg>
                  ali@boxcars.com
                </a>
              </div>
            </div>
            <div className="top-right wow fadeInUp" data-wow-delay="100ms">
              <div className="content-box">
                <h6 className="title">Join BoxCar</h6>
                <div className="text">
                  Receive pricing updates, shopping tips &amp; more!
                </div>
              </div>
              <div className="subscribe-form">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  method="post"
                  action="#"
                >
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="email"
                      defaultValue=""
                      placeholder="Your e-mail address"
                      required
                    />
                    <button
                      type="button"
                      className="theme-btn btn-style-one hover-light"
                    >
                      <span className="btn-title">Sign Up</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="widgets-section">
        <div className="boxcar-container">
          <div className="row">
            {/* Footer COlumn */}
            <div className="footer-column-two col-lg-9 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget links-widget wow fadeInUp">
                    <h4 className="widget-title">Useful Links</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {navItems.map((elm, i) => (
                          <li key={i}>
                            <Link href={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="100ms"
                  >
                    <h4 className="widget-title">Quick Links</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {contactItems.map((elm, i) => (
                          <li key={i}>
                            <Link href={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="200ms"
                  >
                    <h4 className="widget-title">Our Brands</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {vehicleTypes.map((elm, i) => (
                          <li key={i}>
                            <Link href={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div
                    className="footer-widget links-widget wow fadeInUp"
                    data-wow-delay="300ms"
                  >
                    <h4 className="widget-title">Vehicles Type</h4>
                    <div className="widget-content">
                      <ul className="user-links style-two">
                        {carBrands.map((elm, i) => (
                          <li key={i}>
                            <Link href={elm.link}>{elm.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* footer column */}
            <div className="footer-column col-lg-3 col-md-12 col-sm-12">
              <div
                className="footer-widget social-widget wow fadeInUp"
                data-wow-delay="400ms"
              >
                <h4 className="widget-title">Vehicles Type</h4>
                <div className="widget-content">
                  <a href="#" className="store">
                    <Image
                      src="/images/resource/apple.png"
                      width={24}
                      height={29}
                      alt=""
                    />
                    <span>Download on the</span>
                    <h6 className="title">Apple Store</h6>
                  </a>
                  <a href="#" className="store two">
                    <Image
                      src="/images/resource/play-2.png"
                      width={23}
                      height={26}
                      alt=""
                    />
                    <span>Get in on</span>
                    <h6 className="title">Google Play</h6>
                  </a>
                  <div className="social-icons">
                    <h6 className="title">Connect With Us</h6>
                    <ul>
                      {socialMediaLinks.map((social, index) => (
                        <li key={index}>
                          <a href={social.link}>
                            <i className={social.iconClass} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Footer Bottom */}
      <div className="footer-bottom">
        <div className="boxcar-container">
          <div className="inner-container">
            <div className="copyright-text wow fadeInUp">
              © <a href="#">2024 Boxcars.com. All rights reserved.</a>
            </div>
            <ul className="footer-nav wow fadeInUp" data-wow-delay="200ms">
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Notice</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
