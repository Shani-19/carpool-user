import React from "react";
import Link from "next/link";
import Image from "next/image";
import { teamBlocks } from "@/data/team";
export default function Team() {
  return (
    <section className="boxcar-team-section-two">
      <div className="boxcar-container">
        <div className="boxcar-title text-center wow fadeInUp">
          <h2>Our Team</h2>
        </div>
        <div className="row">
          {teamBlocks.map((block, index) => (
            <div
              key={index}
              className="team-block-two col-lg-3 col-md-6 col-sm-6"
              style={{ position: "relative" }}
            >
              <div
                className={`inner-box wow fadeInUp`}
                data-wow-delay={block.delay}
              >
                <div className="image-box">
                  <figure className="image">
                    <a href="#">
                      <Image
                        alt=""
                        src={block.imgSrc}
                        width={block.imgSrc.includes("team2-3") ? 263 : 260}
                        height={400}
                      />
                    </a>
                  </figure>
                  <div className="contact-info">
                    <span>
                      <a href="#">{block.email}</a>
                    </span>
                    <small>
                      <a href="#">{block.phone}</a>
                    </small>
                  </div>
                </div>
                <div className="content-box">
                  <h4 className="title">
                    <Link href={`/team-single/${block.id}`}>{block.name}</Link>
                  </h4>
                  <span>{block.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
