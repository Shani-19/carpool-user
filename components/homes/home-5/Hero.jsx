"use client";
import React from "react";
import Image from "next/image";
import SelectComponent from "@/components/common/SelectComponent";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="boxcar-banner-section-five">
      <div className="banner-content-three">
        <div className="boxcar-container">
          <div className="banner-content">
            <span className="wow fadeInUp">
              Find cars for sale and for rent near you
            </span>
            <h2 className="wow fadeInUp" data-wow-delay="100ms">
              Find Your Perfect Car
            </h2>
            <div className="form-tabs wow fadeInUp" data-wow-delay="200ms">
              <div className="form-tab-pane current" id="tab-1">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form_boxes">
                    <SelectComponent options={["Used Cars", "Audi", "Honda"]} />
                  </div>
                  <div className="form_boxes">
                    <SelectComponent options={["Any Makes", "A3", "Accord"]} />
                  </div>
                  <div className="form_boxes">
                    <SelectComponent options={["Any Models", "200$", "300$"]} />
                  </div>
                  <div className="form_boxes">
                    <SelectComponent options={["Any Price", "200$", "300$"]} />
                  </div>
                  <Link href={`/inventory-list-01`} className="form-submit">
                    <button type="submit" className="theme-btn">
                      <i className="flaticon-search" />
                    </button>
                  </Link>
                </form>
              </div>
            </div>
            <div className="image-column">
              <div className="image-box">
                <figure className="image">
                  <Link href={`/inventory-list-01`}>
                    <Image
                      alt=""
                      src="/images/banner/banner5-1.png"
                      width={1216}
                      height={738}
                    />
                  </Link>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
