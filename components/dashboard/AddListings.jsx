"use client";
import Sidebar from "./Sidebar";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import { useState } from "react";
export default function AddListings() {
  const [images, setImages] = useState([
    "/images/resource/list2-1.png",
    "/images/resource/list2-2.png",
    "/images/resource/list2-3.png",
  ]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (index) => {
    const newImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(newImages);
  };
  const [images2, setImages2] = useState([
    "/images/resource/list2-1.png",
    "/images/resource/list2-2.png",
    "/images/resource/list2-3.png",
  ]);

  const handleImageChange2 = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images2];
        newImages[index] = file.name;
        setImages2(newImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete2 = (index) => {
    const newImages = images2.filter((_, imgIndex) => imgIndex !== index);
    setImages2(newImages);
  };
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Add Listings</h3>
              <div className="text">
                Lorem ipsum dolor sit amet, consectetur.
              </div>
            </div>
            <div className="form-box">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Car Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Price
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact"
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Features
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="media-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#media"
                    type="button"
                    role="tab"
                    aria-controls="media"
                    aria-selected="false"
                  >
                    Media
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="location-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#location"
                    type="button"
                    role="tab"
                    aria-controls="location"
                    aria-selected="false"
                  >
                    Location
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <form onSubmit={(e) => e.preventDefault()} className="row">
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Listing Title</label>

                        <SelectComponent
                          options={["Ali Tufan", "Ali Tufan", "Ali Tufan"]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Category</label>

                        <SelectComponent options={["Cars", "Cars", "Cars"]} />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Label</label>

                        <SelectComponent
                          options={[
                            "Select Label",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Condition</label>

                        <SelectComponent
                          options={["New", "Select Label", "Select Label"]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Type</label>

                        <SelectComponent
                          options={["Sedan", "Select Label", "Select Label"]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Make</label>

                        <SelectComponent
                          options={[
                            "Select Make",
                            "Select Label",
                            "Select Lable",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Model</label>

                        <SelectComponent
                          options={[
                            "Select Model",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Year</label>

                        <SelectComponent
                          options={[
                            "Select Year",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Offer Type</label>

                        <SelectComponent
                          options={[
                            "Select Offer",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Drive Type</label>

                        <SelectComponent
                          options={[
                            "Select Type",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Transmission</label>

                        <SelectComponent
                          options={[
                            "Select Transmission",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Fuel Type</label>

                        <SelectComponent
                          options={[
                            "Select Fuel",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Mileage</label>

                        <SelectComponent
                          options={["75,000", "Select Label", "Select Label"]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Engine Size</label>

                        <SelectComponent
                          options={[
                            "Engine Size",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Cylinder</label>

                        <SelectComponent
                          options={[
                            "Select Cylinder",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Color</label>

                        <SelectComponent
                          options={[
                            "Select Color",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>Door</label>

                        <SelectComponent
                          options={[
                            "Select Door",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-4">
                      <div className="form_boxes">
                        <label>VIN</label>

                        <SelectComponent
                          options={[
                            "05034................",
                            "Select Label",
                            "Select Label",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="form-column col-lg-12">
                      <div className="form_boxes v2">
                        <label>Listing Description</label>
                        <div className="drop-menu">
                          <textarea
                            name="message"
                            placeholder="Lorem Ipsum Dolar Sit Amet"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Next Price
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <form onSubmit={(e) => e.preventDefault()} className="row">
                    <div className="col-lg-12">
                      <div className="form_boxes v2">
                        <label>Price ($)</label>

                        <SelectComponent
                          options={["e.g. 1000", "e.g. 1000", "e.g. 1000"]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="inner-box">
                        <div className="form_boxes">
                          <label>Price Prefix</label>

                          <SelectComponent
                            options={["e.g. 1000", "e.g. 1000", "e.g. 1000"]}
                          />
                        </div>
                        <div className="text">
                          Any text shown before price (for example: from).
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="inner-box">
                        <div className="form_boxes">
                          <label>Price Suffix</label>

                          <SelectComponent
                            options={["e.g. 1000", "e.g. 1000", "e.g. 1000"]}
                          />
                        </div>
                        <div className="text">
                          Any text shown after price (for example: per night).
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="inner-box">
                        <div className="form_boxes">
                          <label>Price Custom</label>

                          <SelectComponent
                            options={[
                              "e.g. 1000",
                              "e.g. 1000",
                              "e.g. 1000",
                              "",
                              "",
                              "",
                            ]}
                          />
                        </div>
                        <div className="text">
                          Any text instead of price (for example: by agreement).
                          Prefix and Suffix will be ignored.
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Next Features
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="tab-pane fade cheak-box-sec style1"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <div className="right-box-two">
                    <div className="cheak-box">
                      <label className="contain">
                        Heated Seats
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Heated Steering Wheel
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Navigation System
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Tyre Pressure Monitoring System
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="cheak-box">
                      <label className="contain">
                        Apple CarPlay/Android Auto
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Bluetooth
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        HomeLink
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="cheak-box">
                      <label className="contain">
                        Airbag - Driver
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Airbag - Passenger
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Anti-lock Braking System
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Backup Camera
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Blind Spot Monitor
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="cheak-box">
                      <label className="contain">
                        Center Console
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Heated and Ventilated Front Seats
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Panoramic Moonroof
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Qi Wireless Charging
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Touchscreen Display
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="cheak-box">
                      <label className="contain">
                        Alloy Wheels
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Brake Calipers - Silver Painted
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Rear Bumper High Gloss
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Rear Diffuser Body Colour
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="contain">
                        Windows - Electric Front
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                  <div className="btn-box">
                    <a href="#" className="form-btn">
                      Next Media
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_881_11471)">
                          <path
                            d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_881_11471">
                            <rect width={14} height={14} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>
                </div>
                <div
                  className="tab-pane fade gallery-sec style1"
                  id="media"
                  role="tabpanel"
                  aria-labelledby="media-tab"
                >
                  <div className="right-box-three">
                    <h6 className="title">Gallery</h6>
                    <form className="gallery-box">
                      <div className="inner-box add-input-image">
                        {images.map((imgSrc, index) => (
                          <div className="image-box" key={index}>
                            <Image
                              width={190}
                              height={167}
                              src={imgSrc}
                              alt={`Preview ${index}`}
                              className="uploaded-img"
                            />
                            <div className="content-box">
                              <ul className="social-icon">
                                <li>
                                  <a onClick={() => handleDelete(index)}>
                                    <Image
                                      width={18}
                                      height={18}
                                      src="/images/resource/delet.svg"
                                      alt=""
                                    />
                                  </a>
                                </li>
                                <li>
                                  {/* Hidden input and label for upload */}
                                  <label htmlFor={`file-upload-${index}`}>
                                    <a>
                                      <Image
                                        width={18}
                                        height={18}
                                        src="/images/resource/delet1-1.svg"
                                        alt="Upload"
                                      />
                                    </a>
                                  </label>
                                  <input
                                    id={`file-upload-${index}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageChange(e, index)
                                    }
                                    style={{ display: "none" }}
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}

                        {/* Upload Button */}
                        <div className="uplode-box">
                          <div className="content-box">
                            <label htmlFor="upload-new">
                              <Image
                                width={34}
                                height={34}
                                src="/images/resource/uplode.svg"
                                alt="Upload"
                              />
                              <span>Upload</span>
                            </label>
                            <input
                              id="upload-new"
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) =>
                                handleImageChange(e, images.length)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text">
                        Max file size is 1MB, Minimum dimension: 330x300 And
                        Suitable files are .jpg &amp; .png
                      </div>
                    </form>
                  </div>
                  <div className="attachment-sec">
                    <h6 className="title">Attachments</h6>
                    <form className="right-box-four">
                      {images2.map((imgSrc, index) => (
                        <div key={index} className="report-box">
                          <span>{imgSrc}</span>
                          <ul className="social-icon">
                            <li>
                              <a onClick={() => handleDelete2(index)}>
                                <Image
                                  width={18}
                                  height={18}
                                  src="/images/resource/delet.svg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              {/* Hidden input and label for upload */}
                              <label htmlFor={`file-upload2-${index}`}>
                                <a>
                                  <Image
                                    width={18}
                                    height={18}
                                    src="/images/resource/delet1-1.svg"
                                    alt="Upload"
                                  />
                                </a>
                              </label>
                              <input
                                id={`file-upload2-${index}`}
                                type="file"
                                onChange={(e) => handleImageChange2(e, index)}
                                style={{ display: "none" }}
                              />
                            </li>
                          </ul>
                        </div>
                      ))}

                      {/* Upload Button */}
                      <div className="uplode-box">
                        <div className="content-box">
                          <label htmlFor="upload-new2">
                            <Image
                              width={34}
                              height={34}
                              src="/images/resource/uplode.svg"
                              alt="Upload"
                            />
                            <span>Upload</span>
                          </label>
                          <input
                            id="upload-new2"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleImageChange2(e, images.length)
                            }
                          />
                        </div>
                      </div>
                    </form>
                    <div className="text">
                      Max file size is 1MB, Minimum dimension: 330x300 And
                      Suitable files are .jpg &amp; .png
                    </div>
                  </div>
                  <div className="form-sec">
                    <h6 className="title">Video link</h6>
                    <form onSubmit={(e) => e.preventDefault()} className="row">
                      <div className="form-column col-lg-12">
                        <div className="inner-box">
                          <div className="form_boxes">
                            <label>Video Link</label>

                            <SelectComponent
                              options={["#", "#", "#", "#", "#", "#"]}
                            />
                          </div>
                          <div className="text">
                            Enter Youtube or Vimeo url.
                          </div>
                        </div>
                      </div>
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Next Location
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="tab-pane fade map-sec style1"
                  id="location"
                  role="tabpanel"
                  aria-labelledby="location-tab"
                >
                  <form onSubmit={(e) => e.preventDefault()} className="row">
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Friendly Address</label>

                        <SelectComponent
                          options={["Ali Tufan", "Ali Tufan", "Ali Tufan"]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Map Location</label>

                        <SelectComponent
                          options={[
                            "e.g. lincoln park",
                            "e.g. lincoln park",
                            "e.g. lincoln park",
                            "",
                            "",
                            "",
                          ]}
                        />
                      </div>
                    </div>
                    <div className="map-box">
                      <div className="goole-iframe">
                        <iframe src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Longitude</label>

                        <SelectComponent options={["33", "33", "33"]} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Video Link</label>

                        <SelectComponent options={["#", "#", "#"]} />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Next Location
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_711_3214)">
                              <path
                                d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_711_3214">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
