import React from "react";
import Image from "next/image";
import { blogPosts4 } from "@/data/blogs";
import Link from "next/link";
export default function Blogs2() {
  return (
    <section className="blog-section-four layout-radius">
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
        <div className="row">
          <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
            <div className="inner-column-two">
              {blogPosts4.map((post, index) => (
                <div key={index} className="blog-block-four">
                  <div className="inner-box wow fadeInUp">
                    <div className="image-box">
                      <figure className="image">
                        <Link href={`/blog-single/${post.id}`}>
                          <Image
                            alt={post.alt}
                            width={400}
                            height={400}
                            src={post.imgSrc}
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
                      <div className="text">{post.text}</div>
                      <Link
                        href={`/blog-single/${post.id}`}
                        className="btn-two"
                      >
                        Read More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_659_14687)">
                            <path
                              d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                              fill="#050B20"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_659_14687">
                              <rect width={14} height={14} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
            <div className="sider-bar">
              {/* categories-sec */}
              <div className="categories-sec">
                <h6 className="widget-title">Categories</h6>
                <ul className="categories-list">
                  <li>
                    <a href="#">Accessories (1,456)</a>
                  </li>
                  <li>
                    <a href="#">Body Kit (1,456)</a>
                  </li>
                  <li>
                    <a href="#">Interior (1,456)</a>
                  </li>
                  <li>
                    <a href="#">Exterior (1,456)</a>
                  </li>
                  <li>
                    <a href="#">Sound (1,456)</a>
                  </li>
                  <li>
                    <a href="#">Fuel Systems (1,456)</a>
                  </li>
                  <li>
                    <a href="#">Wheels (1,456)</a>
                  </li>
                  <li>
                    <a href="#">Oil &amp; Filters (1,456)</a>
                  </li>
                </ul>
              </div>
              {/* recent-post-sec */}
              <div className="recent-post-sec">
                <h6 className="widget-title">Recent Posts</h6>
                {/* pos-block */}
                <div className="pos-block">
                  <div className="inner-box">
                    <Image
                      width={70}
                      height={70}
                      src="/images/resource/post1-1.jpg"
                      alt=""
                    />
                    <div className="content-box">
                      <h6 className="title">
                        <a href="#">
                          Battle of the SUVs - Kia Sportage vs Hyundai Tuc...
                        </a>
                      </h6>
                      <span>December 2, 2023</span>
                    </div>
                  </div>
                </div>
                {/* pos-block */}
                <div className="pos-block">
                  <div className="inner-box">
                    <Image
                      width={70}
                      height={70}
                      src="/images/resource/post1-2.jpg"
                      alt=""
                    />
                    <div className="content-box">
                      <h6 className="title">
                        <a href="#">The Best Car Boot Sales In London</a>
                      </h6>
                      <span>December 2, 2023</span>
                    </div>
                  </div>
                </div>
                {/* pos-block */}
                <div className="pos-block">
                  <div className="inner-box">
                    <Image
                      width={70}
                      height={70}
                      src="/images/resource/post1-3.jpg"
                      alt=""
                    />
                    <div className="content-box">
                      <h6 className="title">
                        <a href="#">
                          What is Engine <br />
                          Remapping?
                        </a>
                      </h6>
                      <span>December 2, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* tag-section */}
              <div className="tag-sec">
                <h6 className="widget-title">Tags</h6>
                <ul className="tag-list">
                  <li>
                    <a href="#">Sound</a>
                  </li>
                  <li>
                    <a href="#">Interior</a>
                  </li>
                  <li>
                    <a href="#">Exterior</a>
                  </li>
                  <li>
                    <a href="#">Fuel System</a>
                  </li>
                  <li>
                    <a href="#">Wheels</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
