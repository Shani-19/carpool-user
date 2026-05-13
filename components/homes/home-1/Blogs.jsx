import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts7 } from "@/data/blogs";
export default function Blogs() {
  return (
    <section className="blog-section">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Latest Blog Posts</h2>
        </div>
        <div className="row">
          {blogPosts7.map((post, index) => (
            <div className="blog-block col-lg-4 col-md-6 col-sm-12" key={index}>
              <div
                className={`inner-box wow fadeInUp`}
                data-wow-delay={post.wowDelay}
              >
                <div className="image-box">
                  <figure className="image">
                    <Link href={`/blog-single/${post.id}`}>
                      <Image alt="" src={post.src} width={448} height={300} />
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
    </section>
  );
}
