"use client";
import React from "react";

export default function Invoice() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print(); // This runs only on the client side
    }
  };

  return (
    <section className="invoice-section">
      <div className="cus-container2">
        <div className="top">
          <a onClick={handlePrint} className="btn-default">
            Print this invoice
            <svg
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
        <div className="box-invoice">
          <div className="header">
            <div className="wrap-top">
              <div className="box-left">
                <div className="logo">
                  <svg
                    width={108}
                    height={26}
                    viewBox="0 0 108 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.21 0.499998C11.2 0.499998 12.915 2.355 12.915 6.135V7.01C12.915 9.53 12.145 11.14 10.43 11.945C12.495 12.75 13.3 14.605 13.3 17.195V19.19C13.3 22.97 11.305 25 7.455 25H1.4V0.499998H7.21ZM6.965 13.975H5.25V21.5H7.455C8.75 21.5 9.45 20.905 9.45 19.085V16.95C9.45 14.675 8.715 13.975 6.965 13.975ZM7.105 4H5.25V10.475H6.755C8.19 10.475 9.065 9.845 9.065 7.885V6.52C9.065 4.77 8.47 4 7.105 4ZM20.9038 6.135V19.365C20.9038 21.115 21.6738 21.78 22.8988 21.78C24.1238 21.78 24.8938 21.115 24.8938 19.365V6.135C24.8938 4.385 24.1238 3.72 22.8988 3.72C21.6738 3.72 20.9038 4.385 20.9038 6.135ZM17.0538 19.12V6.38C17.0538 2.46 19.1188 0.22 22.8988 0.22C26.6788 0.22 28.7438 2.46 28.7438 6.38V19.12C28.7438 23.04 26.6788 25.28 22.8988 25.28C19.1188 25.28 17.0538 23.04 17.0538 19.12ZM41.758 0.499998H45.328L41.303 12.4L45.608 25H41.548L38.398 15.305L35.213 25H31.608L35.913 12.4L31.888 0.499998H35.878L38.783 9.53L41.758 0.499998ZM56.2844 15.865H59.9244V19.12C59.9244 23.04 57.9644 25.28 54.1844 25.28C50.4044 25.28 48.4444 23.04 48.4444 19.12V6.38C48.4444 2.46 50.4044 0.22 54.1844 0.22C57.9644 0.22 59.9244 2.46 59.9244 6.38V8.76H56.2844V6.135C56.2844 4.385 55.5144 3.72 54.2894 3.72C53.0644 3.72 52.2944 4.385 52.2944 6.135V19.365C52.2944 21.115 53.0644 21.745 54.2894 21.745C55.5144 21.745 56.2844 21.115 56.2844 19.365V15.865ZM72.5504 0.499998L76.4704 25H72.5854L71.9204 20.555H67.1954L66.5304 25H62.9954L66.9154 0.499998H72.5504ZM69.5404 4.84L67.6854 17.23H71.3954L69.5404 4.84ZM91.9833 25H88.0633C87.8533 24.37 87.7133 23.985 87.7133 21.99V18.14C87.7133 15.865 86.9433 15.025 85.1933 15.025H83.8633V25H80.0133V0.499998H85.8233C89.8133 0.499998 91.5283 2.355 91.5283 6.135V8.06C91.5283 10.58 90.7233 12.225 89.0083 13.03C90.9333 13.835 91.5633 15.69 91.5633 18.245V22.025C91.5633 23.215 91.5983 24.09 91.9833 25ZM85.7183 4H83.8633V11.525H85.3683C86.8033 11.525 87.6783 10.895 87.6783 8.935V6.52C87.6783 4.77 87.0833 4 85.7183 4ZM95.3553 6.38C95.3553 2.46 97.2803 0.22 101.025 0.22C104.77 0.22 106.695 2.46 106.695 6.38V7.15H103.055V6.135C103.055 4.385 102.355 3.72 101.13 3.72C99.9053 3.72 99.2053 4.385 99.2053 6.135C99.2053 11.175 106.73 12.12 106.73 19.12C106.73 23.04 104.77 25.28 100.99 25.28C97.2103 25.28 95.2503 23.04 95.2503 19.12V17.615H98.8903V19.365C98.8903 21.115 99.6603 21.745 100.885 21.745C102.11 21.745 102.88 21.115 102.88 19.365C102.88 14.325 95.3553 13.38 95.3553 6.38Z"
                      fill="#050B20"
                    />
                  </svg>
                </div>
              </div>
              <div className="box-right">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="title">Invoice #</div>
                  <span className="code-num">0043128641</span>
                </div>
              </div>
            </div>
            <div className="wrap-date">
              <div className="box-left">
                <label htmlFor="">Invoice date:</label>
                <span className="date">03/10/2023</span>
              </div>
              <div className="box-right">
                <label htmlFor="">Due date:</label>
                <span className="date">03/10/2023</span>
              </div>
            </div>
            <div className="wrap-info">
              <div className="box-left">
                <div className="title">Supplier</div>
                <div className="sub">Jobio LLC</div>
                <p className="desc">
                  2301 Ravenswood Rd Madison, <br />
                  WI 53711
                </p>
              </div>
              <div className="box-right">
                <div className="title">Customer</div>
                <div className="sub">John Doe</div>
                <p className="desc">
                  329 Queensberry Street, North Melbourne <br />
                  VIC 3051, Australia.
                </p>
              </div>
            </div>
            <div className="wrap-table">
              <table className="invoice-table">
                <thead>
                  <tr className="title">
                    <th>Description</th>
                    <th>Price</th>
                    <th>VAT (20%)</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="content">
                    <td>Standard Plan</td>
                    <td>$443.00</td>
                    <td>$921.80</td>
                    <td>$9243</td>
                  </tr>
                  <tr className="content">
                    <td>Extra Plan</td>
                    <td>$413.00</td>
                    <td>$912.80</td>
                    <td>$5943</td>
                  </tr>
                  <tr className="content">
                    <td className="total">Total Due</td>
                    <td />
                    <td />
                    <td className="total">$9,750</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="footer">
            <ul className="box-contact">
              <li>www.boxcar.com</li>
              <li>invoice@boxcar.com</li>
              <li>(123) 123-456</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
