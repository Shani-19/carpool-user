'use client'
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { bookingAPI } from '@/utils/api';

import DetailCard from '@/components/dashboard/bookingDetails/DetailCard';
import { quotationConfig, consigneeConfig, documentConfig } from '@/config/bookingDetailsConfig';

export default function BookingDetailPage() {
  const params = useParams();
  const booking_num = params.booking_num;

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (booking_num) {
      fetchBookingDetails();
    }
  }, [booking_num]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await bookingAPI.bookingDetail(booking_num);
      // console.log('Booking detail response:', response);

      if (response.data.success) {
        setBookingData(response.data.data);
      } else {
        setError('Failed to load booking details');
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
      if (error.response?.status === 401) {
        setError('Please login to view booking details');
      } else if (error.response?.status === 404) {
        setError('Booking not found');
      } else {
        setError('Failed to load booking details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const transformBookingData = (booking) => {
    if (!booking) return null;

    const numOfBookings = bookingData.bookings.length;
    const vehicle = booking.car || booking.bus || booking.truck || booking.bike || booking.part;

    const vehicleType = booking.car ? 'Car' :
      booking.bus ? 'Bus' :
        booking.truck ? 'Truck' :
          booking.bike ? 'Bike' : 'Part';

    const imgPath = booking.car ? process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW :
      booking.bus ? process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW :
        booking.truck ? process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW :
          booking.bike ? process.env.NEXT_PUBLIC_BIKES_IMG_SRC_NEW :
            process.env.NEXT_PUBLIC_PARTS_IMG_SRC_NEW;

    const bookingType = numOfBookings == 1 ? 'Single' : booking.type == 'Container' ? 'Container' : 'Multiple';
    var finalPrice = vehicle.discount_price == 'NULL' ? vehicle.discount_price : vehicle.price - vehicle.discount_price;
    finalPrice = finalPrice.toLocaleString('en-US');

    return {
      id: booking.id,
      productImage: vehicle?.main_image ? imgPath + vehicle.main_image : "/images/resource/add-car1.jpg",
      brand: vehicle?.make?.name || 'Unknown',
      model: vehicle?.model?.name || 'Unknown',
      year: vehicle?.model_year || 'Unknown',
      vin: vehicle?.vin || 'Unknown',
      driveType: vehicle?.drive_type || '',
      bodyType: vehicle?.type?.name || vehicle?.ca?.name || '-',
      transmission: vehicle?.transmission || 'Unknown',
      seats: vehicle?.passenger ? `${vehicle.passenger} Seats` : '',
      fuelType: vehicle?.fuel?.name || 'Unknown',
      engine: vehicle?.engine_volume ? `${vehicle.engine_volume} CC` : 'Unknown',
      mileage: vehicle?.odometer ? `${vehicle.odometer} Km` : 'Unknown',
      bookingDate: booking.created_at ? new Date(booking.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) : 'Unknown Date',
      bookingNo: booking.booking_num || 'Unknown',
      status: booking.status === 'Complete' ? 'Completed' : booking.status || 'Unknown',
      vehicleType: vehicleType,
      bookingType: bookingType,
      bookedBy: booking.admin?.name || 'User',
      price: finalPrice,
      // portSizeId: vehicle?.port_size_id,
      // rawBooking: booking,
      // rawVehicle: vehicle
    };
  };

  const quotationVehicles = (booking) => {
    const vehicle = booking.car || booking.bus || booking.truck || booking.bike || booking.part;
    var finalPrice = vehicle.discount_price == 'NULL' ? vehicle.discount_price : vehicle.price - vehicle.discount_price;
    finalPrice = finalPrice.toLocaleString('en-US');

    return {
      id: booking.id,
      vehicleNo: vehicle.slug || 'Unknown',
      price: finalPrice,
      shipping_cost: booking.type == 'Container' ? '-' : booking.quotation.port_charges.charges
    };
  }

  // Show loading state
  if (loading) {
    return (
      <section className="dashboard-widget">
        <div className="right-box">
          <Sidebar />
          <div className="content-column">
            <div className="inner-column vh-100">
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading booking details...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error || !bookingData) {
    return (
      <section className="dashboard-widget">
        <div className="right-box">
          <Sidebar />
          <div className="content-column">
            <div className="inner-column">
              <div className="alert alert-danger" role="alert">
                {error || 'Failed to load booking details'}
                <button
                  className="btn btn-sm btn-outline-danger ms-3"
                  onClick={fetchBookingDetails}
                >
                  Try Again
                </button>
              </div>
              <Link href="/my-bookings" className="btn btn-primary">
                ← Back to Bookings
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const transformedBookings = bookingData.bookings.map(transformBookingData);
  const transformedQuotVehicles = bookingData.bookings.map(quotationVehicles);
  // console.log(transformedBookings, transformedQuotVehicles);

  const firstBooking = bookingData.bookings[0];
  const orderStatus = firstBooking.order_single ? firstBooking.order_single.order_status : firstBooking.status;
  const btnConditionA = !orderStatus && firstBooking.status !== 'Canceled';
  const btnConditionB = orderStatus && orderStatus === 'New';
  const btnDisplayCheck = btnConditionA || btnConditionB;
  // console.log(orderStatus, btnDisplayCheck, firstBooking)

  const vehType = firstBooking.car || firstBooking.bus || firstBooking.truck || firstBooking.bike || firstBooking.part;
  const portSizeId = vehType.port_size_id;
  // console.log(bookingData, portSizeId)

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Booking Details</h3>
              <div className="text">
                View complete booking information, vehicle details, booking status, and important updates in one place.
              </div>
            </div>

            <div className="my-listing-table wrap-listing myBookingSec">
              <div className="cart-table">

                {/* Summary Section */}
                <div className="detail-sec mt-0 mb-3">
                  <div className="card-body mbd-top-card border-0 shadow-sm">
                    <div className="row">

                      <div className="col-md-6">
                        <div className="info-item mb-1 pb-1 text-start">
                          <strong>Booking Status:</strong>
                          <div className="ms-2 d-inline-flex flex-wrap gap-1">
                            {Array.from(new Set(transformedBookings.map(b => b.status))).map(status => (
                              <span key={status} className={`badge d-status ${getStatusBadgeClass(status)}`}>
                                {status}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="info-item mb-1 pb-1 text-start">
                          <strong>Vehicle Categories:</strong>
                          <div className="ms-2 d-inline-flex flex-wrap gap-1">
                            {Array.from(new Set(transformedBookings.map(b => b.vehicleType))).map(type => (
                              <span key={type} className="badge bg-light text-muted">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="info-item mb-1 pb-1 text-start">
                          <strong> Booking Agent:
                            {/* <i className="fa fa-user font12 text-muted"></i> */}
                          </strong>
                          <a className="text-muted ms-2 fw-semibold" href="#">
                            {transformedBookings[0].bookedBy}
                          </a>
                        </p>

                      </div>
                      <div className="col-md-6">
                        <div className="info-item mb-1 pb-1 text-end">
                          <strong>Booking ID:</strong>
                          <span className="text-muted ms-2">{transformedBookings[0].bookingNo}</span>
                        </div>
                        <div className="info-item mb-1 pb-1 text-end">
                          <strong>Booking Date:</strong>
                          <span className="text-muted ms-2">
                            {transformedBookings[0]?.bookingDate || 'Unknown'}
                          </span>
                        </div>

                        <div className="info-item mb-1 pb-1 text-end">
                          <strong>Booking Type:</strong>
                          <span className="text-muted ms-2">{transformedBookings[0].bookingType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="car-list">
                  {transformedBookings.map((item, index) => (
                    <div key={`${item.id}-${index}`} className={"mb-booking-details" + index}>
                      <div className="car-card mbd-car-card">
                        <div className="mb-info-box">
                          <div className="car-image">
                            <Image
                              src={item.productImage}
                              alt={item.brand}
                              width={180}
                              height={120}
                              className="rounded"
                              // loading="lazy"
                              priority={index <= 2}
                            />
                          </div>
                          <div className="car-info">
                            <h4 className="car-title">
                              {item.year}, {item.brand}, {item.model}
                            </h4>
                            <p className="vin">Chassis No. {item.vin}</p>
                            <p className="mb-details">
                              {item.transmission ? item.transmission : ''}
                              {item.fuelType ? ' | ' + item.fuelType : ''}
                              {item.driveType ? ' | ' + item.driveType : ''}
                              {item.bodyType ? ' | ' + item.bodyType : ''}
                              {item.seats ? ' | ' + item.seats : ''}
                            </p>
                            <p className="mb-details">
                              <span className="badge bg-light text-danger me-1 fw-normal">{item.engine}</span>
                              <span className="badge bg-light text-danger me-1 fw-normal">{item.mileage}</span>
                            </p>
                          </div>
                        </div>
                        <div className="mb-card-right-box d-flex flex-column justify-content-between">
                          <p className="d-flex gap-2 align-items-center justify-content-end mb-0">
                            <span className="d-flex align-items-center">
                              <small>VCR:</small>
                              <span>
                                <input type="hidden" name="_token" value="" />
                                <input type="hidden" name="id" value="" />
                                <button className="btn btn-link btn-xs" type="submit" name="Submit" style={{ display: 'inline', color: 'gray' }}>
                                  <i className="fa fa-download"></i>
                                </button>
                              </span>
                            </span>
                          </p>
                          <div className="booking-info">
                            <div className="price_p txt-primary fw-bold fs-6">
                              USD {item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* No results message */}
                  {transformedBookings.length === 0 && (
                    <div className="text-center py-5">
                      <h5>No vehicles found in this booking</h5>
                      <Link href="/my-bookings" className="btn btn-primary">
                        Back to Bookings
                      </Link>
                    </div>
                  )}
                </div>

                <DetailCard
                  title="Quotation Request Details"
                  section="quotation"
                  data={bookingData.bookings[0].quotation}
                  countries={bookingData.countries}
                  PortCharges={bookingData.PortCharges}
                  ports={bookingData.ports}
                  vehicles={transformedQuotVehicles}
                  config={quotationConfig}
                  // onEdit={() => handleEdit('quotation')}
                  editable={btnDisplayCheck}
                  bookingType={transformedBookings[0].bookingType}
                  portSizeId={portSizeId}
                />
                <DetailCard
                  title="Consignee (Receiver Information)"
                  section="consignee"
                  data={bookingData.bookings[0].consignee}
                  countries={bookingData.countries}
                  config={consigneeConfig}
                  // onEdit={() => handleEdit('consignee')}
                  editable={btnDisplayCheck}
                  bookingType={transformedBookings[0].bookingType}
                />
                <DetailCard
                  title="Document Delivery Detail"
                  section="document"
                  data={bookingData.bookings[0].documents}
                  countries={bookingData.countries}
                  config={documentConfig}
                  // onEdit={() => handleEdit('document')}
                  editable={btnDisplayCheck}
                  bookingType={transformedBookings.bookingType}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper functions for status styling
function getStatusBadgeClass(status) {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-light text-success';
    case 'canceled':
    case 'cancelled':
      return 'bg-light text-danger';
    case 'pending':
    case 'waiting':
      return 'bg-light text-warning';
    default:
      return 'bg-light text-warning';
  }
}