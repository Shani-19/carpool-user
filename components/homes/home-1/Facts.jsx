import Counter from "@/components/common/Counter";
import { counters } from "@/data/facts";
import React from "react";

export default function Facts() {
  return (
    <section className="boxcar-fun-fact-section">
      <div className="large-container">
        <div className="fact-counter">
          <div className="row">
            {/* Counter block Two*/}
            {counters.map((counter, index) => (
              <div
                className="counter-block col-lg-3 col-md-3 col-sm-4 wow fadeInUp"
                data-wow-delay={counter.wowDelay}
                key={index}
              >
                <div
                  className="inner wow fadeInUp"
                  data-wow-delay={counter.wowDelay}
                >
                  <div className="content">
                    <div className="widget-counter">
                      <span className="count-text">
                        <Counter max={counter.stop} />
                      </span>
                      M
                    </div>
                    <h6 className="counter-title">{counter.title}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
