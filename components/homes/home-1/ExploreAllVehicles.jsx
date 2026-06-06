"use client";
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://partners.carpoolkr.com/api";

const getMediaUrl = (tabId) => {
  if (tabId === 'buses') return process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/bus/thumbnail/";
  if (tabId === 'trucks') return process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/truck/thumbnail/";
  return process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW || "https://media.carpoolkr.com/assets/car/thumbnail/";
};

const formatCarpoolData = (items, tabId) => {
  return items.map(item => ({
    id: item.id,
    slug: item.slug,
    name: item.name || `${item.model_year} ${item.make}`,
    imageUrl: item.main_image ? `${getMediaUrl(tabId)}${item.main_image}` : '',
    model_year: item.model_year,
    make: item.make,
    fuel_type: item.fuel_type,
    transmission: item.transmission,
    odometer: item.odometer,
    final_price: item.final_price,
    price: item.price,
    badge: item.badge || '',
    linkUrl: `/${tabId}/${item.slug || item.id}`
  }));
};

const formatEncarData = (items, tabId) => {
  return items.map(item => ({
    id: item.Id,
    slug: item.Id,
    name: `${item.FormYear || ''} ${item.Manufacturer || ''} ${item.Model || ''} ${item.Badge || ''}`.trim(),
    imageUrl: item.Photo ? `${process.env.NEXT_PUBLIC_ENCAR_IMG_SRC || 'http://ci.encar.com'}${item.Photo}001.jpg?impolicy=heightRate&rh=192&cw=320&ch=192&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_04.png&wtmkg=SouthEast&wtmkw=70&wtmkh=30&t=20251217121649` : '',
    model_year: item.FormYear,
    make: item.Manufacturer,
    fuel_type: item.FuelType || '-',
    odometer: item.Mileage,
    final_price: item.Price,
    transmission: item?.Badge || null,
    price: null,
    capacity: item.Capacity || '-',
    badge: tabId === 'cargo' ? null : item.Badge,
    detail: tabId === 'cargo' ? item.FormDetail : null,
    tabId: tabId,
    linkUrl: `/${tabId}/${item.Id}`
  }));
};

const carpoolTabs = [
  { id: "cars", label: "Cars" },
  { id: "buses", label: "Buses" },
  { id: "trucks", label: "Trucks" },
];

const otherTabs = [
  { id: "domestic", label: "Domestic" },
  { id: "import", label: "Import" },
  { id: "cargo", label: "Cargo" },
];

export default function ExploreAllVehicles() {
  const [activeCarpoolTab, setActiveCarpoolTab] = useState(carpoolTabs[0]);
  const [carpoolData, setCarpoolData] = useState([]);
  const [loadingCarpool, setLoadingCarpool] = useState(false);

  const [activeOtherTab, setActiveOtherTab] = useState(otherTabs[0]);
  const [otherData, setOtherData] = useState([]);
  const [loadingOther, setLoadingOther] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingCarpool(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/${activeCarpoolTab.id}`);
        const rawData = res.data.data || [];
        // slice to limit to 20 items and format
        setCarpoolData(formatCarpoolData(rawData.slice(0, 20), activeCarpoolTab.id));
      } catch (err) {
        console.error(err);
        setCarpoolData([]);
      } finally {
        setLoadingCarpool(false);
      }
    };
    fetchData();
  }, [activeCarpoolTab]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingOther(true);
      try {
        let targetUrl = '';
        if (activeOtherTab.id === 'domestic') {
          targetUrl = '/api/encar/live?draw=1&start=0&length=20&sort=default&car_type=Y&category=car&lang=en';
        } else if (activeOtherTab.id === 'import') {
          targetUrl = '/api/encar/live?draw=1&start=0&length=20&sort=default&car_type=N&category=car&lang=en';
        } else if (activeOtherTab.id === 'cargo') {
          targetUrl = '/api/encar/live?draw=1&start=0&length=20&sort=default&car_type=Y&category=truck&lang=en';
        }

        const res = await axios.get(targetUrl);
        const rawData = res.data.data || [];
        setOtherData(formatEncarData(rawData, activeOtherTab.id));
      } catch (err) {
        console.error(err);
        setOtherData([]);
      } finally {
        setLoadingOther(false);
      }
    };
    fetchData();
  }, [activeOtherTab]);

  const options = {
    infinite: false,
    slidesToShow: 4.8,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderSlider = (items, loading) => {
    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (!items || items.length === 0) return <div className="text-center py-5">No vehicles found.</div>;

    return (
      <Slider {...options} className="row car-slider-three slider-layout-1 " data-preview="4.8">
        {items.map((car, index) => (
          <div key={car.id || index} className="box-car car-block-three col-lg-3 col-md-6 col-sm-12">
            <div className="inner-box">
              <div className="image-box">
                <figure className="image">
                  <Link href={car.linkUrl} target="_blank">
                    <Image
                      alt={car.name || "Vehicle Image"}
                      src={car.imageUrl || "/images/placeholder.jpg"}
                      width={329}
                      height={220}
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </Link>
                </figure>
              </div>
              <div className="content-box">
                <h6 className="title">
                  <Link href={car.linkUrl} target="_blank">
                    {car.name?.slice(0, 27)}
                  </Link>
                </h6>
                <div className="text"></div>
                <ul>

                  <li><i className="flaticon-gasoline-pump" /> {car.tabId === 'cargo' ? car.capacity : car.fuel_type}</li>
                  <li><i className="flaticon-gearbox" /> {car.tabId === 'cargo' ? car.detail?.slice(0, 15) : car.badge}</li>
                  <li><i className="flaticon-dashboard" /> {car.odometer?.toLocaleString()} km</li>
                </ul>
                <div className="btn-box">
                  <small>${car.final_price ? car.final_price?.toLocaleString() : '0'}</small>
                  <Link href={car.linkUrl} className="details">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <>
      <section className="cars-section-three">
        <div className="boxcar-container">

          {/* Carpool Vehicles Section */}
          <div className="boxcar-title wow fadeInUp mt-5">
            <h2>Carpool Vehicles</h2>
          </div>
          <nav className="wow fadeInUp" data-wow-delay="100ms">
            <div className="nav nav-tabs">
              {carpoolTabs.map((button, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCarpoolTab(button)}
                  className={`nav-link ${activeCarpoolTab.id === button.id ? "active" : ""}`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </nav>
          <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
            <div className="tab-pane fade show active">
              {renderSlider(carpoolData, loadingCarpool)}
            </div>
          </div>
        </div>
      </section>

      <section className="cars-section-three">
        <div className="boxcar-container">
          {/* Other Vehicles Section */}
          <div className="boxcar-title wow fadeInUp mt-5">
            <h2>Other Vehicles</h2>
          </div>
          <nav className="wow fadeInUp" data-wow-delay="100ms">
            <div className="nav nav-tabs">
              {otherTabs.map((button, index) => (
                <button
                  key={index}
                  onClick={() => setActiveOtherTab(button)}
                  className={`nav-link ${activeOtherTab.id === button.id ? "active" : ""}`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </nav>
          <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
            <div className="tab-pane fade show active">
              {renderSlider(otherData, loadingOther)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
