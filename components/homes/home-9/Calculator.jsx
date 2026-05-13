"use client";
import React from "react";
import Image from "next/image";
import SelectComponent from "@/components/common/SelectComponent";
export default function Calculator() {
  return (
    <section className="calculator-section-home9">
      <div className="boxcar-container">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-12">
            <div className="box-loan-calc">
              <div className="boxcar-title">
                <h2>Auto Loan Calculator</h2>
                <p>
                  Use this car payment calculator to estimate monthly payments
                  on your next new or used auto loan.{" "}
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="box-ip">
                  <div className="form_boxes">
                    <label>Vehicle Price ($)</label>
                    <div className="drop-menu">
                      <input
                        type="text"
                        required
                        name="gender"
                        defaultValue="45$"
                      />
                    </div>
                  </div>
                  <div className="form_boxes">
                    <label>Interest Rate</label>
                    <div className="drop-menu">
                      <input
                        type="text"
                        required
                        name="gender"
                        defaultValue={5}
                      />
                    </div>
                  </div>
                  <div className="form_boxes">
                    <label>Period (months)</label>

                    <SelectComponent options={["36", "40", "45", "", "", ""]} />
                  </div>
                  <div className="form_boxes">
                    <label>Down Payment</label>
                    <div className="drop-menu">
                      <input
                        type="text"
                        required
                        name="gender"
                        defaultValue="$45.000"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-submit">
                  <button type="submit" className="theme-btn">
                    Calculate{" "}
                    <Image
                      alt=""
                      src="/images/arrow.svg"
                      width={14}
                      height={14}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
