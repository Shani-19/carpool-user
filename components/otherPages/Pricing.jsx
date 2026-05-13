import { pricingPlans } from "@/data/pricing";
import React from "react";

export default function Pricing() {
  return (
    <section className="boxcar-pricing-section-seven layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title text-center">
          <h2>Membership Plans</h2>
        </div>
        <div className="row">
          {/* pricing-block-seven */}
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="pricing-block-seven col-lg-3 col-md-6 col-sm-12"
            >
              <div className="inner-box">
                <h6 className="title">
                  {plan.price}
                  <span>/ monthly</span>
                </h6>
                <span className="plan">{plan.plan}</span>
                <div className="text">{plan.description}</div>
                <ul className="pricing-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fa-solid fa-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#" className="pricing-btn">
                  Buy Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={14}
                    viewBox="0 0 15 14"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_845_2478)">
                      <path
                        d="M14.1111 0H5.55558C5.34062 0 5.16668 0.173943 5.16668 0.388901C5.16668 0.603859 5.34062 0.777802 5.55558 0.777802H13.1723L0.613941 13.3362C0.46202 13.4881 0.46202 13.7342 0.613941 13.8861C0.689884 13.962 0.789415 14 0.88891 14C0.988405 14 1.0879 13.962 1.16388 13.8861L13.7222 1.3277V8.94447C13.7222 9.15943 13.8962 9.33337 14.1111 9.33337C14.3261 9.33337 14.5 9.15943 14.5 8.94447V0.388901C14.5 0.173943 14.3261 0 14.1111 0Z"
                        fill="#405FF2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_845_2478">
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
          ))}
        </div>
      </div>
    </section>
  );
}
