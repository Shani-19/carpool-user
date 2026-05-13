"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";

/* Edited by Maira */

const quickLinks = [
  { name: "FAQ", link: "/faq" },
  { name: "Claim Center", link: "/claim-center" },
  { name: "Events", link: "/events" },
  { name: "Reviews", link: "/reviews" },
  { name: "Our Team", link: "/team" },
  { name: "Site Map", link: "/sitemap" },
  { name: "About Us", link: "/about" },
  { name: "Privacy Policy", link: "/privacy" },
  { name: "Contact Us", link: "/contact" },
  { name: "Terms & Conditions", link: "/terms" },
];

const officeHours = [
  { label: "Monday – Friday", value: "09:00 – 18:00" },
  { label: "Saturday", value: "09:00 – 14:30" },
  { label: "Sunday", value: "Closed", muted: true },
];

/* Edited by Maira — social links (real URLs / placeholders) */
const socialLinks = [
  { icon: "fa-brands fa-facebook-f", link: "https://www.facebook.com/carpoolkorea", label: "Facebook" },
  { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/carpoolkorea", label: "Instagram" },
  { icon: "fa-brands fa-youtube", link: "https://www.youtube.com/@carpoolkorea", label: "YouTube" },
  { icon: "fa-brands fa-linkedin-in", link: "https://www.linkedin.com/company/carpoolkorea", label: "LinkedIn" },
];

/* Edited by Maira — app download links (placeholders) */
const appLinks = {
  apple: "https://www.apple.com/app-store/",
  google: "https://play.google.com/store",
};

export default function Footer() {
  const [isClient, setIsClient] = useState(false);
  const isAuthenticated = getCookie("isAuthenticated");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="cpk-footer">
      {/* Edited by Maira */}
      <div className="cpk-footer-inner">
        <div className="cpk-footer-grid">
          <div>
            <h3 className="cpk-brand">
              CarPool <span>Korea</span>
            </h3>
            <p className="cpk-brand-desc">
              A trusted vehicle export platform connecting international buyers
              with quality pre-owned cars, SUVs, trucks and buses sourced directly
              from South Korea — backed by transparent pricing and professional
              end-to-end logistics.
            </p>
            <p className="cpk-tagline">
              Exporting Verified Korean Vehicles Worldwide with Transparent Pricing
            </p>
            {/* Edited by Maira — social icons */}
            <ul className="cpk-social">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.link}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* Edited by Maira — Quick Menu replaces Explore */}
            <h4 className="cpk-col-title">Quick Menu</h4>
            <ul className="cpk-links cpk-quickmenu">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.link}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="cpk-col-title">Office Hours</h4>
            <ul className="cpk-hours">
              {officeHours.map((h) => (
                <li key={h.label}>
                  {/* Edited by Maira — muted Sunday label */}
                  <span className={h.muted ? "label muted-label" : "label"}>
                    {h.label}
                  </span>
                  <span className={h.muted ? "value closed" : "value"}>
                    {h.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="cpk-col-title">Get in Touch</h4>
            <div className="cpk-contact">
              <div className="cpk-contact-row">
                <i className="fa-solid fa-location-dot" />
                <span>
                  358-6, Wolha-ro, Tongjin-eup,
                  <br />
                  Gimpo-si, Gyeonggi-do, South Korea
                </span>
              </div>
              <div className="cpk-contact-row">
                <i className="fa-solid fa-phone" />
                <a href="tel:+821094840471">+82-109-484-0471</a>
              </div>
              <div className="cpk-contact-row">
                <i className="fa-solid fa-envelope" />
                <a href="mailto:sales@carpoolkr.com">sales@carpoolkr.com</a>
              </div>
            </div>
            {/* Edited by Maira — app download buttons */}
            <div className="cpk-apps">
              <a
                href={appLinks.apple}
                className="cpk-app-btn"
                aria-label="Download on the Apple Store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-apple" />
                <span>
                  <small>Download on the</small>
                  <strong>Apple Store</strong>
                </span>
              </a>
              <a
                href={appLinks.google}
                className="cpk-app-btn"
                aria-label="Get it on Google Play"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-google-play" />
                <span>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="cpk-bottom">
        <div className="cpk-bottom-inner">
          <div>© {year} CarPool Korea. All rights reserved.</div>
          <ul className="cpk-bottom-nav">
            {isClient && isAuthenticated ? (
              <li>
                <Link href="/profile">My Profile</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login">Sign In</Link>
                </li>
                <li>
                  <Link href="/login">Sign Up</Link>
                </li>
              </>
            )}
            <li className="cpk-bottom-divider" aria-hidden="true" />
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
