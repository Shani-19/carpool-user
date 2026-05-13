"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
export default function Saved() {
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Saved Search</h3>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur.
              </div>
            </div>
            <div className="search-table">
              <div className="search-table-head">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="search-table-field">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Search Cars eg. Audi Q7"
                    />
                    <Image
                      alt=""
                      src="/images/icons/search.svg"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="text-box">
                    <div className="form_boxes v3">
                      <small>Sort by</small>

                      <SelectComponent
                        options={["Any Makes", "Audi", "Honda"]}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Saved Search Query</th>
                    <th>Number Listings</th>
                    <th>Times</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Q3</td>
                    <td>
                      <span>Year to :2023</span>
                      <span>Mileage to: 2500</span>
                    </td>
                    <td>Listings found 7</td>
                    <td>Daily</td>
                    <td>
                      <a href="#" className="remove-cart-item">
                        <Image
                          alt=""
                          src="/images/icons/remove.svg"
                          width={18}
                          height={18}
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>BMW X5</td>
                    <td>
                      <span>Year to :2023</span>
                      <span>Mileage to: 2500</span>
                    </td>
                    <td>Listings found 7</td>
                    <td>Daily</td>
                    <td>
                      <a href="#" className="remove-cart-item">
                        <Image
                          alt=""
                          src="/images/icons/remove.svg"
                          width={18}
                          height={18}
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Volvo XC40</td>
                    <td>
                      <span>Year to :2023</span>
                      <span>Mileage to: 2500</span>
                    </td>
                    <td>Listings found 7</td>
                    <td>Daily</td>
                    <td>
                      <a href="#" className="remove-cart-item">
                        <Image
                          alt=""
                          src="/images/icons/remove.svg"
                          width={18}
                          height={18}
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/*search-table*/}
          </div>
        </div>
      </div>
    </section>
  );
}
