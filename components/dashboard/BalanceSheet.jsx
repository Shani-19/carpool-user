"use client";
import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/context/AuthContext";
import { balanceSheetAPI } from "@/utils/api";

export default function BalanceSheet() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFullList, setIsFullList] = useState(false);

  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    etaFrom: "",
    etaTo: "",
    vin: "",
    code: "",
    model: "",
  });

  useEffect(() => {
    if (user && !authLoading) {
      fetchBalanceSheet(1);
    }
  }, [user, authLoading]);

  const fetchBalanceSheet = async (page = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError("");
      const response = await balanceSheetAPI.getBalanceSheet(page);

      const newData = response.data?.data || [];
      const hasMorePages = response.data?.pagination?.has_more ?? false;

      if (page === 1) {
        setData(Array.isArray(newData) ? newData : []);
      } else {
        setData(prev => [...prev, ...(Array.isArray(newData) ? newData : [])]);
      }
      setCurrentPage(page);
      setHasMore(hasMorePages);
      setIsFullList(false);
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
      setError("Failed to load balance sheet. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchAllData = async () => {
    try {
      setLoadingMore(true);
      setError("");
      const response = await balanceSheetAPI.getAllBalanceSheet();
      const allData = response.data?.data || response.data || [];
      setData(Array.isArray(allData) ? allData : []);
      setHasMore(false);
      setIsFullList(true);
    } catch (error) {
      console.error("Error fetching all balance sheet data:", error);
      setError("Failed to load full data. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  const loadNextPage = () => {
    fetchBalanceSheet(currentPage + 1);
  };

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.filter((item) => {
      let dateMatch = true;
      if (filters.dateFrom) dateMatch = dateMatch && new Date(item.date) >= new Date(filters.dateFrom);
      if (filters.dateTo) dateMatch = dateMatch && new Date(item.date) <= new Date(filters.dateTo);

      let etaMatch = true;
      if (filters.etaFrom) etaMatch = etaMatch && item.eta && new Date(item.eta) >= new Date(filters.etaFrom);
      if (filters.etaTo) etaMatch = etaMatch && item.eta && new Date(item.eta) <= new Date(filters.etaTo);

      const vinMatch = !filters.vin || (item.vin_no && item.vin_no.toLowerCase().includes(filters.vin.toLowerCase()));
      const codeMatch = !filters.code || (item.code && item.code.toLowerCase().includes(filters.code.toLowerCase())) || (item.bl_no && item.bl_no.toLowerCase().includes(filters.code.toLowerCase()));
      const modelMatch = !filters.model || (item.vehicle_details && item.vehicle_details.toLowerCase().includes(filters.model.toLowerCase()));

      const generalSearchMatch = !search ||
        (item.vehicle_details && item.vehicle_details.toLowerCase().includes(search.toLowerCase())) ||
        (item.vin_no && item.vin_no.toLowerCase().includes(search.toLowerCase())) ||
        (item.remarks && item.remarks.toLowerCase().includes(search.toLowerCase()));

      return dateMatch && etaMatch && vinMatch && codeMatch && modelMatch && generalSearchMatch;
    });
  }, [data, filters, search]);

  const clearFilters = () => {
    setSearch("");
    setFilters({ dateFrom: "", dateTo: "", etaFrom: "", etaTo: "", vin: "", code: "", model: "" });
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0";
    return Number(num).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  const formatDate = (dateString, formatType = "d/m/y") => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;

    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear() % 100;
    const M = date.toLocaleString('default', { month: 'short' });

    if (formatType === "d/m/y") return `${d}/${m}/${y}`;
    if (formatType === "d/m") return `${d}/${m}`;
    if (formatType === "d M Y") return `${d} ${M} ${y}`;
    if (formatType === "m/Y") return `${M} ${y}`;
    if (formatType === "m") return `${m}`;
    return `${d}/${m}/${y}`;
  };

  const renderTableRows = () => {
    if (!filteredData || filteredData.length === 0) {
      return (
        <tr>
          <td colSpan="14" className="text-center py-5 text-muted">
            <div className="d-flex flex-column align-items-center">
              <i className="fa fa-folder-open-o fs-1 mb-3 text-light"></i>
              <h5>No records found</h5>
              <p className="small">Try adjusting your filters or search terms.</p>
            </div>
          </td>
        </tr>
      );
    }

    let grandTotalQty = 0, grandTotalFob = 0, grandTotalFreight = 0, grandTotalDis = 0, grandTotalCom = 0, grandTotalDop = 0;
    let currentMonth = null;
    let subtotalQty = 0, subtotalFob = 0, subtotalFre = 0, subtotalDis = 0, subtotalCom = 0, subtotalDop = 0;
    const rows = [];

    filteredData.forEach((u, index) => {
      const month = formatDate(u.date, "m");

      if (currentMonth !== null && month !== currentMonth) {
        rows.push(
          <tr key={`subtotal-${currentMonth}`} className="bg-light fw-bold text-dark border-top border-bottom">
            <td colSpan="5" className="text-end"><strong>{formatDate(filteredData[index - 1].date, "m/Y")} Subtotal</strong></td>
            <td className="text-center">{formatNumber(subtotalQty)}</td>
            <td className="text-end text-nowrap">{formatNumber(subtotalFob)}</td>
            <td className="text-end text-nowrap">{formatNumber(subtotalFre)}</td>
            <td className="text-end text-nowrap text-danger">{subtotalDis !== 0 ? "-" : ""}{formatNumber(subtotalDis)}</td>
            <td className="text-end text-nowrap">{formatNumber(subtotalFob + subtotalFre - subtotalDis)}</td>
            <td className="text-end text-nowrap text-danger">{subtotalCom !== 0 ? "-" : ""}{formatNumber(subtotalCom)}</td>
            <td className="text-end text-nowrap text-primary">{formatNumber(subtotalFob + subtotalFre - subtotalCom - subtotalDis)}</td>
            <td className="text-end text-nowrap">{formatNumber(subtotalDop)}</td>
            <td className="text-end text-nowrap"></td>
          </tr>
        );
        subtotalQty = 0; subtotalFob = 0; subtotalFre = 0; subtotalDis = 0; subtotalCom = 0; subtotalDop = 0;
      }

      currentMonth = month;

      const qty = Number(u.quantity || 0);
      const fob = Number(u.fob || 0);
      const freight = Number(u.freight || 0);
      const discount = Number(u.discount || 0);
      const commission = Number(u.commission || 0);
      const deposit = Number(u.deposit || 0);

      subtotalQty += qty; subtotalFob += fob; subtotalFre += freight; subtotalDis += discount; subtotalCom += commission; subtotalDop += deposit;
      grandTotalQty += qty; grandTotalFob += fob; grandTotalFreight += freight; grandTotalDis += discount; grandTotalCom += commission; grandTotalDop += deposit;

      const saleValue = fob + freight - discount;
      const netValue = saleValue - commission;

      rows.push(
        <tr key={u.id || index} className="align-middle hover-row">
          <td className="text-muted small">{index + 1}</td>
          <td className="text-nowrap">{formatDate(u.date)}</td>
          <td className="text-nowrap text-muted">{formatDate(u.eta, "d M Y")}</td>
          <td>
            <div className="fw-medium text-dark">{u.vehicle_details}</div>
            {u.vin_no && <div className="small text-muted font-monospace mt-1">{u.vin_no}</div>}
          </td>
          <td>
            {qty !== 0 ? (
              <a href={`/orders/${u.remarks?.split("/")[0]}`} target="_blank" rel="noreferrer" className="text-primary text-decoration-none fw-medium">
                {u.remarks} <i className="fa fa-external-link ms-1 small"></i>
              </a>
            ) : (
              <span className="text-muted">{u.remarks || "-"}</span>
            )}
          </td>
          <td className="text-center">
            <span className="badge bg-dark text-white px-2 py-1 rounded-pill">{qty}</span>
          </td>
          <td className="text-end text-nowrap font-monospace small">{formatNumber(fob)}</td>
          <td className="text-end text-nowrap font-monospace small">{formatNumber(freight)}</td>
          <td className="text-end text-nowrap font-monospace small text-danger">{discount !== 0 ? "-" : ""}{formatNumber(discount)}</td>
          <td className="text-end text-nowrap font-monospace small fw-medium">{formatNumber(saleValue)}</td>
          <td className="text-end text-nowrap font-monospace small text-danger">{commission !== 0 ? "-" : ""}{formatNumber(commission)}</td>
          <td className="text-end text-nowrap font-monospace small fw-medium text-primary">{formatNumber(netValue)}</td>
          <td className="text-end text-nowrap font-monospace small">{formatNumber(deposit)}</td>
          <td className="text-end text-nowrap font-monospace small fw-bold text-success">{formatNumber(u.payable || 0)}</td>
        </tr>
      );

      if (index === filteredData.length - 1) {
        rows.push(
          <tr key={`subtotal-${currentMonth}`} className="bg-light fw-bold text-dark border-top border-bottom">
            <td colSpan="5" className="text-end"><strong>{formatDate(u.date, "m/Y")} Subtotal</strong></td>
            <td className="text-center">{formatNumber(subtotalQty)}</td>
            <td className="text-end text-nowrap">{formatNumber(subtotalFob)}</td>
            <td className="text-end text-nowrap">{formatNumber(subtotalFre)}</td>
            <td className="text-end text-nowrap text-danger">{subtotalDis !== 0 ? "-" : ""}{formatNumber(subtotalDis)}</td>
            <td className="text-end text-nowrap">{formatNumber(subtotalFob + subtotalFre - subtotalDis)}</td>
            <td className="text-end text-nowrap text-danger">{subtotalCom !== 0 ? "-" : ""}{formatNumber(subtotalCom)}</td>
            <td className="text-end text-nowrap text-primary">{formatNumber(subtotalFob + subtotalFre - subtotalCom - subtotalDis)}</td>
            <td className="text-end text-nowrap">{formatNumber(subtotalDop)}</td>
            <td className="text-end text-nowrap"></td>
          </tr>
        );
      }
    });

    rows.push(
      <tr key="grand-total" className="bg-dark text-white fw-bold">
        <td colSpan="5" className="text-end border-0 rounded-start-bottom text-white"><strong class="text-white">Grand Total</strong></td>
        <td className="text-center border-0 text-white">{formatNumber(grandTotalQty)}</td>
        <td className="text-end text-nowrap border-0 text-white">{formatNumber(grandTotalFob)}</td>
        <td className="text-end text-nowrap border-0 text-white">{formatNumber(grandTotalFreight)}</td>
        <td className="text-end text-nowrap border-0 text-white">{grandTotalDis !== 0 ? "-" : ""}{formatNumber(grandTotalDis)}</td>
        <td className="text-end text-nowrap border-0 text-white">{formatNumber(grandTotalFob + grandTotalFreight - grandTotalDis)}</td>
        <td className="text-end text-nowrap border-0 text-white">{grandTotalCom !== 0 ? "-" : ""}{formatNumber(grandTotalCom)}</td>
        <td className="text-end text-nowrap border-0 text-white">{formatNumber(grandTotalFob + grandTotalFreight - grandTotalDis - grandTotalCom)}</td>
        <td className="text-end text-nowrap border-0 text-white">{formatNumber(grandTotalDop)}</td>
        <td className="text-end text-nowrap border-0 rounded-end-bottom text-white"></td>
      </tr>
    );

    return rows;
  };

  if (authLoading || (loading && data.length === 0)) {
    return (
      <section className="dashboard-widget">
        <div className="right-box">
          <Sidebar />
          <div className="content-column">
            <div className="inner-column vh-100 d-flex justify-content-center align-items-center">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="mt-4 text-muted">Loading your balance sheet...</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-widget">

      <div className="right-box">
        <Sidebar />

        <div className="content-column">
          <div className="inner-column p-4">
            <style dangerouslySetInnerHTML={{
              __html: `
            .table-premium { border-collapse: separate; border-spacing: 0; width: 100%; min-width: 1300px; }
            .table-premium th { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; color: #6b7280; padding: 1rem; border-bottom: 2px solid #e5e7eb; background: #f8fafc; white-space: nowrap; }
            .table-premium td { padding: 1rem; border-bottom: 1px solid #f3f4f6; color: #374151; }
            .hover-row:hover td { background-color: #f8fafc; transition: background-color 0.2s ease; }
            .glass-panel { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border-radius: 1rem; overflow: hidden; min-width: 0; }
            .search-input-modern { border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 0.75rem 1rem 0.75rem 2.5rem; width: 100%; transition: all 0.2s; outline: none; }
            .search-input-modern:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
            .search-icon-wrapper { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #9ca3af; }
            .btn-modern { border-radius: 0.5rem; font-weight: 500; padding: 0.5rem 1rem; transition: all 0.2s; }
            .filter-input-modern { border: 1px solid #e5e7eb; border-radius: 0.375rem; padding: 0.5rem 0.75rem; width: 100%; font-size: 0.875rem; outline: none; transition: border-color 0.2s; }
            .filter-input-modern:focus { border-color: #3b82f6; }
            .table-container-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 0.5rem; border: 1px solid #f3f4f6; max-width: 100%; }
            .table-container-scroll::-webkit-scrollbar { height: 8px; }
            .table-container-scroll::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
            .table-container-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
            .table-container-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          `}} />

            {/* Header Section */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 pb-3 border-bottom">
              <div>
                <h2 className="fw-bold text-dark mb-2 d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <i className="fa fa-line-chart fs-4"></i>
                  </div>
                  Balance Sheet
                </h2>
                <p className="text-muted mb-0" style={{ maxWidth: '800px' }}>
                  Track your financial transactions, invoices, and payment statuses. Grouped automatically by month.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger shadow-sm border-0 rounded-3 mb-4 d-flex align-items-center" role="alert">
                <i className="fa fa-exclamation-circle fs-4 me-3"></i>
                <div>
                  <strong>Error: </strong> {error}
                </div>
                <button className="btn btn-sm btn-danger ms-auto btn-modern" onClick={fetchBalanceSheet}>Retry</button>
              </div>
            )}

            {/* Main Content Area */}
            <div className="glass-panel p-3 p-md-4 mb-4" style={{ minWidth: 0 }}>

              {/* Search & Filter Top Bar */}
              <div className="d-flex flex-column flex-lg-row gap-3 mb-4">
                <div className="position-relative flex-grow-1">
                  <div className="search-icon-wrapper">
                    <i className="fa fa-search"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by details, VIN, or remarks..."
                    value={search}
                    className="search-input-modern bg-light"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <button
                  className={`btn btn-modern d-flex align-items-center justify-content-center ${showFilters ? 'btn-primary shadow-sm' : 'btn-light border text-dark'}`}
                  onClick={() => setShowFilters(!showFilters)}
                  type="button"
                  style={{ minWidth: '160px' }}
                >
                  <i className="fa fa-sliders me-2"></i>
                  Advanced Filters
                  {(filters.dateFrom || filters.dateTo || filters.etaFrom || filters.etaTo || filters.vin || filters.code || filters.model) && (
                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  )}
                </button>
              </div>

              {/* Collapsible Filter Section */}
              {showFilters && (
                <div className="bg-light p-4 rounded-3 border mb-4 shadow-sm" style={{ transition: 'all 0.3s ease' }}>
                  <div className="row g-3">
                    <div className="col-12 mb-2">
                      <h6 className="fw-bold text-dark m-0"><i className="fa fa-filter me-2 text-primary"></i>Refine Results</h6>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="small fw-semibold text-muted mb-1">Order Date From</label>
                      <input type="date" className="filter-input-modern" value={filters.dateFrom} onChange={e => setFilters({ ...filters, dateFrom: e.target.value })} />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="small fw-semibold text-muted mb-1">Order Date To</label>
                      <input type="date" className="filter-input-modern" value={filters.dateTo} onChange={e => setFilters({ ...filters, dateTo: e.target.value })} />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="small fw-semibold text-muted mb-1">ETA From</label>
                      <input type="date" className="filter-input-modern" value={filters.etaFrom} onChange={e => setFilters({ ...filters, etaFrom: e.target.value })} />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="small fw-semibold text-muted mb-1">ETA To</label>
                      <input type="date" className="filter-input-modern" value={filters.etaTo} onChange={e => setFilters({ ...filters, etaTo: e.target.value })} />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-semibold text-muted mb-1">VIN / Chassis</label>
                      <input type="text" className="filter-input-modern" placeholder="e.g. WBA0..." value={filters.vin} onChange={e => setFilters({ ...filters, vin: e.target.value })} />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-semibold text-muted mb-1">Code / BL No</label>
                      <input type="text" className="filter-input-modern" placeholder="e.g. BL123..." value={filters.code} onChange={e => setFilters({ ...filters, code: e.target.value })} />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-semibold text-muted mb-1">Model / Year</label>
                      <input type="text" className="filter-input-modern" placeholder="e.g. 2024 Toyota..." value={filters.model} onChange={e => setFilters({ ...filters, model: e.target.value })} />
                    </div>

                    <div className="col-12 mt-4 d-flex justify-content-end border-top pt-3">
                      <button className="btn btn-light border text-danger btn-modern" onClick={clearFilters}>
                        <i className="fa fa-times me-1"></i> Clear Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Table */}
              <div style={{ width: '100%', overflow: 'hidden' }}>
                <div className="table-container-scroll table-responsive bg-white">
                  <table className="table-premium">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>ETA</th>
                      <th style={{ minWidth: '150px' }}>Item Details</th>
                      <th style={{ minWidth: '150px' }}>Remarks</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">FOB</th>
                      <th className="text-end">Freight</th>
                      <th className="text-end">Discount</th>
                      <th className="text-end">Sale Val</th>
                      <th className="text-end">Comm.</th>
                      <th className="text-end">Net Val</th>
                      <th className="text-end">Deposit</th>
                      <th className="text-end">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableRows()}
                  </tbody>
                </table>
                </div>
              </div>

              {hasMore && !isFullList && (
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button 
                    className="btn btn-primary btn-modern shadow-sm px-4"
                    onClick={loadNextPage}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span>Loading...</>
                    ) : (
                      <><i className="fa fa-calendar-plus-o me-2"></i>Load Next 3 Months</>
                    )}
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-modern px-4"
                    onClick={fetchAllData}
                    disabled={loadingMore}
                  >
                    <i className="fa fa-list me-2"></i>Full List Data
                  </button>
                </div>
              )}
              
              <div className="mt-3 text-muted small text-end">
                Showing {filteredData.length} records {search || filters.dateFrom || filters.vin ? '(filtered)' : ''}
                {isFullList && ' (complete data)'}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
