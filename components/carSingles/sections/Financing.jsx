"use client";
import SelectComponent from "@/components/common/SelectComponent";
import Image from "next/image";
import React from "react";

export default function Financing() {
  return (
    <div className="financing-calculator-box">
      <h5 className="title mb-3" style={{ fontSize: '18px', fontWeight: '700' }}>Financing Calculator</h5>
      <form onSubmit={(e) => e.preventDefault()} className="row g-3">
        <div className="col-12">
          <div className="form_boxes mb-0">
            <label className="mb-1" style={{ fontSize: '13px', color: '#64748b' }}>Vehicle Price ($)</label>
            <SelectComponent options={["$25.000", "$35.000", "$45.000"]} />
          </div>
        </div>
        <div className="col-12">
          <div className="form_boxes mb-0">
            <label className="mb-1" style={{ fontSize: '13px', color: '#64748b' }}>Interest rate (%)</label>
            <SelectComponent options={["4", "5", "6"]} />
          </div>
        </div>
        <div className="col-12">
          <div className="form_boxes mb-0">
            <label className="mb-1" style={{ fontSize: '13px', color: '#64748b' }}>Period (month)</label>
            <SelectComponent options={["36", "48", "60"]} />
          </div>
        </div>
        <div className="col-12">
          <div className="form_boxes mb-0">
            <label className="mb-1" style={{ fontSize: '13px', color: '#64748b' }}>Down Payment ($)</label>
            <SelectComponent options={["4000", "5000", "6000"]} />
          </div>
        </div>
        <div className="col-12 mt-4">
          <div className="form-submit">
            <button type="submit" className="theme-btn btn-style-one w-100" style={{ background: '#405FF2', padding: '12px', borderRadius: '10px' }}>
              Calculate
              <Image alt="" className="ms-2" src="/images/arrow.svg" width={14} height={14} />
            </button>
          </div>
        </div>
      </form>
      <ul className="form-list mt-4" style={{ padding: 0, listStyle: 'none' }}>
        <li className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
          <span className="text-muted">Monthly Payment</span>
          <strong className="text-dark">$687.70</strong>
        </li>
        <li className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
          <span className="text-muted">Total Amount to Pay</span>
          <strong className="text-dark">$687.70</strong>
        </li>
        <li className="d-flex justify-content-between" style={{ fontSize: '14px' }}>
          <span className="text-muted">Total Interest Payment</span>
          <strong className="text-dark">$687.70</strong>
        </li>
      </ul>
    </div>
  );
}
