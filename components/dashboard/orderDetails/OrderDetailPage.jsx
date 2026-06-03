'use client'
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import Sidebar from "@/components/dashboard/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { orderAPI } from '@/utils/api';
import { useAuth } from "@/context/AuthContext";
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import axios from 'axios';

export default function OrderDetailPage({ initialData, order_num: propOrderNum }) {
  const params = useParams();
  const order_num = propOrderNum || params.order_num;

  const [orderData, setOrderData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');
  const [isContainerModalOpen, setIsContainerModalOpen] = useState(false);
  const { user } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileType, setFileType] = useState('image'); // 'image' or 'pdf'
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({ type: '', text: '' });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Claim Form State
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimForm, setClaimForm] = useState({
    cc: '',
    description: '',
    claim_amount: '',
    ytvideo: '',
    images: [],
    videos: [],
  });
  const [claimUploading, setClaimUploading] = useState(false);
  const [claimSubmitting, setClaimSubmitting] = useState(false);
  const [claimMessage, setClaimMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (order_num && !orderData) {
      fetchOrderDetails();
      console.log('order_num:', order_num);
    }
  }, [order_num, orderData]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await orderAPI.orderDetail(order_num);
      console.log('Order detail response:', response);

      if (response.data.success) {
        setOrderData(response.data.data);
      } else {
        setError('Failed to load order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      if (error.response?.status === 401) {
        setError('Please login to view order details');
      } else if (error.response?.status === 404) {
        setError('Order not found');
      } else {
        setError('Failed to load order details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      if (fileType === 'pdf') {
        if (files[0].type !== 'application/pdf') {
          setUploadMessage({ type: 'danger', text: 'Please select a PDF file.' });
          setSelectedFiles([]);
          return;
        }
        setSelectedFiles([files[0]]);
      } else {
        const invalidFiles = files.filter(f => !f.type.startsWith('image/'));
        if (invalidFiles.length > 0) {
          setUploadMessage({ type: 'danger', text: 'Please select only image files.' });
          setSelectedFiles([]);
          return;
        }
        setSelectedFiles(files);
      }
      setUploadMessage({ type: '', text: '' });
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadMessage({ type: 'danger', text: 'Please select a file first.' });
      return;
    }

    setUploading(true);
    setUploadMessage({ type: 'info', text: 'Uploading...' });

    try {
      const formData = new FormData();
      formData.append('user_id', user?.id || '');
      formData.append('order_num', order_num);
      formData.append('file_type', fileType);
      formData.append('receipt_no', orderData.order_status_id === 6 ? '2' : '1');

      selectedFiles.forEach((file) => {
        formData.append('file[]', file);
      });

      const response = await orderAPI.orderReceipt(formData);
      console.log('Order receipt response:', response);

      if (response.data.success) {
        setUploadMessage({ type: 'success', text: response.data.message || 'Receipt uploaded successfully!' });
        setSelectedFiles([]);
        fetchOrderDetails();
        setTimeout(() => setIsUploadModalOpen(false), 2000);
      } else {
        setUploadMessage({ type: 'danger', text: response.data.message || 'Upload failed.' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      let errorMessage = 'Error uploading receipt. Please try again.';

      if (error.response) {
        // Validation errors (422)
        if (error.response.status === 422 && error.response.data.errors) {
          errorMessage = Object.values(error.response.data.errors)[0][0];
        }
        // Backend specific messages (e.g. 403 Security Violation, 500 Server Error)
        else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      setUploadMessage({ type: 'danger', text: errorMessage });
    } finally {
      setUploading(false);
    }
  };

  const handleClaimFileChange = async (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setClaimUploading(true);
    setClaimMessage({ type: 'info', text: `Uploading ${type}...` });

    try {
      const updatedFiles = type === 'video' ? [...claimForm.videos] : [...claimForm.images];

      for (const file of files) {
        // Get Presigned URL
        const presignRes = await fetch('/api/s3-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            type: type
          })
        });

        if (!presignRes.ok) throw new Error('Failed to get upload URL');
        const { presignedUrl, key } = await presignRes.json();

        // Upload directly to S3
        await axios.put(presignedUrl, file, {
          headers: { 'Content-Type': file.type }
        });

        updatedFiles.push(key);
      }

      setClaimForm(prev => ({
        ...prev,
        [type === 'video' ? 'videos' : 'images']: updatedFiles
      }));
      setClaimMessage({ type: 'success', text: `${type === 'video' ? 'Video' : 'Image'} uploaded successfully!` });

    } catch (error) {
      console.error('S3 Upload Error:', error);
      setClaimMessage({ type: 'danger', text: 'Error uploading file. Please try again.' });
    } finally {
      setClaimUploading(false);
    }
  };

  const submitClaimData = async () => {
    if (!claimForm.cc || !claimForm.description || !claimForm.claim_amount) {
      setClaimMessage({ type: 'danger', text: 'Please fill in all required fields (CC, Description, Amount).' });
      return;
    }

    setClaimSubmitting(true);
    setClaimMessage({ type: 'info', text: 'Submitting claim...' });

    try {
      const payload = {
        ...claimForm,
        order_id: orderData.id,
      };

      const response = await orderAPI.submitClaim(payload);
      if (response.data.success) {
        setClaimMessage({ type: 'success', text: 'Claim submitted successfully!' });
        setTimeout(() => {
          setIsClaimModalOpen(false);
          fetchOrderDetails();
        }, 2000);
      } else {
        setClaimMessage({ type: 'danger', text: response.data.message || 'Submission failed.' });
      }
    } catch (error) {
      console.error('Submit Claim Error:', error);
      setClaimMessage({ type: 'danger', text: 'Failed to submit claim. Please try again.' });
    } finally {
      setClaimSubmitting(false);
    }
  };

  const transformOrderData = (booking) => {
    if (!booking) return null;

    const vehicle = booking.car || booking.bus || booking.truck;
    const vehicleType = booking.car ? 'Car' : booking.bus ? 'Bus' : 'Truck';
    const imgPath = booking.car ? process.env.NEXT_PUBLIC_CARS_IMG_SRC_NEW :
      booking.bus ? process.env.NEXT_PUBLIC_BUSES_IMG_SRC_NEW :
        process.env.NEXT_PUBLIC_TRUCKS_IMG_SRC_NEW;

    let finalPrice = vehicle.discount_price == 'NULL' ? vehicle.price : vehicle.price - vehicle.discount_price;
    const formattedPrice = finalPrice.toLocaleString('en-US');

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
      status: booking.status === 'Complete' ? 'Completed' : booking.status || 'Unknown',
      vehicleType: vehicleType,
      price: formattedPrice,
    };
  };


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
                <p className="mt-2">Loading order details...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error || !orderData) {
    return (
      <section className="dashboard-widget">
        <div className="right-box">
          <Sidebar />
          <div className="content-column">
            <div className="inner-column">
              <div className="alert alert-danger" role="alert">
                {error || 'Failed to load order details'}
                <button
                  className="btn btn-sm btn-outline-danger ms-3"
                  onClick={fetchOrderDetails}
                >
                  Try Again
                </button>
              </div>
              <Link href="/my-orders" className="btn btn-primary">
                ← Back to Orders
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Extract bookings based on order type
  const bookings = orderData.booking_id
    ? [orderData.booking]
    : (orderData.mul || []).map(m => m.booking);

  const transformedOrders = bookings.map(transformOrderData);

  const totalPayment = orderData.payment_price || '-';
  const orderNo = orderData.order_tracking_no || 'Unknown';
  const orderDate = orderData.created_at ? new Date(orderData.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'Unknown Date';
  const orderType = orderData.booking_id
    ? 'Single'
    : orderData.invoice_type == 1
      ? 'Container'
      : 'Multiple';
  const bookedBy = orderData.admin?.name || 'Admin';
  const salesPerson = orderData.req_admin?.name || '-';
  const orderStatus = orderData.order_status || 'Unknown';
  const orderCcode = orderData.c_code || '-';

  const firstBooking = bookings[0];
  const orderStatusDetail = firstBooking?.order_single ? firstBooking.order_single.order_status : firstBooking?.order_mul?.status;
  const btnConditionA = !orderStatusDetail && firstBooking?.status !== 'Canceled';
  const btnConditionB = orderStatusDetail && orderStatusDetail === 'New';
  const btnDisplayCheck = btnConditionA || btnConditionB;

  const vehType = firstBooking?.car || firstBooking?.bus || firstBooking?.truck;
  const containerBaseUrl = "https://img.carpoolkr.com/assets/container/";

  // cc/ce live in booking_files — collect from single booking or all mul bookings
  const allBookingFiles = orderData.booking_id
    ? [orderData.booking?.booking_files].filter(Boolean)
    : (orderData.mul || []).map(m => m.booking?.booking_files).filter(Boolean);
  const firstCc = allBookingFiles.find(bf => bf?.cc)?.cc || null;
  const firstCe = allBookingFiles.find(bf => bf?.ce)?.ce || null;

  const shipInfo = orderData.ship || null;
  const claimData = orderData.clm || orderData.claim || null;
  const hasClaim = claimData && (!Array.isArray(claimData) || claimData.length > 0);

  const orderDocuments = [
    { label: 'Invoice', file: orderData.Invoice, route: '/order-invoice' },
    { label: 'Payment receipt (1st)', file: orderData.payment_receipt, condition: orderData.receipt_status === 'Verified', route: '/order-receipt' },
    { label: 'B/L', file: orderData.bl, route: '/order-bl' },
    { label: 'Payment receipt (2nd)', file: orderData.payment_receipt_1, condition: orderData.receipt_status_1 === 'Verified', route: '/order-receipt' },
    { label: 'B/L Surrender', file: orderData.bl_slander, route: '/order-blsur' },
    { label: 'B/L Receipt', file: orderData.bl_receipt_pdf, route: '/order-document' },
    { label: 'B/L Document', file: orderData.bl_document_pdf, route: '/order-document' },
    { label: 'C/E', file: firstCe, route: '/order-ce' },
    { label: 'C/C', file: firstCc, route: '/order-cc' },
    {
      label: 'Container Images',
      file: (Array.isArray(orderData.cont) && orderData.cont.length > 0) ? orderData.cont : null,
      isContainer: true
    },
  ].filter(doc => doc.file && (doc.condition === undefined || doc.condition));

  const handleDownload = (doc) => {
    if (!doc.route) return;
    const downName = `${doc.label.replace(/[^a-zA-Z0-9]/g, '_')}-${orderNo}.pdf`;
    const payload = { name: doc.file, downname: downName, type: 'down' };
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://media.carpoolkr.com${doc.route}`;
    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  // Process container images: sort by position
  const containerImages = Array.isArray(orderData.cont)
    ? [...orderData.cont].sort((a, b) => (a.position || 0) - (b.position || 0))
    : orderData.cont ? [orderData.cont] : [];

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h3 className="title">Order Details</h3>
                <div className="text">
                  This website is the most safe and convenient way for the deal through Carpool Korea.
                </div>
              </div>
              {!hasClaim && (
                <div>
                  <button
                    onClick={() => setIsClaimModalOpen(true)}
                    className="btn btn-outline-danger shadow-sm fw-bold">
                    <i className="fa fa-exclamation-triangle me-2"></i> Report Claim
                  </button>
                </div>
              )}
            </div>

            <div className="my-listing-table wrap-listing myBookingSec">
              <div className="cart-table">

                {/* Summary Section */}
                <div className="detail-sec mt-0 mb-3">
                  <div className="card-body mbd-top-card border-0 shadow-sm">
                    <div className="row">

                      <div className="col-md-6">
                        <div className="info-item mb-1 pb-1 text-start">
                          <strong>Order Status:</strong>
                          <div className="ms-2 d-inline-flex flex-wrap gap-1">
                            <span className={`badge d-status ${getStatusBadgeClass(orderStatus)}`}>
                              {orderStatus}
                            </span>
                          </div>
                        </div>

                        <div className="info-item mb-1 pb-1 text-start">
                          <strong>Vehicle Types:</strong>
                          <div className="ms-2 d-inline-flex flex-wrap gap-1">
                            {Array.from(new Set(transformedOrders.map(b => b.vehicleType))).map(type => (
                              <span key={type} className="badge bg-light text-muted">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="info-item mb-1 pb-1 text-start">
                          <strong>Invoice Type:</strong>
                          <span className="text-muted ms-2">{orderType}</span>
                        </div>

                        <p className="info-item mb-1 pb-1 text-start">
                          <strong> Staff Handled by:</strong>
                          <a className="text-muted ms-2 fw-semibold" href="#">
                            {bookedBy}
                          </a>
                        </p>
                        <p className="info-item mb-1 pb-1 text-start">
                          <strong> Salesperson:</strong>
                          <a className="text-muted ms-2 fw-semibold" href="#">
                            {salesPerson}
                          </a>
                        </p>

                      </div>
                      <div className="col-md-6">
                        <div className="info-item mb-1 pb-1 text-end">
                          <strong>Order Number:</strong>
                          <span className="text-muted ms-2">{orderNo}</span>
                        </div>
                        <div className="info-item mb-1 pb-1 text-end">
                          <strong>Order Date:</strong>
                          <span className="text-muted ms-2">
                            {orderDate}
                          </span>
                        </div>

                        <p className="info-item mb-1 pb-1 text-end">
                          <strong>Customer Code:</strong>
                          <span className="text-muted ms-2">{orderCcode}</span>
                        </p>

                        <div className="info-item mb-1 pb-1 text-end">
                          <strong>Total Payment:</strong>
                          <span className="text-muted ms-2">$ {totalPayment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Receipt Upload Section moved to modal and trigger placed after car list */}


                <div className="car-list">
                  {transformedOrders.map((item, index) => (
                    <div key={`${item.id}-${index}`} className={"mb-order-details" + index}>
                      <div className="car-card mbd-car-card">
                        <div className="mb-info-box">
                          <div className="car-image">
                            <Image
                              src={item.productImage}
                              alt={item.brand}
                              width={450}
                              height={300}
                              className="rounded"
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
                                <button className="btn btn-link btn-xs" type="button" style={{ display: 'inline', color: 'gray' }}>
                                  <i className="fa fa-download"></i>
                                </button>
                              </span>
                            </span>
                          </p>
                          <div className="order-info">
                            <div className="price_p txt-primary fw-bold fs-6">
                              USD {item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {transformedOrders.length === 0 && (
                    <div className="text-center py-5">
                      <h5>No vehicles found in this order</h5>
                      <Link href="/my-orders" className="btn btn-primary">
                        Back to Orders
                      </Link>
                    </div>
                  )}
                </div>

                {/* Upload Receipt Trigger Section */}
                {(orderData.order_status_id === 2 || orderData.order_status_id === 3 || orderData.order_status_id === 6) && (
                  <div className="detail-sec mt-4">
                    <div className="card-body mbd-top-card border-0 shadow-sm p-4 bg-white rounded d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                      <div>
                        <h5 className="mb-1 fw-bold">
                          {orderData.order_status_id === 6 ? 'Final Payment Receipt' : '1st Payment Receipt'}
                        </h5>
                        <p className="text-muted small mb-0">Please upload your payment receipt to proceed with the order.</p>
                      </div>
                      <button
                        className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center"
                        onClick={() => setIsUploadModalOpen(true)}
                      >
                        <i className="fa fa-cloud-upload-alt me-2"></i>
                        Upload Receipt
                      </button>
                    </div>
                  </div>
                )}

                {/* Order Progress Wizard */}
                <div className="detail-sec mt-4">
                  <div className="card-body mbd-top-card border-0 shadow-sm p-4">
                    <div className="d-flex align-items-center mb-4">
                      <i className="fa fa-tasks text-primary me-3 fs-4"></i>
                      <h5 className="mb-0 fs-5 fw-bold">Order Progress</h5>
                    </div>
                    <OrderProgressWizard currentStep={orderData.order_status_id} />
                  </div>
                </div>

                {/* Documents Section */}
                {orderDocuments.length > 0 && (
                  <div className="detail-sec mt-4">
                    <div className="card-body mbd-top-card border-0 shadow-sm p-4">
                      <div className="d-flex align-items-center mb-4">
                        <i className="fa fa-file-invoice text-primary me-3 fs-4"></i>
                        <h5 className="mb-0 fs-5 fw-bold">Order Documents & Resources</h5>
                      </div>
                      <div className="row g-3">
                        {orderDocuments.map((doc, idx) => (
                          <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                            {doc.isContainer ? (
                              <div
                                onClick={() => setIsContainerModalOpen(true)}
                                className="d-flex align-items-center p-2 border rounded text-decoration-none"
                                style={{ backgroundColor: '#f8f9fa', transition: 'all 0.2s', cursor: 'pointer' }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                              >
                                <div className="bg-white rounded p-2 me-2 border text-center" style={{ width: '40px' }}>
                                  <i className="fa fa-images text-success"></i>
                                </div>
                                <div className="overflow-hidden">
                                  <div className="text-dark fw-semibold small text-truncate" title={doc.label}>
                                    {doc.label}
                                  </div>
                                  <div className="text-muted text-truncate" style={{ fontSize: '0.7rem' }}>
                                    View {containerImages.length} Images
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => handleDownload(doc)}
                                className="d-flex align-items-center p-2 border rounded text-decoration-none"
                                style={{ backgroundColor: '#f8f9fa', transition: 'all 0.2s', cursor: 'pointer' }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                              >
                                <div className="bg-white rounded p-2 me-2 border text-center" style={{ width: '40px' }}>
                                  <i className="fa fa-download text-primary"></i>
                                </div>
                                <div className="overflow-hidden">
                                  <div className="text-dark fw-semibold small text-truncate" title={doc.label}>
                                    {doc.label}
                                  </div>
                                  <div className="text-muted text-truncate" style={{ fontSize: '0.7rem' }}>
                                    Download PDF
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}


                {/* Shipping Information Section */}
                {shipInfo && (
                  <div className="detail-sec mt-4">
                    <div className="card-body mbd-top-card border-0 shadow-sm p-4">
                      <div className="d-flex align-items-center mb-4">
                        <i className="fa fa-ship text-primary me-3 fs-4"></i>
                        <h5 className="mb-0 fs-5 fw-bold">Shipping Information</h5>
                      </div>
                      <ShippingInfoTable ship={shipInfo} />
                    </div>
                  </div>
                )}

                {/* Claim Information Section */}
                {hasClaim && (
                  <div className="detail-sec mt-4">
                    <div className="card-body mbd-top-card border-0 shadow-sm p-4">
                      <div className="d-flex align-items-center mb-4">
                        <i className="fa fa-exclamation-circle text-danger me-3 fs-4"></i>
                        <h5 className="mb-0 fs-5 fw-bold">Claim Information</h5>
                      </div>
                      <ClaimInfoTable clm={claimData} order={orderData} />
                    </div>
                  </div>
                )}

                {/* Container Images Modal */}
                {isContainerModalOpen && (
                  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content border-0 shadow-lg">
                        <div className="modal-header border-0 bg-dark text-white">
                          <h5 className="modal-title text-white">Container Images ({containerImages.length})</h5>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setIsContainerModalOpen(false)}
                          ></button>
                        </div>
                        <div className="modal-body p-4 bg-light">
                          <div className="row g-3">
                            {containerImages.map((img, idx) => (
                              <div key={idx} className="col-md-6 col-lg-4">
                                <div className="card border-0 shadow-sm overflow-hidden h-100">
                                  <Image
                                    src={containerBaseUrl + img.image}
                                    alt={`Container ${idx + 1}`}
                                    width={400}
                                    height={300}
                                    className="img-fluid object-fit-cover"
                                    style={{ height: '200px' }}
                                  />
                                  <div className="card-body p-2 text-center bg-white">
                                    <span className="badge bg-secondary">{img.position || (idx + 1)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="modal-footer border-0">
                          <button
                            type="button"
                            className="btn btn-secondary px-4"
                            onClick={() => setIsContainerModalOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Receipt Modal */}
                {isUploadModalOpen && (
                  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }}>
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header border-0 bg-dark text-white px-4 py-3">
                          <div className="d-flex align-items-center">
                            <i className="fa fa-cloud-upload-alt me-3 fs-5"></i>
                            <h5 className="modal-title fw-bold text-white">
                              {orderData.order_status_id === 6 ? 'Final Payment Receipt' : '1st Payment Receipt'}
                            </h5>
                          </div>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => { setIsUploadModalOpen(false); setUploadMessage({ type: '', text: '' }); setSelectedFiles([]); }}
                          ></button>
                        </div>
                        <div className="modal-body p-4 bg-light">
                          <div className="mb-4">
                            <label className="form-label small fw-bold text-uppercase text-muted mb-2">Select File Type</label>
                            <div className="d-flex gap-2">
                              <button
                                type="button"
                                className={`btn flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2 ${fileType === 'image' ? 'btn-primary text-white' : 'btn-white border'}`}
                                onClick={() => { setFileType('image'); setSelectedFiles([]); setUploadMessage({ type: '', text: '' }); }}
                              >
                                <i className="fa fa-image"></i> Image
                              </button>
                              <button
                                type="button"
                                className={`btn flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2 ${fileType === 'pdf' ? 'btn-primary text-white' : 'btn-white border'}`}
                                onClick={() => { setFileType('pdf'); setSelectedFiles([]); setUploadMessage({ type: '', text: '' }); }}
                              >
                                <i className="fa fa-file-pdf"></i> PDF
                              </button>
                            </div>
                          </div>

                          <label htmlFor="receipt-upload-modal" className="upload-dropzone p-5 border rounded-3 bg-white text-center position-relative mb-3 d-block w-100"
                            style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: '#dee2e6', transition: 'all 0.2s', cursor: 'pointer' }}>
                            <input
                              type="file"
                              id="receipt-upload-modal"
                              className="d-none"
                              onChange={handleFileChange}
                              accept={fileType === 'pdf' ? 'application/pdf' : 'image/*'}
                              multiple={fileType === 'image'}
                            />
                            <div className="py-2">
                              <div className={`mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle ${selectedFiles.length > 0 ? 'bg-success bg-opacity-10' : 'bg-light'}`} style={{ width: '80px', height: '80px' }}>
                                <i className={`fa ${selectedFiles.length > 0 ? 'fa-check text-success' : (fileType === 'pdf' ? 'fa-file-pdf text-danger' : 'fa-image text-info')} fs-1`}></i>
                              </div>
                              {selectedFiles.length > 0 ? (
                                <div>
                                  <p className="fw-bold text-dark mb-1 text-truncate px-3">
                                    {selectedFiles.length === 1 ? selectedFiles[0].name : `${selectedFiles.length} files selected`}
                                  </p>
                                  <p className="small text-success fw-semibold">Ready to upload</p>
                                </div>
                              ) : (
                                <div>
                                  <p className="fw-bold text-dark mb-1">Select your {fileType} file{fileType === 'image' ? 's' : ''}</p>
                                  <p className="small text-muted mb-0">Drag & drop or click to browse</p>
                                </div>
                              )}
                            </div>
                          </label>

                          {uploadMessage.text && (
                            <div className={`alert alert-${uploadMessage.type} border-0 shadow-sm mb-0 py-3 px-4 small d-flex align-items-center`}>
                              <i className={`fa ${uploadMessage.type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} me-3 fs-5`}></i>
                              <div>{uploadMessage.text}</div>
                            </div>
                          )}
                        </div>
                        <div className="modal-footer border-0 p-4 bg-white d-flex flex-column gap-2">
                          <button
                            className="btn btn-primary w-100 py-3 fw-bold d-flex align-items-center justify-content-center shadow-sm text-white"
                            onClick={handleUpload}
                            disabled={uploading || selectedFiles.length === 0}
                          >
                            {uploading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Uploading Receipt...
                              </>
                            ) : (
                              <>
                                <i className="fa fa-cloud-upload-alt me-2"></i>
                                Confirm & Upload
                              </>
                            )}
                          </button>
                          <button
                            className="btn btn-link text-muted w-100 py-2 text-decoration-none"
                            onClick={() => { setIsUploadModalOpen(false); setUploadMessage({ type: '', text: '' }); setSelectedFiles([]); }}
                            disabled={uploading}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Claim Modal */}
                {isClaimModalOpen && (
                  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060, overflowY: 'auto' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered my-5">
                      <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header border-0 bg-danger text-white px-4 py-3">
                          <div className="d-flex align-items-center">
                            <i className="fa fa-exclamation-triangle me-3 fs-5"></i>
                            <h5 className="modal-title fw-bold text-white">Report a Claim</h5>
                          </div>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setIsClaimModalOpen(false)}
                          ></button>
                        </div>
                        <div className="modal-body p-4 bg-light">
                          {claimMessage.text && (
                            <div className={`alert alert-${claimMessage.type} border-0 shadow-sm mb-4 py-3 px-4 small d-flex align-items-center`}>
                              <i className={`fa ${claimMessage.type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} me-3 fs-5`}></i>
                              <div>{claimMessage.text}</div>
                            </div>
                          )}

                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label small fw-bold text-muted mb-1">Title *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="E.g., Claim Title"
                                value={claimForm.cc}
                                onChange={(e) => setClaimForm({ ...claimForm, cc: e.target.value })}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label small fw-bold text-muted mb-1">Claim Amount (USD) *</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="E.g., 2500"
                                value={claimForm.claim_amount}
                                onChange={(e) => setClaimForm({ ...claimForm, claim_amount: e.target.value })}
                              />
                            </div>
                            <div className="col-12">
                              <label className="form-label small fw-bold text-muted mb-1">Description *</label>
                              <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Describe the issue..."
                                value={claimForm.description}
                                onChange={(e) => setClaimForm({ ...claimForm, description: e.target.value })}
                              ></textarea>
                            </div>
                            <div className="col-12">
                              <label className="form-label small fw-bold text-muted mb-1">YouTube Video URL (Optional)</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="https://youtube.com/watch?v=..."
                                value={claimForm.ytvideo}
                                onChange={(e) => setClaimForm({ ...claimForm, ytvideo: e.target.value })}
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label small fw-bold text-muted mb-1">Images (Optional)</label>
                              <div className="input-group mb-2">
                                <input
                                  type="file"
                                  className="form-control"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => handleClaimFileChange(e, 'image')}
                                  disabled={claimUploading}
                                />
                              </div>
                              {claimForm.images.length > 0 && (
                                <div className="p-2 bg-white rounded border shadow-sm">
                                  <Gallery>
                                    <div className="d-flex flex-wrap gap-2">
                                      {claimForm.images.map((imgKey, idx) => {
                                        const imgUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://img.carpoolkr.com'}/${imgKey}`;
                                        return (
                                          <Item
                                            key={idx}
                                            original={imgUrl}
                                            thumbnail={imgUrl}
                                            width="800"
                                            height="600"
                                          >
                                            {({ ref, open }) => (
                                              <img
                                                ref={ref}
                                                onClick={open}
                                                src={imgUrl}
                                                style={{ width: '60px', height: '60px', objectFit: 'cover', cursor: 'pointer', borderRadius: '4px' }}
                                                alt="Claim Preview"
                                              />
                                            )}
                                          </Item>
                                        );
                                      })}
                                    </div>
                                  </Gallery>
                                </div>
                              )}
                            </div>

                            <div className="col-md-6">
                              <label className="form-label small fw-bold text-muted mb-1">Videos (Optional)</label>
                              <div className="input-group mb-2">
                                <input
                                  type="file"
                                  className="form-control"
                                  accept="video/*"
                                  multiple
                                  onChange={(e) => handleClaimFileChange(e, 'video')}
                                  disabled={claimUploading}
                                />
                              </div>
                              {claimForm.videos.length > 0 && (
                                <div className="p-2 bg-white rounded border shadow-sm">
                                  <div className="d-flex flex-wrap gap-2">
                                    {claimForm.videos.map((vidKey, idx) => (
                                      <div key={idx} className="bg-light px-2 py-1 rounded small border text-truncate" style={{ maxWidth: '100%' }}>
                                        <i className="fa fa-video me-2 text-danger"></i>
                                        {vidKey.split('/').pop()}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer border-0 p-4 bg-white d-flex flex-column flex-sm-row gap-2 justify-content-end">
                          <button
                            className="btn btn-link text-muted py-2 text-decoration-none"
                            onClick={() => setIsClaimModalOpen(false)}
                            disabled={claimSubmitting || claimUploading}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-danger py-2 px-4 fw-bold shadow-sm text-white"
                            onClick={submitClaimData}
                            disabled={claimSubmitting || claimUploading}
                          >
                            {claimSubmitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Submitting...
                              </>
                            ) : (
                              'Submit Claim'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Order Progress Wizard ────────────────────────────────────────────────────
const ORDER_STEPS = [
  { id: 1, label: 'Book an Item', icon: 'fa-shopping-cart' },
  { id: 2, label: 'Check Invoice', icon: 'fa-file-invoice-dollar' },
  { id: 3, label: 'Bank Receipt', icon: 'fa-receipt' },
  { id: 4, label: 'Payment Received', icon: 'fa-check-circle' },
  { id: 5, label: 'Shipping Schedule', icon: 'fa-ship' },
  { id: 6, label: 'Check B/L', icon: 'fa-file-alt' },
  { id: 7, label: 'Tracking No', icon: 'fa-map-marker-alt' },
  { id: 8, label: 'Original Documents', icon: 'fa-folder-open' },
  { id: 9, label: 'Complete', icon: 'fa-flag-checkered' },
];

function OrderProgressWizard({ currentStep }) {
  const step = currentStep || 1;

  return (
    <>
      <style>{`
        .opw-wrapper {
          display: flex;
          align-items: flex-start;
          position: relative;
          padding: 8px 0 4px;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
        .opw-wrapper::-webkit-scrollbar { height: 4px; }
        .opw-wrapper::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }

        .opw-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          min-width: 72px;
          position: relative;
          z-index: 1;
        }

        /* Connector line */
        .opw-item:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 22px;
          left: calc(50% + 20px);
          right: calc(-50% + 20px);
          height: 3px;
          border-radius: 2px;
          background: #e5e7eb;
          z-index: 0;
          transition: background 0.4s ease;
        }
        .opw-item.is-complete:not(:last-child)::after {
          background: linear-gradient(90deg, #22c55e, #16a34a);
        }
        .opw-item.is-active:not(:last-child)::after {
          background: linear-gradient(90deg, #3b82f6 30%, #e5e7eb);
        }

        /* Dot circle */
        .opw-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          border: 3px solid #e5e7eb;
          background: #f9fafb;
          color: #9ca3af;
          transition: all 0.35s ease;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }
        .opw-item.is-complete .opw-dot {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-color: #16a34a;
          color: #fff;
          box-shadow: 0 4px 12px rgba(34,197,94,0.35);
        }
        .opw-item.is-active .opw-dot {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-color: #2563eb;
          color: #fff;
          box-shadow: 0 4px 16px rgba(59,130,246,0.45);
          animation: opw-pulse 1.8s ease-in-out infinite;
        }
        @keyframes opw-pulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(59,130,246,0.45); }
          50%       { box-shadow: 0 4px 28px rgba(59,130,246,0.75); }
        }

        .opw-stepnum {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
          text-transform: uppercase;
          color: #9ca3af;
        }
        .opw-item.is-complete .opw-stepnum { color: #16a34a; }
        .opw-item.is-active   .opw-stepnum { color: #2563eb; }

        .opw-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-align: center;
          margin-top: 8px;
          color: #9ca3af;
          line-height: 1.3;
          max-width: 72px;
          transition: color 0.35s;
        }
        .opw-item.is-complete .opw-label { color: #16a34a; }
        .opw-item.is-active   .opw-label { color: #1d4ed8; }
      `}</style>

      <div className="opw-wrapper">
        {ORDER_STEPS.map((s) => {
          const isComplete = step > s.id;
          const isActive = step === s.id;
          const cls = `opw-item${isComplete ? ' is-complete' : isActive ? ' is-active' : ''}`;

          return (
            <div key={s.id} className={cls}>
              <div className="opw-stepnum">Step {s.id}</div>
              <div className="opw-dot">
                {isComplete
                  ? <i className="fa fa-check" />
                  : <i className={`fa ${s.icon}`} />
                }
              </div>
              <div className="opw-label">{s.label}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Shipping Info Table ──────────────────────────────────────────────────────
function ShippingInfoTable({ ship }) {
  const fmt = (v) => v || '—';
  const rows = [
    ['Vessel Name', ship.vessel_name, 'Vessel Type', ship.vessel_type],
    ['Voy No', ship.voy_no, 'Line', ship.line],
    ['Estimated Time of Departure', ship.etd, 'Estimated Time of Arrival', ship.eta],
    ['Country of Departure', ship.port_a?.country?.name, 'Country of Arrival', ship.port_d?.country?.name],
    ['Port of Departure', ship.port_a?.port, 'Port of Arrival', ship.port_d?.port],
  ];

  return (
    <>
      <style>{`
        .sit-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .sit-table th, .sit-table td {
          padding: 10px 14px;
          border: 1px solid #e5e7eb;
          vertical-align: middle;
        }
        .sit-table th {
          background: #f8f9fa;
          color: #374151;
          font-weight: 600;
          white-space: nowrap;
          width: 22%;
        }
        .sit-table td { color: #1f2937; }
        .sit-table tr:hover td, .sit-table tr:hover th { background: #f0f4ff; }
        @media (max-width: 576px) {
          .sit-table, .sit-table tbody, .sit-table tr, .sit-table th, .sit-table td {
            display: block; width: 100%;
          }
          .sit-table tr { margin-bottom: 8px; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; }
          .sit-table th { background: #f1f5f9; border: none; border-bottom: 1px solid #e5e7eb; }
          .sit-table td { border: none; border-bottom: 1px solid #f3f4f6; }
        }
      `}</style>
      <div style={{ overflowX: 'auto' }}>
        <table className="sit-table">
          <tbody>
            {rows.map(([th1, td1, th2, td2], i) => (
              <tr key={i}>
                <th>{th1}</th>
                <td>{fmt(td1)}</td>
                <th>{th2}</th>
                <td>{fmt(td2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ─── Claim Info Table ────────────────────────────────────────────────────────
function ClaimInfoTable({ clm, order }) {
  if (!clm || (Array.isArray(clm) && clm.length === 0)) return null;
  const claimData = Array.isArray(clm) ? clm[0] : clm;
  if (!claimData) return null;

  const claimResponse = claimData.claim_response;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="sit-table">
        <tbody>
          <tr>
            <td className="text-start" colSpan="4">
              <strong>Claim:</strong> {claimData.cc || ''}
            </td>
          </tr>
          <tr>
            <th>Claim No</th>
            <td>#{claimData.claim_no}</td>
            <th>Claim Status</th>
            <td>
              {claimData.status === 'Not Verify' && <span className="badge bg-danger">Not Verify</span>}
              {claimData.status === 'Verify' && <span className="badge bg-warning text-dark">Verify</span>}
              {claimData.status === 'Rejected' && <span className="badge bg-danger">Rejected</span>}
              {claimData.status === 'Approved' && <span className="badge bg-success">Approved</span>}
              {!['Not Verify', 'Verify', 'Rejected', 'Approved'].includes(claimData.status) && (
                <span className="badge bg-secondary">{claimData.status || 'Unknown'}</span>
              )}
            </td>
          </tr>
          <tr>
            <th>Paid Amount</th>
            <td>
              {order.payment_price ? Number(order.payment_price).toLocaleString('en-US') : 0} USD
            </td>
            <th>Sales Executive</th>
            <td>
              {order.invoice_id ? order.req_admin?.name : order.admin?.name}
            </td>
          </tr>
          <tr>
            <th>Claim Amount</th>
            <td>{claimData.claim_amount ? Number(claimData.claim_amount).toLocaleString('en-US') : 0} USD</td>
            {claimResponse ? (
              <>
                <th>Claim Approved</th>
                <td>{claimResponse.approved_amount ? Number(claimResponse.approved_amount).toLocaleString('en-US') : 0} USD</td>
              </>
            ) : (
              <td colSpan="2"></td>
            )}
          </tr>
          {claimResponse && (
            <>
              <tr>
                <th>Claim Policy</th>
                <td>
                  {claimResponse.claim_policy == '1' ? 'Return Money' : 'Adjusting in next Purchase'}
                </td>
                <th>Claim Slip</th>
                <td className="text-center">
                  <form method="post" action="https://media.carpoolkr.com/claim/download" target="_blank">
                    <input type="hidden" name="id" value={claimResponse.id} />
                    <button className="btn btn-sm btn-light border shadow-sm" type="submit" name="Submit">
                      <i className="fa fa-download text-primary"></i>
                    </button>
                  </form>
                </td>
              </tr>
              <tr>
                <th>Claim Use</th>
                <td>{claimResponse.claim_use == '1' ? 'Yes' : 'No'}</td>
                {claimData.claim_use_date ? (
                  <>
                    <th>Claim Use Date</th>
                    <td>{claimResponse.claim_use_date}</td>
                  </>
                ) : (
                  <>
                    <th>
                      {claimResponse.claim_policy == '1' ? 'Money Receipt' : 'Action'}
                    </th>
                    <td className="text-center">
                      {claimResponse.claim_policy == '1' ? (
                        claimResponse.claim_use == '1' ? (
                          <form method="post" action="https://media.carpoolkr.com/claim/receipt/download" target="_blank">
                            <input type="hidden" name="id" value={claimResponse.id} />
                            <button className="btn btn-sm btn-light border shadow-sm" type="submit">
                              <i className="fa fa-download text-primary"></i>
                            </button>
                          </form>
                        ) : null
                      ) : 'NULL'}
                    </td>
                  </>
                )}
              </tr>
              {claimData.claim_use_date && (
                <tr>
                  <th>
                    {claimResponse.claim_policy == '1' ? 'Money Receipt' : 'Action'}
                  </th>
                  <td className="text-center">
                    {claimResponse.claim_policy == '1' ? (
                      claimResponse.claim_use == '1' ? (
                        <form method="post" action="https://media.carpoolkr.com/claim/receipt/download" target="_blank">
                          <input type="hidden" name="id" value={claimResponse.id} />
                          <button className="btn btn-sm btn-light border shadow-sm" type="submit">
                            <i className="fa fa-download text-primary"></i>
                          </button>
                        </form>
                      ) : null
                    ) : 'NULL'}
                  </td>
                  <td colSpan="2"></td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Helper functions for status styling
function getStatusBadgeClass(status) {
  if (!status) return 'bg-light text-warning';
  switch (status.toLowerCase()) {
    case 'completed':
    case 'complete':
      return 'bg-light text-success';
    case 'canceled':
    case 'cancelled':
      return 'bg-light text-danger';
    case 'pending':
    case 'waiting':
    case 'new':
      return 'bg-light text-warning';
    default:
      return 'bg-light text-warning';
  }
}