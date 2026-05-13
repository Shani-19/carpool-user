"use client";

import {
  truckLinks,
  carLinks,
  megaMenuData,
  tempPagesA,
  busesLinks,
  moreLinks,
  moreNavLinks, // Maira Edit
} from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
  const pathname = usePathname();

  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem?.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem?.length) {
      active = menuItem.some(
        (elm) => elm?.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem?.length) {
      menuItem.forEach((item) => {
        item?.links?.forEach((elm2) => {
          if (elm2?.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2?.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3?.href?.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item?.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
    }

    return active;
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const li = e.currentTarget.closest("li.current-dropdown");
    if (li) li.classList.toggle("open");
  };

  const topLinkStyle = { display: "inline-flex", alignItems: "center", color: "#ffffff" };

  return (
    <>
      {/* <li>
        <Link className={pathname == "/home" ? "menuActive" : ""} href={`/home`}>
          Home
        </Link>
      </li> */}

      {/* CARS */}
      <li className="current-dropdown current">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/cars"
            className={isMenuActive(carLinks) || pathname === "/cars" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Cars
          </Link>

          <button
            type="button"
            aria-label="Open Cars menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        {/* ===== 22/4/26 Maira Edit START -- Cars Mega Menu ===== */}
        <style>{`
          .cars-mega-link {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13.5px;
            font-weight: 400;
            color: #374151;
            text-decoration: none;
            padding: 6px 10px;
            border-radius: 6px;
            transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
          }
          .cars-mega-link:hover {
            background: #f3f4f6;
            color: #b91c1c;
            transform: translateX(2px);
          }
          .cars-mega-icon {
            width: 22px;
            height: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: #9ca3af;
            flex-shrink: 0;
            transition: color 0.18s ease;
          }
          .cars-mega-link:hover .cars-mega-icon {
            color: #b91c1c;
          }
          .cars-mega-icon img {
            width: 20px;
            height: 20px;
            object-fit: contain;
            display: block;
          }
          .cars-mega-heading {
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.4px;;
            color: #1f2937;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e5e7eb;
          }
        `}</style>
        <ul className="dropdown" style={{ padding: 0, margin: 0, listStyle: "none" }}>
          <li style={{ padding: 0 }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              gap: 0,
              padding: "28px 34px",
              width: "800px",
              boxSizing: "border-box",
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
              border: "1px solid #f0f0f0",
            }}>

              {/* Column 1: Make */}
              {/* Edited by Maira — icons replaced with arrows */}
              <div style={{ flex: "1 1 0", paddingRight: "28px" }}>
                <div className="cars-mega-heading">Make</div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {[
                    { label: "Audi", href: "/cars?make=audi" },
                    { label: "BMW", href: "/cars?make=bmw" },
                    { label: "Honda", href: "/cars?make=honda" },
                    { label: "Kia", href: "/cars?make=kia" },
                  ].map(({ label, href }) => (
                    <li key={label} style={{ marginBottom: "4px" }}>
                      <Link href={href} className="cars-mega-link">
                        <span className="cars-mega-icon cars-mega-arrow" aria-hidden="true">›</span>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Separator */}
              <div style={{ width: "1px", background: "#f0f0f0", alignSelf: "stretch", margin: "0 6px" }} />

              {/* Column 2: Vehicle Type */}
              {/* Edited by Maira — icons replaced with arrows */}
              <div style={{ flex: "1 1 0", paddingLeft: "28px", paddingRight: "28px" }}>
                <div className="cars-mega-heading">Vehicle Type</div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {[
                    { label: "Sedan", href: "/cars?type=sedan" },
                    { label: "SUV", href: "/cars?type=suv" },
                    { label: "Truck", href: "/cars?type=truck" },
                    { label: "Coupe", href: "/cars?type=coupe" },
                  ].map(({ label, href }) => (
                    <li key={label} style={{ marginBottom: "4px" }}>
                      <Link href={href} className="cars-mega-link">
                        <span className="cars-mega-icon cars-mega-arrow" aria-hidden="true">›</span>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Separator */}
              <div style={{ width: "1px", background: "#f0f0f0", alignSelf: "stretch", margin: "0 6px" }} />

              {/* Column 3: Fuel Type */}
              {/* Edited by Maira — icons replaced with arrows */}
              <div style={{ flex: "1 1 0", paddingLeft: "28px" }}>
                <div className="cars-mega-heading">Fuel Type</div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {[
                    { label: "Petrol", href: "/cars?fuel=petrol" },
                    { label: "Diesel", href: "/cars?fuel=diesel" },
                    { label: "Hybrid", href: "/cars?fuel=hybrid" },
                    { label: "Electric", href: "/cars?fuel=electric" },
                  ].map(({ label, href }) => (
                    <li key={label} style={{ marginBottom: "4px" }}>
                      <Link href={href} className="cars-mega-link">
                        <span className="cars-mega-icon cars-mega-arrow" aria-hidden="true">›</span>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </li>
        </ul>
        {/* ===== Maira Edit END ===== */}

        {/* 22/4/26 code old */}
        {/* <ul className="dropdown">
          {carLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul> */}
      </li>

      {/* SUVs (MEGA MENU) */}
      {/* 
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/suvs"
            className={isMenuActive(megaMenuData) || pathname === "/suvs" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            SUVs
          </Link>

          <button
            type="button"
            aria-label="Open SUVs menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        <div className="mega-menu">
          {megaMenuData.map((column, index) => (
            <div className="mega-column" key={index}>
              <h3 className={isMenuActive(column) ? "menuActive" : ""}>{column.title}</h3>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      className={
                        !link.inactive
                          ? isMenuActive(link)
                            ? "menuActive"
                            : ""
                          : ""
                      }
                      href={link.href}
                      title=""
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </li>
      */}

      {/* TRUCKS */}
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/trucks"
            className={isMenuActive(truckLinks) || pathname === "/trucks" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Trucks
          </Link>

          <button
            type="button"
            aria-label="Open Trucks menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        <ul className="dropdown">
          {truckLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* BUSES */}
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/buses"
            className={isMenuActive(busesLinks) || pathname === "/buses" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Buses
          </Link>

          <button
            type="button"
            aria-label="Open Buses menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              color: "white",
            }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>

        <ul className="dropdown">
          {busesLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>


      <li>
        <Link className={pathname === "/encar" ? "menuActive" : ""} href={`/encar`}>
          Domestic Cars
        </Link>
      </li>

      <li>
        <Link className={pathname === "/encar-import" ? "menuActive" : ""} href={`/encar-import`}>
          Import Cars
        </Link>
      </li>

      <li>
        <Link className={pathname == "/encar-cargo" ? "menuActive" : ""} href={`/encar-cargo`}>
          Cargo
        </Link>
      </li>

      {/* /////////// */}
      {/* <li>
        <Link className={pathname == "/events" ? "menuActive" : ""} href={`/blog-list-03`}>
          Events
        </Link>
      </li>

      <li>
        <Link className={pathname == "/shipping" ? "menuActive" : ""} href={`/terms`}>
          Shipping
        </Link>
      </li> */}

      {/* MORE */}
      {/* <li className="current-dropdown current">
        <span className={isMenuActive(moreLinks) ? "menuActive" : ""}>
          More <i className="fa-solid fa-angle-down" />
        </span>
        <ul className="dropdown">
          {moreLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li> */}

      {/* ===== 22/4/26 Maira Edit START -- Added More Dropdown Menu ===== */}
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="#!"
            className={isMenuActive(moreNavLinks) ? "menuActive" : ""}
            style={topLinkStyle}
          >
            More
          </Link>
          <button
            type="button"
            aria-label="Open More menu"
            className="nav-arrow"
            onClick={toggleDropdown}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, lineHeight: 1, color: "white" }}
          >
            <i className="fa-solid fa-angle-down" />
          </button>
        </div>
        <ul className="dropdown">
          {moreNavLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* ===== Maira Edit END ===== */}

      {/* THEME PAGES */}
      {/* 
      <li className="current-dropdown right-one">
        <span className={isMenuActive(tempPagesA) ? "menuActive" : ""}>
          tempPagesA <i className="fa-solid fa-angle-down" />
        </span>
        <ul className="dropdown">
          {tempPagesA.map((page, index) => (
            <li className={page.links ? "nav-sub" : ""} key={index}>
              {page.href?.includes("/") ? (
                <Link href={page.href} className={isMenuActive(page) ? "menuActive" : ""}>
                  {page.title} {page.iconClass && <i className={page.iconClass} />}
                </Link>
              ) : (
                <a className={isMenuActive(page.links) ? "menuActive" : ""}>
                  {page.title} {page.iconClass && <i className={page.iconClass} />}
                </a>
              )}

              {page.links && (
                <ul className="dropdown deep subnav-menu">
                  {page.links.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link className={isMenuActive(subItem) ? "menuActive" : ""} href={subItem.href} title="">
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </li>
      */}

    </>
  );
}
