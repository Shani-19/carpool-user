import { brandBlocks } from "@/data/brands";
import React from "react";

export default function Brands() {
  return (
    <section className="boxcar-brand-section-four">
      <div className="boxcar-container">
        <div className="boxcar-title text-center">
          <h2>Browse by Type</h2>
        </div>
        <div className="right-box">
          {brandBlocks.map((block, index) => (
            <div key={index} className="brand-block-four">
              <div className="inner-box">
                <div className="icon-box">
                  <i className={block.iconClass} />
                </div>
                <h6 className="title">
                  <a href={block.link}>{block.title}</a>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
