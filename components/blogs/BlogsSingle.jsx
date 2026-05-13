"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts6 } from "@/data/blogs";
export default function BlogsSingle({ blogItem }) {
  return (
    <section className="blog-section-five layout-radius">
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
          <h2>{blogItem.title}</h2>
          <ul className="post-info">
            <li>
              <Image
                width={40}
                height={40}
                src="/images/resource/ali-tufan.png"
                alt=""
              />
            </li>
            <li>
              <a href="#" title="">
                Ali Tufan
              </a>
            </li>
            <li>
              <a href="#" title="">
                News
              </a>
            </li>
            <li>April 20, 2023</li>
          </ul>
        </div>
      </div>
      <div className="right-box">
        <div className="large-container">
          <div className="content-box">
            <figure className="outer-image">
              <Image
                alt=""
                width={1700}
                height={600}
                src="/images/resource/inner-blog3-1.jpg"
              />
            </figure>
            <div className="right-box-two">
              <h4 className="title">
                Bringing the culture of sharing to everyone
              </h4>
              <div className="text">
                Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan
                nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci
                congue. Nullam tempus sollicitudin cursus. Ut et adipiscing
                erat. Curabitur this is a text link libero tempus congue.
              </div>
              <div className="text two">
                Duis mattis laoreet neque, et ornare neque sollicitudin at.
                Proin sagittis dolor sed mi elementum pretium. Donec et justo
                ante. Vivamus egestas sodales est, eu rhoncus urna semper eu.
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Integer tristique elit lobortis purus
                bibendum, quis dictum metus mattis. Phasellus posuere felis sed
                eros porttitor mattis. Curabitur massa magna, tempor in blandit
                id, porta in \ ligula. Aliquam laoreet nisl massa, at interdum
                mauris sollicitudin et.
              </div>
              <div className="auther-box">
                <div className="text">
                  Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan
                  nec. Quisque bibendum orci <br />
                  ac nibh facilisis, at malesuada orci congue.
                </div>
                <span className="name">Luis Pickford</span>
              </div>
              <div className="list-sec">
                <h6 className="title">What you'll learn</h6>
                <div className="inner-column">
                  <ul className="list">
                    <li>
                      <i className="fa-solid fa-check" />
                      Become a UI/UX designer.
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      You will be able to start earning money Figma skills.
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Build a UI project from beginning to end.
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Work with colors &amp; fonts.
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      You will create your own UI Kit.
                    </li>
                  </ul>
                  <ul className="list">
                    <li>
                      <i className="fa-solid fa-check" />
                      Build &amp; test a complete mobile app.
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Learn to design mobile apps &amp; websites.
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Design 3 different logos.
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Create low-fidelity wireframe.
                    </li>
                    <li>
                      <i className="fa-solid fa-check" />
                      Downloadable exercise files.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="image-sec">
                <div className="image-box">
                  <figure className="inner-image">
                    <Image
                      alt=""
                      width={924}
                      height={450}
                      src="/images/resource/inner-blog4-1.jpg"
                    />
                  </figure>
                </div>
              </div>
              <div className="list-sec-two">
                <h6 className="title">Requirements</h6>
                <ul className="list-two">
                  <li>
                    We do not require any previous experience or pre-defined
                    skills to take this course. A great orientation
                  </li>
                  <li>would be enough to master UI/UX design.</li>
                  <li>A computer with a good internet connection.</li>
                  <li>Adobe Photoshop (OPTIONAL)</li>
                </ul>
              </div>
              <div className="social-section">
                <div className="inner-column">
                  <ul className="social-icons">
                    <li>Share this post</li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                  <ul className="quality-list">
                    <li>
                      <a href="#">Sound</a>
                    </li>
                    <li>
                      <a href="#">Interior</a>
                    </li>
                    <li>
                      <a href="#">Exterior</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="auther-box-two">
                <Image
                  width={70}
                  height={70}
                  src="/images/resource/auther2-1.png"
                  alt=""
                />
                <div className="content-box">
                  <h6 className="name">Brooklyn Simmons</h6>
                  <span className="designation">Medical Assistant</span>
                  <div className="text">
                    Etiam vitae leo et diam pellentesque porta. Sed eleifend
                    ultricies risus, vel rutrum erat commodo ut. Praesent
                    finibus congue euismod. Nullam scelerisque massa vel augue
                    placerat, a tempor sem egestas. , Curabitur placerat finibus
                    lacus.
                  </div>
                </div>
              </div>
              <div className="ruls-sec">
                <div className="content-box">
                  <h6 className="title">
                    <i className="fa-solid fa-angle-left" />
                    Previous Post
                  </h6>
                  <div className="text">
                    Given Set was without from god divide rule Hath
                  </div>
                </div>
                <div className="content-box v2">
                  <h6 className="title">
                    Next Post
                    <i className="fa-solid fa-angle-right" />
                  </h6>
                  <div className="text">
                    Tree earth fowl given moveth deep lesser After
                  </div>
                </div>
              </div>
              <div className="reviews">
                <h4 className="title">Customer Reviews</h4>
                <div className="content-box">
                  <div className="auther-name">
                    <span>A.T</span>
                    <h6 className="name">Ali Tufan</h6>
                    <small>April 2023</small>
                  </div>
                  <div className="rating-list">
                    <ul className="list">
                      <li>
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                    <span>Take this tour!--its fantastic!</span>
                  </div>
                  <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </div>
                  <div className="image-box">
                    <Image
                      width={130}
                      height={130}
                      src="/images/resource/blog5-4.jpg"
                      alt=""
                    />
                    <Image
                      width={130}
                      height={130}
                      src="/images/resource/blog5-5.jpg"
                      alt=""
                    />
                    <Image
                      width={130}
                      height={130}
                      src="/images/resource/blog5-6.jpg"
                      alt=""
                    />
                  </div>
                  <div className="btn-box">
                    <a href="#" className="like-btn">
                      <i className="fa-solid fa-thumbs-up" />
                      Helpful
                    </a>
                    <a href="#" className="like-btn">
                      <i className="fa-solid fa-thumbs-down" />
                      Not helpful
                    </a>
                  </div>
                </div>
                <div className="content-box two">
                  <div className="auther-name">
                    <span>A.T</span>
                    <h6 className="name">Ali Tufan</h6>
                    <small>April 2023</small>
                  </div>
                  <div className="rating-list">
                    <ul className="list">
                      <li>
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" />
                      </li>
                      <li>
                        <i className="fa fa-star" />
                      </li>
                    </ul>
                    <span>Take this tour!--its fantastic!</span>
                  </div>
                  <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident.
                  </div>
                  <div className="btn-box">
                    <a href="#" className="like-btn">
                      <i className="fa-solid fa-thumbs-up" />
                      Helpful
                    </a>
                    <a href="#" className="like-btn">
                      <i className="fa-solid fa-thumbs-down" />
                      Not helpful
                    </a>
                  </div>
                  <a href="#" className="review">
                    See more reviews
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={14}
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_881_13248)">
                        <path
                          d="M14.1106 0H5.55509C5.34013 0 5.16619 0.173943 5.16619 0.388901C5.16619 0.603859 5.34013 0.777802 5.55509 0.777802H13.1719L0.613453 13.3362C0.461531 13.4881 0.461531 13.7342 0.613453 13.8861C0.689396 13.962 0.788927 14 0.888422 14C0.987917 14 1.08741 13.962 1.16339 13.8861L13.7218 1.3277V8.94447C13.7218 9.15943 13.8957 9.33337 14.1107 9.33337C14.3256 9.33337 14.4996 9.15943 14.4996 8.94447V0.388901C14.4995 0.173943 14.3256 0 14.1106 0Z"
                          fill="#405FF2"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_881_13248">
                          <rect
                            width={14}
                            height={14}
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="Reply-sec">
                <h6 className="title">Leave a Reply</h6>
                <div className="text">
                  Your email address will not be published. Required fields are
                  marked *
                </div>
                <div className="right-box">
                  <div className="rating-list two">
                    <div className="list-box">
                      <span>Comfort</span>
                      <ul className="list">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                    <div className="list-box">
                      <span>Exterior Styling</span>
                      <ul className="list">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                    <div className="list-box">
                      <span>Performance</span>
                      <ul className="list">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="rating-list">
                    <div className="list-box">
                      <span>Interior Design</span>
                      <ul className="list">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                    <div className="list-box">
                      <span>Value For The Money</span>
                      <ul className="list">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                    <div className="list-box">
                      <span>Reliability</span>
                      <ul className="list">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="row">
                <div className="col-lg-6">
                  <div className="form_boxes">
                    <label>Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Ali Tufan"
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
                      placeholder="Creativelayers088@Gmail.Com"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form_boxes">
                    <label>Title</label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Good Cars"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form_boxes v2">
                    <label>Comment</label>
                    <textarea
                      name="message"
                      placeholder="Lorem Ipsum Dolar Sit Amet"
                      required
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-submit">
                    <button type="submit" className="theme-btn">
                      Post Comment
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
        </div>
      </div>
      {/* blog section */}
      <div className="blog-section">
        <div className="boxcar-container">
          <div className="boxcar-title wow fadeInUp">
            <h2>Latest Blog Posts</h2>
          </div>
          <div className="row">
            {/* blog-block */}
            {blogPosts6.map((post, index) => (
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
                        <Image alt="" width={448} height={300} src={post.src} />
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
                      <Link href={`/blog-single/${post.id}`} title="">
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
      {/* End blog-section */}
    </section>
  );
}
