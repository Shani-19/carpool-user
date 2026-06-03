"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { authAPI } from "@/utils/api";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { setCookie } from "cookies-next";

export default function Login() {
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    mobile: '',
    wa_no: '',
    country: '',
    address: ''
  });

  const [registerErrors, setRegisterErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));

    if (registerErrors[name]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegisterErrors({});
    setRegisterSuccess(false);

    // ===== Edited by Maira START =====
    if (registerData.password !== registerData.password_confirmation) {
      setRegisterErrors({
        password_confirmation: "Passwords do not match"
      });
      setIsLoading(false);
      return;
    }

    const sanitizedMobile = String(registerData.mobile).replace(/\D/g, "");
    // ===== Edited by Maira END =====

    try {
      // ===== Edited by Maira START =====
      const response = await authAPI.register({
        ...registerData,
        mobile: sanitizedMobile,
      });
      // ===== Edited by Maira END =====

      if (response.status === 201) {
        setRegisterSuccess(true);

        setRegisterData({
          name: '',
          username: '',
          email: '',
          password: '',
          password_confirmation: '',
          mobile: '',
          wa_no: '',
          country: '',
          address: ''
        });

      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        const formattedErrors = {};

        Object.keys(validationErrors).forEach(key => {
          formattedErrors[key] = validationErrors[key][0];
        });

        // ===== Edited by Maira START =====
        if (error.response.data?.message) {
          formattedErrors.general = error.response.data.message;
        }
        // ===== Edited by Maira END =====

        setRegisterErrors(formattedErrors);
      } else {
        setRegisterErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

 const { user, setUser, loading } = useAuth();
const router = useRouter();



  // Login form
  const [loginData, setLoginData] = useState({
    login: '',
    password: ''
  });

  const [loginErrors, setLoginErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (loginErrors[name]) {
      setLoginErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginErrors({});

    try {
      const response = await authAPI.login(loginData);
      
      if (response.status === 200) {
        const userData = response.data.user;
        
        // Use cookies-next for reliable cookie setting across localhost/production
        setCookie("isAuthenticated", "true", {
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
          sameSite: "lax",
        });

        setUser(userData);

        /* ===== Maira Edit START: Booking Page Redesign ===== */
        const redirectParam = typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect")
          : null;
        const destination =
          redirectParam && redirectParam.startsWith("/") && !redirectParam.startsWith("//")
            ? redirectParam
            : "/dashboard";
        setTimeout(() => {
          window.location.href = destination;
        }, 100);
        /* ===== Maira Edit END ===== */
      }
    } catch (error) {
      if (error.response) {
        // ===== Edited by Maira START =====
        const status = error.response.status;
        const data = error.response.data || {};
        if (status === 422 && data.errors && typeof data.errors === 'object') {
          const messages = Object.values(data.errors)
            .flat()
            .filter(Boolean);
          const combined = messages.length
            ? messages.join(' ')
            : (data.message || 'Validation failed.');
          setLoginErrors({ general: combined });
        } else {
          setLoginErrors({ general: data.message || 'Login failed. Please try again.' });
        }
        // ===== Edited by Maira END =====
      } else if (error.request) {
        setLoginErrors({ general: 'Network error. Please try again.' });
      } else {
        setLoginErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

const isDisabled = !isChecked || isLoading;

  return (
    <section className="login-section layout-radius">
      <div className="inner-container">
        <div className="right-box">
          <div className="form-sec">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Sign in
                </button>
                <button
                  className="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Register
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              {/* Login Tab */}
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="form-box">
                  {/* Login Error Message */}
                  {loginErrors.general && (
                    <div className="alert alert-danger" style={{background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px'}}>
                      {loginErrors.general}
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit}>
                    <div className="form_boxes">
                      <label>Username, Email or Phone</label>
                      <input
                        required
                        type="text"
                        name="login"
                        value={loginData.login}
                        onChange={handleLoginChange}
                        placeholder="Enter username, email or phone"
                      />
                    </div>
                    <div className="form_boxes">
                      <label>Password</label>
                      <input
                        required
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="btn-box">
                      <label className="contain">
                        Remember
                        <input
                          type="checkbox"
                        />
                        <span className="checkmark" />
                      </label>
                      <a href="#" className="pasword-btn">
                        Forgotten password?
                      </a>
                    </div>
                    <div className="form-submit">
                      <button 
                        type="submit" 
                        className="theme-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Logging in...' : 'Login'}{" "}
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

              {/* Registration Tab */}
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div className="form-box two">
                  {registerSuccess && (
                    <div className="alert alert-success" style={{ background: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                      Registration successful! You can now login.
                    </div>
                  )}

                  {registerErrors.general && (
                    <div className="alert alert-danger" style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                      {registerErrors.general}
                    </div>
                  )}

                  <form onSubmit={handleRegisterSubmit}>
                    <div className="form_boxes">
                      <label>Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        placeholder="John Doe"
                      />
                      {registerErrors.name && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.name}</div>}
                    </div>

                    <div className="form_boxes">
                      <label>Username</label>
                      <input
                        required
                        type="text"
                        name="username"
                        value={registerData.username}
                        onChange={handleRegisterChange}
                        placeholder="John203"
                      />
                      {registerErrors.username && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.username}</div>}
                    </div>

                    <div className="form_boxes">
                      <label>Email Address</label>
                      <input
                        required
                        type="text"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        placeholder="your-email@gmail.com"
                      />
                      {registerErrors.email && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.email}</div>}
                    </div>

                    <div className="form_boxes">
                      <label>Password</label>
                      {/* ===== Edited by Maira START ===== */}
                      <input
                        required
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        placeholder="Your Password"
                        minLength={8}
                        maxLength={15}
                      />
                      <div style={{ color: '#6c757d', fontSize: '12px', marginTop: '4px' }}>8–15 characters required</div>
                      {/* ===== Edited by Maira END ===== */}
                      {registerErrors.password && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.password}</div>}
                    </div>

                    <div className="form_boxes">
                      <label>Re-type Password</label>
                      {/* ===== Edited by Maira START ===== */}
                      <input
                        required
                        type="password"
                        name="password_confirmation"
                        value={registerData.password_confirmation}
                        onChange={handleRegisterChange}
                        placeholder="Re-type Your Password"
                        minLength={8}
                        maxLength={15}
                      />
                      {registerErrors.password_confirmation && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.password_confirmation}</div>}
                      {/* ===== Edited by Maira END ===== */}
                    </div>

                    <div className="form_boxes">
                      <label>Mobile Number</label>
                      <input
                        required
                        type="number"
                        name="mobile"
                        value={registerData.mobile}
                        onChange={handleRegisterChange}
                        placeholder="000 000 0000"
                      />
                      {registerErrors.mobile && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.mobile}</div>}
                    </div>

                    <div className="form_boxes">
                      <label>WhatsApp Number</label>
                      {/* ===== Edited by Maira START ===== */}
                      <input
                        required
                        type="tel"
                        name="wa_no"
                        value={registerData.wa_no}
                        onChange={handleRegisterChange}
                        placeholder="+821094860472"
                      />
                      {/* ===== Edited by Maira END ===== */}
                      {registerErrors.wa_no && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.wa_no}</div>}
                    </div>

                    <div className="form_boxes">
                      <label>Select your country</label>
                      <select
                        className="form-control"
                        name="country"
                        required
                        value={registerData.country}
                        onChange={handleRegisterChange}
                      >
                        <option value="">Select your country</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Kosovo">Kosovo</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">Christmas Island</option>
                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                        <option value="Croatia (Hrvatska)">Croatia (Hrvatska)</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="France Metropolitan">France Metropolitan</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">French Polynesia</option>
                        <option value="French Southern Territories">French Southern Territories</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard and Mc Donald Islands">Heard and Mc Donald Islands</option>
                        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran (Islamic Republic of)">Iran (Islamic Republic of)</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                        <option value="Korea, Republic of">Korea, Republic of</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao, People's Democratic Republic">Lao, People's Democratic Republic</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                        <option value="Moldova, Republic of">Moldova, Republic of</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Netherlands Antilles">Netherlands Antilles</option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">Russian Federation</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia (Slovak Republic)">Slovakia (Slovak Republic)</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="St. Helena">St. Helena</option>
                        <option value="St. Pierre and Miquelon">St. Pierre and Miquelon</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard and Jan Mayen Islands">Svalbard and Jan Mayen Islands</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                        <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                        <option value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</option>
                        <option value="Wallis and Futuna Islands">Wallis and Futuna Islands</option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Yugoslavia">Yugoslavia</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                      {registerErrors.country && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.country}</div>}
                    </div>

                    <div className="form_boxes">
                      <label>Address</label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={registerData.address}
                        onChange={handleRegisterChange}
                        placeholder="Dubai Marina, Dubai, UAE"
                      />
                      {registerErrors.address && <div style={{ color: 'red', fontSize: '12px' }}>{registerErrors.address}</div>}
                    </div>

                    <div className="btn-box">
                      <label className="contain">
                        Agree our Terms and Conditions
                        <input
                          required
                          type="checkbox"
                          // defaultChecked="checked"
                          onChange={handleCheckboxChange}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>

                    <div className="form-submit">
                      <button
                        type="submit"
                        className="theme-btn"
                        disabled={isDisabled}
                      >
                        {isLoading ? 'Registering...' : 'Register'}{" "}
                        <Image
                          alt=""
                          src="/images/arrow.svg"
                          width={14}
                          height={14}
                        />
                      </button>
                    </div>

                    
                  </form>

                  <div className="btn-box-two">
                    <span>OR</span>
                    <div className="social-btns">
                      <a href="#" className="fb-btn">
                        <i className="fa-brands fa-facebook-f" />
                        Continue Facebook
                      </a>
                      <a href="#" className="fb-btn two">
                        <i className="fa-brands fa-google" />
                        Continue Google
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}