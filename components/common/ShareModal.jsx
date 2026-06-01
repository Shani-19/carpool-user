"use client";

import React, { useEffect, useState } from "react";

const ShareModal = ({ isOpen, onClose, vehicleData }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const title = vehicleData?.name || vehicleData?.title || "Check out this vehicle!";

  // Compile detailed plain-text specifications for platforms like WhatsApp and Twitter/X
  const getShareText = () => {
    const specs = [];
    if (vehicleData?.name) specs.push(`*Vehicle Name*: ${vehicleData.name}`);
    if (vehicleData?.vin) specs.push(`*VIN*: ${vehicleData.vin}`);
    const vehicleNo = vehicleData?.plate_no || vehicleData?.vehicle_no;
    if (vehicleNo) specs.push(`*Vehicle No*: ${vehicleNo}`);
    
    const type = vehicleData?.vehicle_type || vehicleData?.category;
    if (type) specs.push(`*Vehicle Type*: ${type}`);
    
    if (vehicleData?.engine_volume) {
      const vol = vehicleData.engine_volume;
      specs.push(`*Engine Volume*: ${vol}${typeof vol === 'number' || !vol.toString().toLowerCase().includes('cc') ? ' cc' : ''}`);
    }
    
    const trans = vehicleData?.transmission || vehicleData?.transmission_type;
    if (trans) specs.push(`*Transmission*: ${trans}`);
    
    const miles = vehicleData?.odometer || vehicleData?.mileage;
    if (miles) {
      specs.push(`*Mileage*: ${typeof miles === 'number' ? miles.toLocaleString() : miles} km`);
    }
    
    if (vehicleData?.color) specs.push(`*Color*: ${vehicleData.color}`);
    if (vehicleData?.drive_type) specs.push(`*Drive Type*: ${vehicleData.drive_type}`);
    
    // Additional tags
    const tags = [];
    const status = vehicleData?.status === 'sale' ? 'Used' : (vehicleData?.status || 'Used');
    tags.push(status);
    if (vehicleData?.steering) tags.push(vehicleData.steering);
    if (type) tags.push(type);
    if (vehicleData?.fuel_type) tags.push(vehicleData.fuel_type);
    if (vehicleData?.engine_volume) {
      const vol = vehicleData.engine_volume;
      tags.push(`${vol}${typeof vol === 'number' || !vol.toString().toLowerCase().includes('cc') ? 'cc' : ''}`);
    }
    if (trans) tags.push(trans);
    if (vehicleData?.color) tags.push(vehicleData.color);
    if (vehicleData?.passenger) tags.push(`${vehicleData.passenger} Passengers`);

    if (tags.length > 0) {
      specs.push(`*More Info*: (${tags.join(', ')})`);
    }
    
    return specs.join('\n');
  };

  const shareText = getShareText();

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n\nLink: " + currentUrl)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vehicleNo = vehicleData?.plate_no || vehicleData?.vehicle_no;
  const trans = vehicleData?.transmission || vehicleData?.transmission_type;
  const miles = vehicleData?.odometer || vehicleData?.mileage;

  return (
    <div className="share-modal-overlay" onClick={onClose} style={overlayStyle}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .share-modal-overlay {
          animation: fadeIn 0.25s ease forwards;
        }
        .share-modal-content {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .share-icon-btn {
          transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s ease;
        }
        .share-icon-btn:hover {
          transform: translateY(-4px);
        }
        .share-icon-btn:active {
          transform: translateY(0) scale(0.95);
        }
        .spec-item {
          font-size: 11px;
          background-color: #f1f5f9;
          color: #475569;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 500;
        }
      `}</style>

      <div className="share-modal-content" onClick={(e) => e.stopPropagation()} style={contentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h4 style={titleStyle}>Share Vehicle</h4>
          <button onClick={onClose} style={closeButtonStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Vehicle Preview Card with Specifications */}
        {vehicleData && (
          <div style={previewCardStyle}>
            <div style={previewTextContainerStyle}>
              <div style={previewNameStyle}>{vehicleData.name}</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '8px 0' }}>
                {vehicleData.vin && (
                  <div style={specRowStyle}>
                    <span style={specLabelStyle}>VIN:</span>
                    <span style={specValStyle}>{vehicleData.vin}</span>
                  </div>
                )}
                {vehicleNo && (
                  <div style={specRowStyle}>
                    <span style={specLabelStyle}>No:</span>
                    <span style={specValStyle}>{vehicleNo}</span>
                  </div>
                )}
                {vehicleData.price && (
                  <div style={specRowStyle}>
                    <span style={specLabelStyle}>Price:</span>
                    <span style={{ ...specValStyle, color: '#405FF2', fontWeight: '700' }}>
                      {vehicleData.price.toLocaleString("en-US")} {vehicleData.price_currency || "KRW"}
                    </span>
                  </div>
                )}
              </div>

              {/* Tag Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                <span className="spec-item">Used</span>
                {vehicleData.steering && <span className="spec-item">{vehicleData.steering}</span>}
                {(vehicleData.vehicle_type || vehicleData.category) && (
                  <span className="spec-item">{vehicleData.vehicle_type || vehicleData.category}</span>
                )}
                {vehicleData.fuel_type && <span className="spec-item">{vehicleData.fuel_type}</span>}
                {vehicleData.engine_volume && (
                  <span className="spec-item">
                    {vehicleData.engine_volume}
                    {typeof vehicleData.engine_volume === 'number' || !vehicleData.engine_volume.toString().toLowerCase().includes('cc') ? 'cc' : ''}
                  </span>
                )}
                {trans && <span className="spec-item">{trans}</span>}
                {vehicleData.color && <span className="spec-item">{vehicleData.color}</span>}
                {vehicleData.drive_type && <span className="spec-item">{vehicleData.drive_type}</span>}
                {vehicleData.passenger && <span className="spec-item">{vehicleData.passenger} Pax</span>}
              </div>
            </div>
          </div>
        )}

        {/* Social Grid */}
        <div style={gridStyle}>
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="share-icon-btn" style={iconWrapperStyle}>
            <div style={{...iconStyle, backgroundColor: '#1877F2'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span style={labelStyle}>Facebook</span>
          </a>

          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="share-icon-btn" style={iconWrapperStyle}>
            <div style={{...iconStyle, backgroundColor: '#000000'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <span style={labelStyle}>X</span>
          </a>

          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="share-icon-btn" style={iconWrapperStyle}>
            <div style={{...iconStyle, backgroundColor: '#0A66C2'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span style={labelStyle}>LinkedIn</span>
          </a>

          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="share-icon-btn" style={iconWrapperStyle}>
            <div style={{...iconStyle, backgroundColor: '#25D366'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span style={labelStyle}>WhatsApp</span>
          </a>

          <button onClick={copyToClipboard} className="share-icon-btn" style={iconWrapperStyle}>
            <div style={{...iconStyle, backgroundColor: '#E1306C'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <span style={labelStyle}>Instagram</span>
          </button>

          <button onClick={copyToClipboard} className="share-icon-btn" style={iconWrapperStyle}>
            <div style={{...iconStyle, backgroundColor: '#FF0000'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <span style={labelStyle}>YouTube</span>
          </button>
        </div>

        {/* Copy Link Input Bar */}
        <div style={copyContainerStyle}>
          <input 
            type="text" 
            readOnly 
            value={currentUrl} 
            style={inputStyle}
            onClick={(e) => e.target.select()}
          />
          <button onClick={copyToClipboard} style={copyButtonStyle(copied)}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(5, 11, 32, 0.45)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99999,
  padding: '16px',
};

const contentStyle = {
  backgroundColor: '#ffffff',
  padding: '28px 24px',
  borderRadius: '24px',
  width: '100%',
  maxWidth: '420px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const titleStyle = {
  margin: 0,
  fontSize: '22px',
  fontWeight: '700',
  color: '#050b20',
  letterSpacing: '-0.5px',
};

const closeButtonStyle = {
  background: '#f4f5f8',
  border: 'none',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#050b20',
  transition: 'background-color 0.2s',
};

const previewCardStyle = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '20px',
};

const previewTextContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const previewNameStyle = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#0f172a',
  lineHeight: '1.4',
};

const specRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  borderBottom: '1px dashed #e2e8f0',
  padding: '4px 0',
};

const specLabelStyle = {
  color: '#64748b',
  fontWeight: '500',
};

const specValStyle = {
  color: '#1e293b',
  fontWeight: '600',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px 12px',
  marginBottom: '28px',
  justifyContent: 'center',
};

const iconWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '54px',
  height: '54px',
  borderRadius: '16px',
  color: '#fff',
  marginBottom: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

const labelStyle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#475569',
};

const copyContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f1f5f9',
  border: '1px solid #e2e8f0',
  borderRadius: '14px',
  padding: '6px 6px 6px 14px',
  gap: '10px',
};

const inputStyle = {
  border: 'none',
  background: 'transparent',
  outline: 'none',
  fontSize: '13px',
  color: '#334155',
  width: '100%',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const copyButtonStyle = (copied) => ({
  backgroundColor: copied ? '#10B981' : '#405FF2',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'background-color 0.2s, transform 0.1s',
  boxShadow: copied ? '0 4px 10px rgba(16, 185, 129, 0.2)' : '0 4px 10px rgba(64, 95, 242, 0.2)',
});

export default ShareModal;
