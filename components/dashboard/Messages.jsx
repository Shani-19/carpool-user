"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";

export default function Messages() {
  return (
    <>
      <section className="dashboard-widget">
        <div className="right-box">
          <Sidebar />
          <div className="content-column">
            <div className="inner-column">
              <div className="list-title">
                <h3 className="title">Messages</h3>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur.
                </div>
              </div>
              <div className="chat-widget">
                <div className="widget-content">
                  <div className="row">
                    <div
                      className="contacts_column col-xl-4 col-lg-5 col-md-12 col-sm-12 chat"
                      id="chat_contacts"
                    >
                      <div className="card contacts_card">
                        <div className="card-header">
                          <div className="search-box-one">
                            <form
                              onSubmit={(e) => e.preventDefault()}
                              method="post"
                              action="#"
                            >
                              <div className="form-group">
                                <span className="icon">
                                  <Image
                                    alt=""
                                    src="/images/icons/search.svg"
                                    width={16}
                                    height={16}
                                  />
                                </span>
                                <input
                                  type="search"
                                  name="search-field"
                                  defaultValue=""
                                  placeholder="Search"
                                  required=""
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="card-body contacts_body">
                          <ul className="contacts">
                            <li>
                              <a href="#">
                                <div className="d-flex bd-highlight">
                                  <div className="img_cont">
                                    <Image
                                      className="rounded-circle user_img"
                                      alt=""
                                      src="/images/resource/candidate-1.png"
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                  <div className="user_info">
                                    <span>Darlene Robertson</span>
                                    <p>Head of Development</p>
                                  </div>
                                  <span className="info">35 mins</span>
                                </div>
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <div className="d-flex bd-highlight">
                                  <div className="img_cont">
                                    <Image
                                      className="rounded-circle user_img"
                                      alt=""
                                      src="/images/resource/candidate-2.png"
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                  <div className="user_info">
                                    <span>Jane Cooper</span>
                                    <p>Head of Development</p>
                                  </div>
                                  <span className="info">
                                    35 mins <span className="count">2</span>
                                  </span>
                                </div>
                              </a>
                            </li>
                            <li className="active">
                              <a href="#">
                                <div className="d-flex bd-highlight">
                                  <div className="img_cont">
                                    <Image
                                      className="rounded-circle user_img"
                                      alt=""
                                      src="/images/resource/candidate-3.png"
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                  <div className="user_info">
                                    <span>Arlene McCoy</span>
                                    <p>Head of Development</p>
                                  </div>
                                  <span className="info">
                                    35 mins
                                    <span className="count bg-success">2</span>
                                  </span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <div className="d-flex bd-highlight">
                                  <div className="img_cont">
                                    <Image
                                      className="rounded-circle user_img"
                                      alt=""
                                      src="/images/resource/candidate-4.png"
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                  <div className="user_info">
                                    <span>Albert Flores</span>
                                    <p>Head of Development</p>
                                  </div>
                                  <span className="info">35 mins</span>
                                </div>
                              </a>
                            </li>
                            <li className="">
                              <a href="#">
                                <div className="d-flex bd-highlight">
                                  <div className="img_cont">
                                    <Image
                                      className="rounded-circle user_img"
                                      alt=""
                                      src="/images/resource/candidate-5.png"
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                  <div className="user_info">
                                    <span>Williamson</span>
                                    <p>Head of Development</p>
                                  </div>
                                  <span className="info">
                                    35 mins
                                    <span className="count bg-warning">2</span>
                                  </span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <div className="d-flex bd-highlight">
                                  <div className="img_cont">
                                    <Image
                                      className="rounded-circle user_img"
                                      alt=""
                                      src="/images/resource/candidate-6.png"
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                  <div className="user_info">
                                    <span>Kristin Watson</span>
                                    <p>Head of Development</p>
                                  </div>
                                  <span className="info">35 mins</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <div className="d-flex bd-highlight">
                                  <div className="img_cont">
                                    <Image
                                      className="rounded-circle user_img"
                                      alt=""
                                      src="/images/resource/candidate-7.png"
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                  <div className="user_info">
                                    <span>Annette Black</span>
                                    <p>Head of Development</p>
                                  </div>
                                  <span className="info">35 mins</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <div className="d-flex bd-highlight">
                                  <div className="img_cont">
                                    <Image
                                      className="rounded-circle user_img"
                                      alt=""
                                      src="/images/resource/candidate-8.png"
                                      width={90}
                                      height={90}
                                    />
                                  </div>
                                  <div className="user_info">
                                    <span>Jacob Jones</span>
                                    <p>Head of Development</p>
                                  </div>
                                  <span className="info">35 mins</span>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 chat">
                      <div className="card message-card">
                        <div className="card-header msg_head">
                          <div className="d-flex bd-highlight">
                            <div className="img_cont">
                              <Image
                                alt=""
                                className="rounded-circle user_img"
                                src="/images/resource/candidate-88.png"
                                width={90}
                                height={90}
                              />
                            </div>
                            <div className="user_info">
                              <span>Arlene McCoy</span>
                              <p>Active</p>
                            </div>
                          </div>
                          <div className="btn-box">
                            <button className="dlt-chat">
                              Delete Conversation
                            </button>
                            <button className="toggle-contact">
                              <span className="fa fa-bars" />
                            </button>
                          </div>
                        </div>
                        <div className="card-body msg_card_body">
                          <div className="d-flex justify-content-start mb-2">
                            <div className="img_cont_msg">
                              <Image
                                alt=""
                                className="rounded-circle user_img_msg"
                                src="/images/resource/candidate-3.png"
                                width={90}
                                height={90}
                              />
                              <div className="name">
                                Albert Flores
                                <span className="msg_time">35 mins</span>
                              </div>
                            </div>
                            <div className="msg_cotainer">
                              How likely are you to recommend our company to
                              your friends and family?
                            </div>
                          </div>
                          <div className="d-flex justify-content-end mb-2 reply">
                            <div className="img_cont_msg">
                              <Image
                                alt=""
                                className="rounded-circle user_img_msg"
                                src="/images/resource/candidate-6.png"
                                width={90}
                                height={90}
                              />
                              <div className="name">
                                You <span className="msg_time">35 mins</span>
                              </div>
                            </div>
                            <div className="msg_cotainer">
                              Hey there, we’re just writing to let you know that
                              you’ve been subscribed to a repository on GitHub.
                            </div>
                          </div>
                          <div className="d-flex justify-content-start">
                            <div className="img_cont_msg">
                              <Image
                                alt=""
                                className="rounded-circle user_img_msg"
                                src="/images/resource/candidate-3.png"
                                width={90}
                                height={90}
                              />
                              <div className="name">
                                Cameron Williamson
                                <span className="msg_time">35 mins</span>
                              </div>
                            </div>
                            <div className="msg_cotainer">Ok, Understood!</div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className="form-group mb-0">
                            <textarea
                              className="form-control type_msg"
                              placeholder="Type a message..."
                              defaultValue={""}
                            />
                            <button
                              type="button"
                              className="theme-btn btn-style-one submit-btn"
                            >
                              <span className="text-dk">Send Message</span>
                              <span className="text-mb">Send</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={14}
                                height={14}
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_601_692)">
                                  <path
                                    d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_601_692">
                                    <rect width={14} height={14} fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
