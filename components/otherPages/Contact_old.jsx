"use client";
import React from "react";
import Image from "next/image";
import { officeLocations } from "@/data/officeLocations ";
import Link from "next/link";
export default function Contact() {
  return (
    <section className="contact-us-section layout-radius">
      <div className="boxcar-container">
        {/* boxcar-title */}
        <div className="boxcar-title-three wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <span>Cars for Sale</span>
            </li>
          </ul>
          <h2>Contact Us</h2>
        </div>
        {/* End section title */}
        {/* map-sec */}
        <div className="map-sec">
          <div className="goole-iframe">
            <iframe src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe>
          </div>
        </div>
        {/* End map-section */}
        {/* calculater-section */}
        <div className="calculater-sec">
          <div className="right-box">
            <div className="row">
              {/* content-column */}
              <div className="col-lg-6 content-column">
                <div className="inner-column">
                  <div className="boxcar-title">
                    <h2>Get In Touch</h2>
                    <p>
                      Etiam pharetra egestas interdum blandit viverra morbi
                      consequat mi non bibendum egestas quam egestas nulla.
                    </p>
                  </div>
                  <form onSubmit={(e) => e.preventDefault()} className="row">
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>First Name</label>
                        <input
                          type="text"
                          required
                          name="name"
                          placeholder="Ali"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Last Name</label>
                        <input
                          required
                          type="text"
                          name="last-name"
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
                          placeholder="Creativelayers088@Gmail.Com"
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
                      <div className="form_boxes v2">
                        <label>Comment</label>
                        <textarea
                          name="message"
                          placeholder="Lorem Ipsum Dolar Sit Amet"
                          required
                          style={{ color: "#000", width: "100%" }}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="form-submit">
                      <button type="submit" className="theme-btn">
                        Send Message
                        <Image
                          alt=""
                          width={14}
                          height={14}
                          src="/images/arrow.svg"
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* contact-column */}
              <div className="contact-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="boxcar-title">
                    <h6 className="title">Contact details</h6>
                    <div className="text">
                      Etiam pharetra egestas interdum blandit viverra morbi
                      consequat mi non bibendum egestas quam egestas nulla.
                    </div>
                  </div>
                  <div className="content-box">
                    <h6 className="title">
                      <span className="icon">
                        <svg
                          width={26}
                          height={26}
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.9999 4.0625C8.67871 4.0625 5.14575 7.64734 5.14575 12.1068C5.14575 14.3555 6.04517 16.8458 7.5169 18.7689C8.99243 20.697 10.9454 21.9375 12.9999 21.9375C15.0545 21.9375 17.0074 20.697 18.483 18.7689C19.9547 16.8458 20.8541 14.3555 20.8541 12.1068C20.8541 7.64734 17.3211 4.0625 12.9999 4.0625ZM3.52075 12.1068C3.52075 6.78329 7.74819 2.4375 12.9999 2.4375C18.2516 2.4375 22.4791 6.78329 22.4791 12.1068C22.4791 14.7496 21.4384 17.5809 19.7735 19.7564C18.1123 21.9271 15.7319 23.5625 12.9999 23.5625C10.268 23.5625 7.8876 21.9271 6.22642 19.7564C4.56143 17.5809 3.52075 14.7496 3.52075 12.1068Z"
                            fill="#050B20"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.479 11.375C9.479 9.4305 11.0554 7.85417 12.9998 7.85417C14.9443 7.85417 16.5207 9.4305 16.5207 11.375C16.5207 13.3195 14.9443 14.8958 12.9998 14.8958C11.0554 14.8958 9.479 13.3195 9.479 11.375ZM12.9998 9.47917C11.9528 9.47917 11.104 10.328 11.104 11.375C11.104 12.422 11.9528 13.2708 12.9998 13.2708C14.0469 13.2708 14.8957 12.422 14.8957 11.375C14.8957 10.328 14.0469 9.47917 12.9998 9.47917Z"
                            fill="#E1E1E1"
                          />
                        </svg>
                      </span>
                      Address
                    </h6>
                    <div className="text">
                      329 Queensberry Street, North <br />
                      Melbourne VIC3051, Australia.
                    </div>
                  </div>
                  <div className="content-box">
                    <h6 className="title">
                      <span className="icon">
                        <svg
                          width={26}
                          height={26}
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.7584 14.5869C12.0336 14.5869 11.3111 14.3474 10.7065 13.8686L5.84779 9.95128C5.49787 9.66962 5.44371 9.1572 5.72429 8.80837C6.00704 8.46062 6.51837 8.40537 6.86721 8.68595L11.7216 12.5989C12.3316 13.0821 13.1906 13.0821 13.8049 12.5946L18.6106 8.68812C18.9594 8.4032 19.4707 8.45737 19.7546 8.8062C20.0373 9.15395 19.9842 9.66528 19.6365 9.94912L14.8221 13.8621C14.2133 14.3453 13.4853 14.5869 12.7584 14.5869Z"
                            fill="#E1E1E1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.0472 21.6667C18.0493 21.6645 18.058 21.6667 18.0645 21.6667C19.3006 21.6667 20.3969 21.2247 21.2376 20.3851C22.2137 19.4133 22.7499 18.0169 22.7499 16.4537V9.01333C22.7499 5.98758 20.7718 3.79166 18.0472 3.79166H7.411C4.68642 3.79166 2.70825 5.98758 2.70825 9.01333V16.4537C2.70825 18.0169 3.24558 19.4133 4.22058 20.3851C5.06125 21.2247 6.15867 21.6667 7.39367 21.6667H18.0472ZM7.39042 23.2917C5.71883 23.2917 4.226 22.685 3.07334 21.5367C1.78959 20.2562 1.08325 18.4513 1.08325 16.4537V9.01333C1.08325 5.11008 3.8035 2.16666 7.411 2.16666H18.0472C21.6547 2.16666 24.3749 5.11008 24.3749 9.01333V16.4537C24.3749 18.4513 23.6686 20.2562 22.3848 21.5367C21.2333 22.6839 19.7393 23.2917 18.0645 23.2917H7.39042Z"
                            fill="#050B20"
                          />
                        </svg>
                      </span>
                      Email
                    </h6>
                    <div className="text">ali@boxcars.com</div>
                  </div>
                  <div className="content-box">
                    <h6 className="title">
                      <span className="icon">
                        <svg
                          width={26}
                          height={26}
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.5126 10.9886C23.1042 10.9886 22.7532 10.682 22.7066 10.2671C22.2949 6.60979 19.4533 3.77145 15.796 3.3652C15.3507 3.31537 15.029 2.91454 15.0788 2.4682C15.1276 2.02295 15.5273 1.69037 15.9758 1.75103C20.3926 2.2407 23.8246 5.66837 24.3207 10.0851C24.3717 10.5315 24.0499 10.9333 23.6047 10.9832C23.5743 10.9864 23.5429 10.9886 23.5126 10.9886Z"
                            fill="#E1E1E1"
                          />
                          <path
                            d="M19.676 11.0003C19.2947 11.0003 18.9556 10.7316 18.8798 10.3438C18.5678 8.74044 17.3317 7.50436 15.7305 7.19344C15.2896 7.10786 15.0025 6.68211 15.0881 6.24119C15.1737 5.80027 15.6103 5.51319 16.0403 5.59877C18.2948 6.03644 20.0357 7.77628 20.4744 10.0318C20.56 10.4738 20.2729 10.8995 19.8331 10.9851C19.78 10.9949 19.728 11.0003 19.676 11.0003Z"
                            fill="#E1E1E1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.10554 17.8102C13.2113 22.9171 16.6108 24.2561 18.758 24.2561C19.8175 24.2561 20.5737 23.93 21.0774 23.5681C21.1002 23.5551 23.4315 22.1295 23.8399 19.9715C24.0328 18.9586 23.7511 17.9565 23.0274 17.0725C20.0461 13.4531 18.5273 13.7911 16.8503 14.6068C15.82 15.1116 15.0064 15.5038 12.7087 13.2082C10.4122 10.9108 10.8084 10.0971 11.3099 9.06703C12.1267 7.39003 12.4628 5.87083 8.84221 2.88733C7.96038 2.16692 6.96479 1.88525 5.95296 2.07483C3.82638 2.47242 2.39421 4.76583 2.39421 4.76583C1.25454 6.36592 0.481047 10.1868 8.10554 17.8102ZM6.28446 3.66517C6.37979 3.65 6.47404 3.64133 6.56721 3.64133C6.99188 3.64133 7.40138 3.80708 7.80979 4.14292C10.7294 6.54789 10.36 7.30624 9.84864 8.35598C9.08055 9.93439 8.67863 11.4749 11.5593 14.3576C14.4431 17.2404 15.9847 16.8385 17.5609 16.0682L17.5635 16.0669C18.612 15.5573 19.37 15.1889 21.7718 18.1049C22.1824 18.6054 22.3395 19.1059 22.2507 19.6335C22.0459 20.8468 20.6354 21.9334 20.2086 22.1977C18.68 23.2876 14.9999 22.4068 9.25388 16.6619C3.51004 10.917 2.62821 7.23692 3.75704 5.64983C3.98238 5.28258 5.07329 3.86992 6.28446 3.66517Z"
                            fill="#050B20"
                          />
                        </svg>
                      </span>
                      Phone
                    </h6>
                    <div className="text">+76 956 039 967</div>
                  </div>
                  <div className="social-icons">
                    <h6 className="title">Follow us</h6>
                    <ul className="social-links">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End calculater-section */}
        {/* office-section */}
        <div className="ofice-section">
          <div className="boxcar-title">
            <h2>Our Offices</h2>
          </div>
          <div className="row">
            {officeLocations.map((office, index) => (
              <div
                key={index}
                className="ofice-block col-lg-4 col-md-6 col-sm-12"
              >
                <div className="inner-box">
                  <h6 className="title">{office.city}</h6>
                  <div className="text">{office.address}</div>
                  <a href="#" className="ofice-btn">
                    See on Map
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_801_1108)">
                        <path
                          d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                          fill="#050B20"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_801_1108">
                          <rect width={14} height={14} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                  <ul className="contact-list">
                    <li>
                      <span className="icon">
                        <svg
                          width={26}
                          height={26}
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.7585 14.5869C12.0338 14.5869 11.3112 14.3474 10.7067 13.8686L5.84791 9.95128C5.49799 9.66962 5.44383 9.1572 5.72441 8.80837C6.00716 8.46062 6.5185 8.40537 6.86733 8.68595L11.7218 12.5989C12.3317 13.0821 13.1908 13.0821 13.805 12.5946L18.6107 8.68812C18.9595 8.4032 19.4709 8.45737 19.7547 8.8062C20.0374 9.15395 19.9843 9.66528 19.6366 9.94912L14.8223 13.8621C14.2134 14.3453 13.4854 14.5869 12.7585 14.5869Z"
                            fill="#E1E1E1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.0473 21.6667C18.0495 21.6645 18.0581 21.6667 18.0646 21.6667C19.3007 21.6667 20.397 21.2247 21.2377 20.3851C22.2138 19.4134 22.75 18.0169 22.75 16.4537V9.01335C22.75 5.9876 20.7719 3.79169 18.0473 3.79169H7.41112C4.68654 3.79169 2.70837 5.9876 2.70837 9.01335V16.4537C2.70837 18.0169 3.24571 19.4134 4.22071 20.3851C5.06137 21.2247 6.15879 21.6667 7.39379 21.6667H18.0473ZM7.39054 23.2917C5.71896 23.2917 4.22612 22.685 3.07346 21.5367C1.78971 20.2562 1.08337 18.4514 1.08337 16.4537V9.01335C1.08337 5.1101 3.80362 2.16669 7.41112 2.16669H18.0473C21.6548 2.16669 24.375 5.1101 24.375 9.01335V16.4537C24.375 18.4514 23.6687 20.2562 22.385 21.5367C21.2334 22.6839 19.7395 23.2917 18.0646 23.2917H7.39054Z"
                            fill="#050B20"
                          />
                        </svg>
                      </span>
                      {office.email}
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          width={26}
                          height={26}
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.5124 10.9886C23.104 10.9886 22.753 10.6821 22.7064 10.2671C22.2948 6.6098 19.4532 3.77147 15.7959 3.36522C15.3506 3.31538 15.0289 2.91455 15.0787 2.46822C15.1274 2.02297 15.5272 1.69038 15.9757 1.75105C20.3924 2.24072 23.8244 5.66838 24.3206 10.0851C24.3715 10.5315 24.0498 10.9333 23.6045 10.9832C23.5742 10.9864 23.5428 10.9886 23.5124 10.9886Z"
                            fill="#E1E1E1"
                          />
                          <path
                            d="M19.676 11.0003C19.2947 11.0003 18.9556 10.7316 18.8798 10.3438C18.5678 8.74044 17.3317 7.50435 15.7305 7.19344C15.2896 7.10785 15.0025 6.6821 15.0881 6.24119C15.1737 5.80027 15.6103 5.51319 16.0403 5.59877C18.2948 6.03644 20.0357 7.77627 20.4744 10.0318C20.56 10.4738 20.2729 10.8995 19.8331 10.9851C19.78 10.9949 19.728 11.0003 19.676 11.0003Z"
                            fill="#E1E1E1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.0578 20.7495C17.0478 20.7495 16.0519 20.5779 15.1144 20.2422C13.9028 19.788 12.7973 19.0366 11.8741 18.0991C10.9509 17.1617 10.1996 16.0562 9.74529 14.8445C9.40954 13.907 9.23796 12.9111 9.23796 11.9012C9.23796 11.0784 9.98562 10.4412 10.8074 10.5788L13.4767 11.0204C14.1716 11.1374 14.6674 11.7372 14.6674 12.4516V14.9346C14.6674 15.2643 14.5079 15.5737 14.2381 15.7632L12.5551 16.8976C13.0318 17.5243 13.5469 18.0857 14.0927 18.6066C14.6386 19.1275 15.209 19.6138 15.7969 20.0627L16.9431 18.3874C17.1341 18.1156 17.4446 17.9561 17.7742 17.9561H20.2481C20.9637 17.9561 21.5634 18.4519 21.6805 19.1476L22.1182 21.8308C22.257 22.6525 21.6208 23.4 20.798 23.4H18.0578ZM11.6896 9.46945C11.705 9.4696 11.7203 9.46969 11.7354 9.46969C10.3354 8.60734 9.23796 7.06334 9.23796 5.30511C9.23796 2.67603 11.2525 0.661499 13.8816 0.661499C16.5107 0.661499 18.5252 2.67603 18.5252 5.30511C18.5252 7.9342 16.5107 9.94873 13.8816 9.94873C13.0916 9.94873 12.3442 9.73894 11.6896 9.46945Z"
                            fill="#050B20"
                          />
                        </svg>
                      </span>
                      {office.phone}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
