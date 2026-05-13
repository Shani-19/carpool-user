"use client";
import React from "react";
import Image from "next/image";
import SelectComponent from "@/components/common/SelectComponent";
export default function Calculator() {
  return (
    <section className="calculater-section pt-0 v2">
      <div className="boxcar-container">
        <div className="right-box">
          <div className="row">
            <div className="col-lg-6 image-column">
              <div className="image-box">
                <Image
                  alt=""
                  src="/images/resource/loan-img.jpg"
                  width={886}
                  height={700}
                />
              </div>
            </div>
            <div className="col-lg-6 content-column">
              <div className="inner-column">
                <div className="boxcar-title white">
                  <h2>Auto Loan Calculator</h2>
                  <p>
                    Use this car payment calculator to estimate monthly payments
                    on your next new or used auto loan.
                  </p>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="row">
                  <div className="col-lg-6">
                    <div className="form_boxes">
                      <label>Vehicle Price ($)</label>

                      <SelectComponent options={["45$", "$45", "$50"]} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form_boxes">
                      <label>Interest Rate</label>

                      <SelectComponent options={["5", "10", "15"]} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form_boxes">
                      <label>Period (months)</label>

                      <SelectComponent options={["36", "40", "45"]} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form_boxes">
                      <label>Down Payment</label>

                      <SelectComponent
                        options={["$45.000", "$45.000", "$50.000"]}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-submit">
                      <button type="submit" className="theme-btn">
                        Calculate
                        <Image
                          alt=""
                          src="/images/arrow.svg"
                          width={14}
                          height={14}
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
