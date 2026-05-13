import React from "react";
import Accordion from "../common/Accordion";

export default function Faq2() {
  return (
    <section className="faq-inner-section layout-radius">
      {/* faq-section */}
      <div className="faqs-section pt-0">
        <div className="inner-container">
          {/* FAQ Column */}
          <div className="faq-column wow fadeInUp" data-wow-delay="400ms">
            <div className="inner-column">
              <div className="boxcar-title text-center">
                <h2 className="title">General</h2>
              </div>
              <ul className="widget-accordion wow fadeInUp">
                {/*Block*/}
                <Accordion />
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End faqs-section */}
      {/* faq-section */}
      <div className="faqs-section">
        <div className="inner-container">
          {/* FAQ Column */}
          <div className="faq-column wow fadeInUp" data-wow-delay="400ms">
            <div className="inner-column">
              <div className="boxcar-title text-center">
                <h2 className="title">Payments</h2>
              </div>
              <ul className="widget-accordion wow fadeInUp">
                <Accordion />
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End faqs-section */}
    </section>
  );
}
