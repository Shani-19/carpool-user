"use client";
import SelectComponent from "@/components/common/SelectComponent";
import Link from "next/link";

import React, { useState } from "react";
const categories = ["All", "New", "Used"];

export default function HomeFilter() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <section className="filter-search-section">
      <div className="cus-container10">
        <div className="filter-search-tab">
          <div className="nav nav-tabs search-nav-tab">
            {categories.map((category, index) => (
              <li
                className={
                  selectedCategory == category ? "nav-link active" : "nav-link"
                }
                onClick={() => setSelectedCategory(category)}
                key={index}
              >
                {category}
              </li>
            ))}
          </div>
          <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
            <div className="tab-pane fade show active">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="form-filter-search"
              >
                <div className="form_boxes">
                  <label htmlFor="">Select Makes</label>

                  <SelectComponent options={["Audi", "Honda"]} />
                </div>
                <div className="form_boxes">
                  <label htmlFor="">Select Models</label>

                  <SelectComponent options={["Q7", "Q8"]} />
                </div>
                <div className="form_boxes">
                  <label htmlFor="">Select Year</label>

                  <SelectComponent options={["2023", "2024"]} />
                </div>
                <div className="form_boxes">
                  <label htmlFor="">Select Price</label>
                  <div className="drop-menu">
                    <input type="text" required placeholder="$499 to $956" />
                  </div>
                </div>
                <Link href={`/inventory-list-01`} className="form-submit">
                  <button type="submit" className="theme-btn">
                    <i className="flaticon-search" />
                    Search 9451 Cars
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
