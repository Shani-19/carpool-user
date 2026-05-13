"use client";
import React from "react";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
export default function DropdownFilter() {
  return (
    <section className="inventory-pager style-1">
      <div className="boxcar-container">
        <form onSubmit={(e) => e.preventDefault()} className="inventory-form">
          <div className="form_boxes line-r">
            <SelectComponent options={["Used Cars", "Audi", "Honda"]} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={["Any Makes", "Audi", "Honda"]} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={["Any Models", "A3", "Accord"]} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={["Any Price", "200$", "300$"]} />
          </div>
          <div className="form_boxes">
            <a href="#" title="" className="filter-popup">
              <Image
                alt=""
                src="/images/icons/filter.svg"
                width={24}
                height={24}
              />
              More Filters
            </a>
          </div>
          <div className="form-submit">
            <button type="submit" className="theme-btn">
              <i className="flaticon-search" />
              Search 9451 Cars
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
