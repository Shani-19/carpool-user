"use client";
import React from "react";

export default function LoanCalculator() {
  return (
    <section className="contact-us-section v2 layout-radius">
      <div className="boxcar-container">
        {/* calculater-section */}
        <div className="calculater-sec">
          <div className="right-box">
            <div className="row">
              {/* content-column */}
              <div className="col-lg-7 content-column">
                <div className="inner-column">
                  <div className="boxcar-title">
                    <h2>Get In Touch</h2>
                    <p>
                      Use our loan calculator to calculate payments over the
                      life of your loan. Enter your information to see how much
                      your monthly payments could be. You can adjust length of
                      loan, down payment and interest rate to see how those
                      changes raise or lower your payments.
                    </p>
                  </div>
                  <form onSubmit={(e) => e.preventDefault()} className="row">
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>First Name</label>
                        <input
                          required
                          type="text"
                          name="name"
                          placeholder="Ali"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>First Name</label>
                        <input
                          required
                          type="text"
                          name="name"
                          placeholder="Tufan"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Email</label>
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="Creativelayers088@gmail.Com"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Phone</label>
                        <input
                          required
                          type="number"
                          name="number"
                          placeholder="+90 47458 27 3287 12"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-submit">
                        <button type="submit" className="theme-btn v2">
                          Calculate
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* contact-column */}
              <div className="contact-block col-lg-5 col-md-12 col-sm-12">
                <div className="inner-box">
                  <div className="content-box">
                    <h6 className="title">Monthly Payment</h6>
                    <span>$45.000</span>
                  </div>
                  <div className="content-box">
                    <h6 className="title">Total Interest</h6>
                    <span>$45.000</span>
                  </div>
                  <div className="content-box">
                    <h6 className="title">Total Payments</h6>
                    <span>$45.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End calculater-section */}
      </div>
    </section>
  );
}
