"use client";

import {
  truckLinks,
  carLinks,
  megaMenuData,
  tempPagesA,
  busesLinks,
  bikesLinks,
  partsLinks,
  moreLinks,
  moreNavLinks, // Maira Edit
} from "@/data/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
/* Edited by Maira — dynamic Cars mega menu uses /cars filter source + same localStorage shape as Sidebar */
/* ===== Maira Edit START ===== */
import {
  getFilterOptions,
  toEncarStorageFilters,
  ENCAR_DOMESTIC_STORAGE_KEY,
} from "@/utils/vehicles/vehicleAPI";
import { DEFAULT_FILTERS, getStockRoute } from "@/constants/filters";
/* ===== Maira Edit END ===== */

export default function Nav() {
  const pathname = usePathname();

  /* Edited by Maira — load Cars mega-menu data from same source Sidebar uses */
  const router = useRouter();
  const [carMakes, setCarMakes] = useState([]);
  const [carVehicleTypes, setCarVehicleTypes] = useState([]);
  const [carFuelTypes, setCarFuelTypes] = useState([]);

  /* ===== Maira Edit START: Stock Switch ===== */
  const readStockTypeFromStorage = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("listing_filters_cars") || "null");
      return stored?.stockType === "other" ? "other" : "carpool";
    } catch {
      return "carpool";
    }
  };
  const [stockType, setStockType] = useState("carpool");
  useEffect(() => {
    // Hydrate from localStorage after mount (SSR-safe — localStorage is undefined on server)
    setStockType(readStockTypeFromStorage());
  }, []);
  const refreshStockType = () => setStockType(readStockTypeFromStorage());
  /* ===== Maira Edit END: Stock Switch ===== */

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        /* ===== Maira Edit START: Stock Switch ===== */
        const res = await getFilterOptions({}, "cars", stockType);
        /* ===== Maira Edit END: Stock Switch ===== */
        if (cancelled) return;
        if (res?.success && res?.data) {
          setCarMakes(res.data.makes || []);
          setCarVehicleTypes(res.data.vehicle_types || []);
          setCarFuelTypes(res.data.fuel_types || []);
        }
      } catch (e) {
        console.error("Failed to load Cars mega menu options:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [stockType /* Maira Edit: Stock Switch — was [] */]);

  /* Edited by Maira — write into the SAME localStorage key+shape Sidebar reads,
     using DEFAULT_FILTERS so unrelated keys keep their defaults. */
  /* ===== Maira Edit START ===== */
  // Routing is now DYNAMIC based on the preserved stockType:
  //   carpool → /cars, other → /encar (via getStockRoute).
  // For Other Stock we additionally rebuild encar_filters_domestic from
  // scratch (no merge with existing) so cleared/changed selections in the
  // mega menu don't leave stale values behind on /encar.
  // preservedStockType is lifted to function scope so router.push works even
  // if the try block throws (corrupt localStorage falls back to the default).
  const goToCarsWithFilter = (partial) => {
    let preservedStockType = DEFAULT_FILTERS.stockType;
    try {
      const key = "listing_filters_cars";
      const existing = JSON.parse(localStorage.getItem(key) || "null") || {};
      preservedStockType = existing.stockType || DEFAULT_FILTERS.stockType;
      const next = { ...DEFAULT_FILTERS, ...existing, ...partial, stockType: preservedStockType };
      localStorage.setItem(key, JSON.stringify(next));

      if (preservedStockType === "other") {
        const encarFilters = toEncarStorageFilters(next);
        localStorage.setItem(
          ENCAR_DOMESTIC_STORAGE_KEY,
          JSON.stringify(encarFilters)
        );
      }
    } catch {
      /* ignore localStorage write errors */
    }

    router.push(getStockRoute(preservedStockType));
  };
  /* ===== Maira Edit END ===== */

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
      {/* ===== Maira Edit START: Stock Switch ===== */}
      <li className="current-dropdown current" onMouseEnter={refreshStockType}>
        {/* ===== Maira Edit END: Stock Switch ===== */}
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

        {/* ===== Maira Edit START: Nav+Hero Fix ===== */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .cars-mega-link {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13.5px;
            font-weight: 400;
            color: #374151;
            text-decoration: none;
            padding: 7px 10px;
            border-radius: 8px;
            line-height: 1.2;
            transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
            min-width: 0;
            width: 100%;
            box-sizing: border-box;
            position: relative;
          }
          .cars-mega-link:hover {
            background: #fdf2f2;
            color: #b91c1c;
            transform: translateX(2px);
          }
          .cars-mega-label {
            flex: 1;
            min-width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
          .cars-mega-scroll {
            list-style: none;
            margin: 0;
            padding: 0 6px 0 0;
            scrollbar-width: thin;
            scrollbar-color: #e5e7eb transparent;
          }
          .cars-mega-scroll::-webkit-scrollbar {
            width: 4px;
          }
          .cars-mega-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .cars-mega-scroll::-webkit-scrollbar-thumb {
            background: #e5e7eb;
            border-radius: 4px;
          }
          .cars-mega-scroll::-webkit-scrollbar-thumb:hover {
            background: #d1d5db;
          }
          .cars-mega-scroll li {
            margin-bottom: 4px;
            width: 100%;
            position: relative;
          }
          .cars-mega-scroll li:last-child {
            margin-bottom: 0;
          }
        ` }} />
        {/* ===== Maira Edit END: Nav+Hero Fix ===== */}
        <ul className="dropdown" style={{ padding: 0, margin: 0, listStyle: "none" }}>
          <li style={{ padding: 0 }}>
            {/* ===== Maira Edit START: Nav+Hero Fix ===== */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              gap: 0,
              padding: "28px 34px",
              width: "fit-content",
              maxWidth: "95vw",
              right: 0,
              left: "auto",
              boxSizing: "border-box",
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
              border: "1px solid #f0f0f0",
              maxHeight: "420px",
              overflowY: "auto",
              overflowX: "hidden",
            }}>
              {/* ===== Maira Edit END: Nav+Hero Fix ===== */}

              {/* Column 1: Make */}
              {/* Edited by Maira — dynamic makes from getFilterOptions; click writes { make } and goes to /cars */}
              {/* Edited by Maira — Make column gets extra flex weight so long names like "Chevrolet (GM Daewoo)" fit on one line */}
              <div style={{ flex: "1.4 1 0", paddingRight: "28px" }}>
                <div className="cars-mega-heading">Make</div>
                <ul className="cars-mega-scroll">
                  {carMakes.map((m) => (
                    <li key={m.name}>
                      <a
                        href="#"
                        className="cars-mega-link"
                        title={m.name}
                        onClick={(e) => {
                          e.preventDefault();
                          goToCarsWithFilter({ make: m.name, model: "", model_detail: "" });
                        }}
                      >
                        <span className="cars-mega-icon cars-mega-arrow" aria-hidden="true">›</span>
                        <span className="cars-mega-label">{m.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Separator */}
              <div style={{ width: "1px", background: "#f0f0f0", alignSelf: "stretch", margin: "0 6px" }} />

              {/* Column 2: Vehicle Type */}
              {/* Edited by Maira — dynamic vehicle_types; click writes vehicle_type as ARRAY (Sidebar uses .includes) and resets make/model/model_detail */}
              <div style={{ flex: "1 1 0", paddingLeft: "28px", paddingRight: "28px" }}>
                <div className="cars-mega-heading">Vehicle Type</div>
                <ul className="cars-mega-scroll">
                  {carVehicleTypes.map((t) => (
                    <li key={t}>
                      <a
                        href="#"
                        className="cars-mega-link"
                        title={t}
                        onClick={(e) => {
                          e.preventDefault();
                          goToCarsWithFilter({ vehicle_type: [t], make: "", model: "", model_detail: "" });
                        }}
                      >
                        <span className="cars-mega-icon cars-mega-arrow" aria-hidden="true">›</span>
                        <span className="cars-mega-label">{t}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Separator */}
              <div style={{ width: "1px", background: "#f0f0f0", alignSelf: "stretch", margin: "0 6px" }} />

              {/* Column 3: Fuel Type */}
              {/* Edited by Maira — dynamic fuel_types; click writes fuel_types (PLURAL) as ARRAY and resets make/model/model_detail */}
              <div style={{ flex: "1 1 0", paddingLeft: "28px" }}>
                <div className="cars-mega-heading">Fuel Type</div>
                <ul className="cars-mega-scroll">
                  {carFuelTypes.map((f) => (
                    <li key={f}>
                      <a
                        href="#"
                        className="cars-mega-link"
                        title={f}
                        onClick={(e) => {
                          e.preventDefault();
                          goToCarsWithFilter({ fuel_types: [f], make: "", model: "", model_detail: "" });
                        }}
                      >
                        <span className="cars-mega-icon cars-mega-arrow" aria-hidden="true">›</span>
                        <span className="cars-mega-label">{f}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </li>
        </ul>
        {/* ===== Maira Edit END ===== */}
      </li>

      {/* SUVs (MEGA MENU) */}
      {/* <li className="current-dropdown">
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
      </li> */}

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

      {/* BIKES */}
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/bikes"
            className={isMenuActive(bikesLinks) || pathname === "/bikes" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Bikes
          </Link>

          <button
            type="button"
            aria-label="Open Bikes menu"
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
          {bikesLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* PARTS */}
      <li className="current-dropdown">
        <div className="nav-parent" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/parts"
            className={isMenuActive(partsLinks) || pathname === "/parts" ? "menuActive" : ""}
            style={topLinkStyle}
          >
            Parts
          </Link>

          <button
            type="button"
            aria-label="Open Parts menu"
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
          {partsLinks.map((link, index) => (
            <li key={index}>
              <Link className={isMenuActive(link) ? "menuActive" : ""} href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* OTHERS */}

      <li>
        <Link className={pathname === "/domestic" ? "menuActive" : ""} href={`/domestic`}>
          Domestic Cars
        </Link>
      </li>

      <li>
        <Link className={pathname === "/import" ? "menuActive" : ""} href={`/import`}>
          Import Cars
        </Link>
      </li>

      <li>
        <Link className={pathname == "/cargo" ? "menuActive" : ""} href={`/cargo`}>
          Cargo
        </Link>
      </li>

      {/* ===== Maira Edit START -- Added More Dropdown Menu ===== */}
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

      {/* THEME PAGES */}
      {/* <li className="current-dropdown right-one">
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
      </li> */}
    </>
  );
}
