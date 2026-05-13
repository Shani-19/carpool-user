"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { blogPosts3 } from "@/data/blogs";
const navButtons = [
  { label: "Auto Detailing", isActive: true },
  { label: "Car News", isActive: false },
  { label: "Buying Guides", isActive: false },
];

export default function Blogs1() {
  const [activeCategory, setActiveCategory] = useState(navButtons[0].label);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(
      [...blogPosts3].filter((elm) =>
        elm.filterCategories.includes(activeCategory)
      )
    );
  }, [activeCategory]);

  return (
    <section className="blog-section v1 layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>Cars for Sale</span>
            </li>
          </ul>
          <h2>Blog List</h2>
        </div>
        <nav className="wow fadeInUp" data-wow-delay="100ms">
          <div className="nav nav-tabs">
            {navButtons.map(({ label, isActive }, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(label)}
                className={`nav-link ${
                  activeCategory == label ? "active" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
        <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
          <div className="tab-pane fade show active">
            <div className="row">
              {filtered.map((post, index) => (
                <div
                  className="blog-block col-lg-4 col-md-6 col-sm-12"
                  key={index}
                >
                  <div
                    className={`inner-box wow fadeInUp`}
                    data-wow-delay={post.wowDelay}
                  >
                    <div className="image-box">
                      <figure className="image">
                        <Link href={`/blog-single/${post.id}`}>
                          <Image
                            alt=""
                            width={post.width}
                            height={post.height}
                            src={post.src}
                          />
                        </Link>
                      </figure>
                      <span className="date">{post.date}</span>
                    </div>
                    <div className="content-box">
                      <ul className="post-info">
                        <li>{post.author}</li>
                        <li>{post.datePublished}</li>
                      </ul>
                      <h6 className="title">
                        <Link href={`/blog-single/${post.id}`}>
                          {post.title}
                        </Link>
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pagination-sec">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <Pagination />
            </ul>
            <div className="text">Showing results 1-30 of 1,415</div>
          </nav>
        </div>
      </div>
    </section>
  );
}
