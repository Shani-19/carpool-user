import React from "react";
import Cars from "../homes/home-6/Cars";
import Image from "next/image";
import Location from "./sections/Location";
import Review from "./sections/Review";
import Ratings from "./sections/Ratings";
import Replay from "./sections/Replay";
import CommentForm from "./sections/CommentForm";
import Link from "next/link";
const hours = [
  { day: "Sunday", time: "10:00 - 17:00" },
  { day: "Monday", time: "10:00 - 17:00" },
  { day: "Tuesday", time: "10:00 - 17:00" },
  { day: "Wednesday", time: "10:00 - 17:00" },
  { day: "Thursday", time: "10:00 - 17:00" },
  { day: "Friday", time: "10:00 - 17:00" },
  { day: "Saturday", time: "10:00 - 17:00" },
];
export default function DealerSingle({ dealerItem }) {
  return (
    <section className="dealer-ship-section-two layout-radius">
      <div className="barnd-box">
        <div className="boxcar-container">
          <div className="boxcar-title-three">
            <ul className="breadcrumb">
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <span>Cars for Sale</span>
              </li>
            </ul>
            <h2>{dealerItem.title}</h2>
          </div>
          <div className="row">
            <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="brand-box">
                  <div className="image-box">
                    <Image
                      width={233}
                      height={233}
                      src="/images/resource/audi.png"
                      alt=""
                    />
                  </div>
                  <div className="content-box">
                    <h3 className="title">Audi Paris</h3>
                    <ul className="contact-list">
                      <li>
                        {/* <i className="fa-solid fa-location-dot"></i> */}
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
                              d="M12.9997 4.0625C8.67846 4.0625 5.14551 7.64734 5.14551 12.1068C5.14551 14.3555 6.04492 16.8458 7.51665 18.7689C8.99219 20.697 10.9451 21.9375 12.9997 21.9375C15.0542 21.9375 17.0071 20.697 18.4827 18.7689C19.9545 16.8458 20.8538 14.3555 20.8538 12.1068C20.8538 7.64734 17.3209 4.0625 12.9997 4.0625ZM3.52051 12.1068C3.52051 6.78329 7.74795 2.4375 12.9997 2.4375C18.2514 2.4375 22.4788 6.78329 22.4788 12.1068C22.4788 14.7496 21.4382 17.5809 19.7732 19.7564C18.112 21.9271 15.7316 23.5625 12.9997 23.5625C10.2677 23.5625 7.88736 21.9271 6.22618 19.7564C4.56119 17.5809 3.52051 14.7496 3.52051 12.1068Z"
                              fill="#050B20"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.47852 11.375C9.47852 9.43051 11.0549 7.85419 12.9993 7.85419C14.9438 7.85419 16.5202 9.43051 16.5202 11.375C16.5202 13.3195 14.9438 14.8959 12.9993 14.8959C11.0549 14.8959 9.47852 13.3195 9.47852 11.375ZM12.9993 9.47919C11.9523 9.47919 11.1035 10.328 11.1035 11.375C11.1035 12.4221 11.9523 13.2709 12.9993 13.2709C14.0464 13.2709 14.8952 12.4221 14.8952 11.375C14.8952 10.328 14.0464 9.47919 12.9993 9.47919Z"
                              fill="#E1E1E1"
                            />
                          </svg>
                        </span>
                        Melbourne VIC3051, Australia.
                      </li>
                      <li>
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
                              d="M18.0469 21.6667C18.0491 21.6645 18.0578 21.6667 18.0643 21.6667C19.3003 21.6667 20.3967 21.2247 21.2373 20.3851C22.2134 19.4134 22.7497 18.0169 22.7497 16.4537V9.01335C22.7497 5.9876 20.7715 3.79169 18.0469 3.79169H7.41076C4.68617 3.79169 2.70801 5.9876 2.70801 9.01335V16.4537C2.70801 18.0169 3.24534 19.4134 4.22034 20.3851C5.06101 21.2247 6.15842 21.6667 7.39342 21.6667H18.0469ZM7.39017 23.2917C5.71859 23.2917 4.22576 22.685 3.07309 21.5367C1.78934 20.2562 1.08301 18.4514 1.08301 16.4537V9.01335C1.08301 5.1101 3.80326 2.16669 7.41076 2.16669H18.0469C21.6544 2.16669 24.3747 5.1101 24.3747 9.01335V16.4537C24.3747 18.4514 23.6683 20.2562 22.3846 21.5367C21.233 22.6839 19.7391 23.2917 18.0643 23.2917H7.39017Z"
                              fill="#050B20"
                            />
                          </svg>
                        </span>
                        ali@boxcars.com
                      </li>
                      <li>
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
                              d="M23.5121 10.9886C23.1037 10.9886 22.7527 10.6821 22.7061 10.2671C22.2944 6.6098 19.4528 3.77147 15.7955 3.36522C15.3502 3.31538 15.0285 2.91455 15.0783 2.46822C15.1271 2.02297 15.5268 1.69038 15.9753 1.75105C20.3921 2.24072 23.8241 5.66838 24.3202 10.0851C24.3712 10.5315 24.0494 10.9333 23.6042 10.9832C23.5738 10.9864 23.5424 10.9886 23.5121 10.9886Z"
                              fill="#E1E1E1"
                            />
                            <path
                              d="M19.6762 11.0003C19.2949 11.0003 18.9558 10.7316 18.88 10.3438C18.568 8.74044 17.3319 7.50435 15.7307 7.19344C15.2898 7.10785 15.0027 6.6821 15.0883 6.24119C15.1739 5.80027 15.6105 5.51319 16.0406 5.59877C18.295 6.03644 20.0359 7.77627 20.4747 10.0318C20.5602 10.4738 20.2732 10.8995 19.8333 10.9851C19.7803 10.9949 19.7283 11.0003 19.6762 11.0003Z"
                              fill="#E1E1E1"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.1053 17.8102C13.2111 22.917 16.6106 24.256 18.7578 24.256C19.8173 24.256 20.5734 23.9299 21.0772 23.5681C21.0999 23.5551 23.4313 22.1294 23.8397 19.9714C24.0325 18.9585 23.7509 17.9564 23.0272 17.0724C20.0459 13.453 18.527 13.791 16.85 14.6068C15.8198 15.1116 15.0062 15.5038 12.7084 13.2082C10.412 10.9108 10.8081 10.0971 11.3096 9.067C12.1265 7.39 12.4625 5.8708 8.84197 2.8873C7.96013 2.16689 6.96455 1.88522 5.95272 2.0748C3.82613 2.47239 2.39397 4.7658 2.39397 4.7658C1.2543 6.36589 0.480802 10.1868 8.1053 17.8102ZM6.28422 3.66514C6.37955 3.64997 6.4738 3.6413 6.56697 3.6413C6.99163 3.6413 7.40113 3.80705 7.80955 4.14289C10.7291 6.54786 10.3597 7.30621 9.84839 8.35595C9.08031 9.93437 8.67838 11.4749 11.559 14.3576C14.4429 17.2404 15.9844 16.8384 17.5607 16.0682L17.5633 16.0669C18.6117 15.5573 19.3697 15.1888 21.7716 18.1049C22.1822 18.6054 22.3393 19.1059 22.2504 19.6334C22.0457 20.8468 20.6352 21.9334 20.2084 22.1977C18.6798 23.2875 14.9997 22.4068 9.25363 16.6619C3.5098 10.9169 2.62797 7.23689 3.7568 5.6498C3.98213 5.28255 5.07305 3.86989 6.28422 3.66514Z"
                              fill="#050B20"
                            />
                          </svg>
                        </span>
                        +76 956 039 967
                      </li>
                    </ul>
                    <div className="text">
                      Award-winning, family owned dealership of new and
                      pre-owned vehicles. Lowest prices and the best customer
                      service guaranteed.
                    </div>
                    <a href="#" className="brand-btn">
                      View All Cars
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={14}
                        viewBox="0 0 15 14"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_881_15233)">
                          <path
                            d="M14.1111 0H5.55558C5.34062 0 5.16668 0.173943 5.16668 0.388901C5.16668 0.603859 5.34062 0.777802 5.55558 0.777802H13.1723L0.613941 13.3362C0.46202 13.4881 0.46202 13.7342 0.613941 13.8861C0.689884 13.962 0.789415 14 0.88891 14C0.988405 14 1.0879 13.962 1.16388 13.8861L13.7222 1.3277V8.94447C13.7222 9.15943 13.8962 9.33337 14.1111 9.33337C14.3261 9.33337 14.5 9.15943 14.5 8.94447V0.388901C14.5 0.173943 14.3261 0 14.1111 0Z"
                            fill="#405FF2"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_881_15233">
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
                <div className="description-sec">
                  <h4 className="title">Description</h4>
                  <div className="text two">
                    Quisque imperdiet dignissim enim dictum finibus. Sed
                    consectetutr convallis enim eget laoreet. Aenean vitae nisl
                    mollis, porta risus vel, dapibus lectus. Etiam ac suscipit
                    eros, eget maximus
                  </div>
                  <div className="text">
                    Etiam sit amet ex pharetra, venenatis ante vehicula, gravida
                    sapien. Fusce eleifend vulputate nibh, non cursus augue
                    placerat pellentesque. Sed venenatis risus nec felis mollis,
                    in pharetra urna euismod. Morbi aliquam ut turpis sit amet
                    ultrices. Vestibulum mattis blandit nisl, et tristique elit
                    scelerisque nec. Fusce eleifend laoreet dui eget aliquet. Ut
                    rutrum risus et nunc pretium scelerisque.
                  </div>
                </div>
                <div className="service-box">
                  <h4 className="title">Our services</h4>
                  <div className="list-sec">
                    <div className="service-list two">
                      <h6 className="inner-title">Business</h6>
                      <div className="list-box">
                        <ul className="list two">
                          <li>Home delivery</li>
                          <li>Part exchange</li>
                          <li>Live video viewing</li>
                          <li>Finance services</li>
                        </ul>
                        <ul className="list">
                          <li>Click and collect</li>
                          <li>Extended warranties</li>
                        </ul>
                      </div>
                    </div>
                    <div className="service-list">
                      <h6 className="inner-title">Onsite Facilities</h6>
                      <div className="list-box">
                        <ul className="list two">
                          <li>Home delivery</li>
                          <li>Part exchange</li>
                          <li>Live video viewing</li>
                          <li>Finance services</li>
                        </ul>
                        <ul className="list">
                          <li>Click and collect</li>
                          <li>Extended warranties</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="location-box">
                  <Location />
                </div>
                <div className="review-sec">
                  <Review />
                </div>
                <div className="reviews">
                  <Ratings />
                </div>
                <div className="Reply-sec">
                  <Replay />
                </div>
                <CommentForm />
              </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
              <div className="side-bar">
                <a href="#" className="message">
                  Send Message
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={14}
                    viewBox="0 0 15 14"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_881_16253)">
                      <path
                        d="M14.1111 0H5.55558C5.34062 0 5.16668 0.173943 5.16668 0.388901C5.16668 0.603859 5.34062 0.777802 5.55558 0.777802H13.1723L0.613941 13.3362C0.46202 13.4881 0.46202 13.7342 0.613941 13.8861C0.689884 13.962 0.789415 14 0.88891 14C0.988405 14 1.0879 13.962 1.16388 13.8861L13.7222 1.3277V8.94447C13.7222 9.15943 13.8962 9.33337 14.1111 9.33337C14.3261 9.33337 14.5 9.15943 14.5 8.94447V0.388901C14.5 0.173943 14.3261 0 14.1111 0Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_881_16253">
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
                <div className="schedule-sec">
                  <h6 className="title">Opening hours</h6>
                  <ul className="schedule-list">
                    {hours.map((item, index) => (
                      <li key={index}>
                        {item.day}
                        <span>{item.time}</span>
                      </li>
                    ))}
                  </ul>
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
