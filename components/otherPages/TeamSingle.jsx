import React from "react";
import Cars from "./Cars";
import Image from "next/image";
import Link from "next/link";
export default function TeamSingle({ teamMember }) {
  return (
    <section className="vehicles-section-three layout-radius">
      <div className="boxcar-container">
        <div className="right-box">
          <div className="boxcar-title wow fadeInUp">
            <ul className="breadcrumb">
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <span>Cars for Sale</span>
              </li>
            </ul>
            <h2>Team Single</h2>
          </div>
          <div className="auther-info-box">
            <div className="inner-column" style={{ columnGap: "20px" }}>
              <div
                className="image-box"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              >
                <figure
                  className="image"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                >
                  <a href="#" style={{ maxWidth: "100%", maxHeight: "100%" }}>
                    <Image
                      alt=""
                      src={
                        teamMember.imageSrc
                          ? teamMember.imageSrc
                          : teamMember.imgSrc
                          ? teamMember.imgSrc
                          : "/images/resource/vehical-auther1-1.png"
                      }
                      style={{
                        maxWidth: "70%",
                        margin: "0 auto",
                        display: "block",
                      }}
                      width={431}
                      height={327}
                    />
                  </a>
                </figure>
              </div>
              <div className="auther-info">
                <div className="content-box">
                  <h3 className="title">{teamMember.name}</h3>
                  <span>Software Development Manager</span>
                  <div className="text">
                    Award-winning, family owned dealership of new and pre-owned
                    vehicles. Lowest prices and the best customer service
                    guaranteed.
                  </div>
                  <ul className="contact-info">
                    <li>
                      <a href="#">
                        {/* <i className="fa-solid fa-envelope"></i> */}
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
                              d="M18.0474 21.6667C18.0496 21.6645 18.0582 21.6667 18.0647 21.6667C19.3008 21.6667 20.3972 21.2247 21.2378 20.3851C22.2139 19.4134 22.7502 18.0169 22.7502 16.4537V9.01335C22.7502 5.9876 20.772 3.79169 18.0474 3.79169H7.41125C4.68666 3.79169 2.7085 5.9876 2.7085 9.01335V16.4537C2.7085 18.0169 3.24583 19.4134 4.22083 20.3851C5.0615 21.2247 6.15891 21.6667 7.39391 21.6667H18.0474ZM7.39066 23.2917C5.71908 23.2917 4.22625 22.685 3.07358 21.5367C1.78983 20.2562 1.0835 18.4514 1.0835 16.4537V9.01335C1.0835 5.1101 3.80375 2.16669 7.41125 2.16669H18.0474C21.6549 2.16669 24.3752 5.1101 24.3752 9.01335V16.4537C24.3752 18.4514 23.6688 20.2562 22.3851 21.5367C21.2335 22.6839 19.7396 23.2917 18.0647 23.2917H7.39066Z"
                              fill="#050B20"
                            />
                          </svg>
                        </span>
                        ali@boxcars.com
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {/* <i className="fa-solid fa-phone"></i> */}
                        <span className="icon">
                          <svg
                            width={26}
                            height={26}
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M23.5126 10.9886C23.1042 10.9886 22.7532 10.6821 22.7066 10.2671C22.2949 6.6098 19.4533 3.77147 15.796 3.36522C15.3507 3.31538 15.029 2.91455 15.0788 2.46822C15.1276 2.02297 15.5273 1.69038 15.9758 1.75105C20.3926 2.24072 23.8246 5.66838 24.3207 10.0851C24.3717 10.5315 24.0499 10.9333 23.6047 10.9832C23.5743 10.9864 23.5429 10.9886 23.5126 10.9886Z"
                              fill="#E1E1E1"
                            />
                            <path
                              d="M19.6762 11.0003C19.2949 11.0003 18.9558 10.7316 18.88 10.3438C18.568 8.74044 17.3319 7.50435 15.7307 7.19344C15.2898 7.10785 15.0027 6.6821 15.0883 6.24119C15.1739 5.80027 15.6105 5.51319 16.0406 5.59877C18.295 6.03644 20.0359 7.77627 20.4747 10.0318C20.5602 10.4738 20.2732 10.8995 19.8333 10.9851C19.7803 10.9949 19.7283 11.0003 19.6762 11.0003Z"
                              fill="#E1E1E1"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.10579 17.8102C13.2116 22.917 16.6111 24.256 18.7583 24.256C19.8178 24.256 20.5739 23.9299 21.0777 23.5681C21.1004 23.5551 23.4318 22.1294 23.8402 19.9714C24.033 18.9585 23.7513 17.9564 23.0277 17.0724C20.0463 13.453 18.5275 13.791 16.8505 14.6068C15.8203 15.1116 15.0067 15.5038 12.7089 13.2082C10.4125 10.9108 10.8086 10.0971 11.3101 9.067C12.127 7.39 12.463 5.8708 8.84245 2.8873C7.96062 2.16689 6.96504 1.88522 5.9532 2.0748C3.82662 2.47239 2.39445 4.7658 2.39445 4.7658C1.25479 6.36589 0.481291 10.1868 8.10579 17.8102ZM6.2847 3.66514C6.38004 3.64997 6.47429 3.6413 6.56745 3.6413C6.99212 3.6413 7.40162 3.80705 7.81004 4.14289C10.7296 6.54786 10.3602 7.30621 9.84888 8.35595C9.0808 9.93437 8.67887 11.4749 11.5595 14.3576C14.4433 17.2404 15.9849 16.8384 17.5612 16.0682L17.5638 16.0669C18.6122 15.5573 19.3702 15.1888 21.7721 18.1049C22.1827 18.6054 22.3398 19.1059 22.2509 19.6334C22.0462 20.8468 20.6357 21.9334 20.2088 22.1977C18.6803 23.2875 15.0002 22.4068 9.25412 16.6619C3.51029 10.9169 2.62845 7.23689 3.75729 5.6498C3.98262 5.28255 5.07354 3.86989 6.2847 3.66514Z"
                              fill="#050B20"
                            />
                          </svg>
                        </span>
                        +76 956 039 967
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="btn-box">
                  <a href="#" className="button">
                    Send Message
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={14}
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_788_1269)">
                        <path
                          d="M14.1106 0H5.55509C5.34013 0 5.16619 0.173943 5.16619 0.388901C5.16619 0.603859 5.34013 0.777802 5.55509 0.777802H13.1719L0.613453 13.3362C0.461531 13.4881 0.461531 13.7342 0.613453 13.8861C0.689396 13.962 0.788927 14 0.888422 14C0.987917 14 1.08741 13.962 1.16339 13.8861L13.7218 1.3277V8.94447C13.7218 9.15943 13.8957 9.33337 14.1107 9.33337C14.3256 9.33337 14.4996 9.15943 14.4996 8.94447V0.388901C14.4995 0.173943 14.3256 0 14.1106 0Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_788_1269">
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
            </div>
          </div>
        </div>
        {/* cars-section-three */}
        <Cars />
        {/* End shop section two */}
      </div>
    </section>
  );
}
