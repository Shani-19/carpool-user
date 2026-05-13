"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    wa_no: "",
    country: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
        wa_no: user.wa_no || "",
        country: user.country || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInpChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // if (loading) return <p>Loading...</p>;

  const [images, setImages] = useState(["/images/resource/list2-4.png"]);

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
        newImages[index] = reader.result;
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
    <section className="dashboard-widget-two">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Profile</h3>
              <div className="text">
                You can view and edit your profile information.
              </div>
            </div>
            <div className="gallery-sec">
              <div>
                {/* 
              <div className="right-box-three">
                <h6 className="title">Gallery</h6>
                <div className="gallery-box">
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
                            <li>*/}
                {/* Hidden input and label for upload */}
                {/*<label htmlFor={`file-upload-${index}`}>
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
                                onChange={(e) => handleImageChange(e, index)}
                                style={{ display: "none" }}
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}

                    {/* Upload Button */}{/*
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
                          onChange={(e) => handleImageChange(e, images.length)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg &amp; .png
                  </div>
                </div>
              </div> */}
              </div>
              <div className="form-sec">
                <form onSubmit={(e) => e.preventDefault()} className="row">
                  <div className="text">
                    <p>Please add valid information & contact no to get more useful information you need.</p>
                  </div>
                  <div className="col-lg-4">
                    <div className="form_boxes">
                      <label>Name</label>
                      <input
                        name="name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={handleInpChange}
                        placeholder="Ali"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form_boxes">
                      <label>Username</label>
                      <input
                        name="last-name"
                        required
                        type="text"
                        value={formData.username}
                        onChange={handleInpChange}
                        placeholder="Tufan"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form_boxes">
                      <label>Email</label>
                      <input
                        required
                        readOnly
                        disabled
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInpChange}
                        placeholder="creativelayers088@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form_boxes">
                      <label>Phone</label>
                      <input
                        name="phone"
                        required
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInpChange}
                        placeholder={+77}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form_boxes">
                      <label>Whatsapp</label>
                      <input
                        name="whatsapp"
                        required
                        type="tel"
                        value={formData.wa_no}
                        onChange={handleInpChange}
                        placeholder={+98}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form_boxes">
                      <label>Country</label>
                      <input
                        required
                        name="country"
                        type="country"
                        value={formData.country}
                        onChange={handleInpChange}
                        placeholder="creativelayers088@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <p className="text-danger fs-6 mb-0">If you want to change your <em>email address</em>, please contact us at +82-31-981-0475 (CarPool Korea)</p>
                  </div>
                </form>
              </div>

              <div className="map-sec-two">
                <div className="form-sec-two">
                  <form onSubmit={(e) => e.preventDefault()} className="row">
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Account Status</label>
                        <input
                          required
                          disabled
                          readOnly
                          type="text"
                          name="status"
                          value={user && user.status ? "Block" : "Active"}
                          onChange={handleInpChange}
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Verified</label>
                        <input
                          required
                          disabled
                          readOnly
                          type="text"
                          name="verify"
                          value={user && user.verified ? "Not Verified" : "Yes"}
                          onChange={handleInpChange}
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form_boxes">
                        <label>Address</label>
                        <input
                          required
                          type="text"
                          name="address"
                          value={user && user.address}
                          onChange={handleInpChange}
                          placeholder="ali tufan"
                        />
                      </div>
                    </div>
                    {/* <div className="col-lg-6">
                      <div className="form_boxes">
                        <label>Map Location</label>
                        <input
                          required
                          type="text"
                          name="map-location"
                          placeholder="Map Location"
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
                        <input
                          required
                          type="text"
                          name="video-link"
                          placeholder="#"
                        />
                      </div>
                    </div> */}

                    <div className="right-box-three v2">
                      <h6 className="title">Picture</h6>
                      <div className="gallery-box">
                        <div className="inner-box">
                          {images.map((imgSrc, index) => (
                            <div className="image-box" key={index}>
                              <Image
                                width={190}
                                height={167}
                                src={imgSrc}
                                alt={`Preview ${index}`}
                              />
                              <div className="content-box">
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
                                      onChange={(e) => handleImageChange2(e, index)}
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
                                  handleImageChange2(e, images2.length)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text">
                          Max file size is 1MB, Minimum dimension: 330x300 And
                          Suitable files are .jpg &amp; .png
                        </div>
                      </div>
                    </div>

                    <div className="form-submit">
                      <button type="submit" className="theme-btn">
                        Save Profile
                        <Image
                          alt=""
                          src="/images/arrow.svg"
                          width={14}
                          height={14}
                        />
                      </button>
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
