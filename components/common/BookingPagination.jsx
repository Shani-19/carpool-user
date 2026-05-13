"use client";
import React from "react";

export default function BookingPagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li className={`page-item ${currentPage === i ? "active" : ""}`} key={i}>
            <a className="page-link" onClick={() => handlePageClick(i)}>
              {i}
            </a>
          </li>
        );
      }
    } else {
      // Always show first page
      pages.push(
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`} key={1}>
          <a className="page-link" onClick={() => handlePageClick(1)}>
            1
          </a>
        </li>
      );

      // Show ellipsis if current page is beyond 3
      if (currentPage > 3) {
        pages.push(
          <li className="page-item disabled" key="ellipsis1">
            <a className="page-link">...</a>
          </li>
        );
      }

      // Calculate start and end of visible page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(
            <li className={`page-item ${currentPage === i ? "active" : ""}`} key={i}>
              <a className="page-link" onClick={() => handlePageClick(i)}>
                {i}
              </a>
            </li>
          );
        }
      }

      // Show ellipsis if current page is not near the end
      if (currentPage < totalPages - 2) {
        pages.push(
          <li className="page-item disabled" key="ellipsis2">
            <a className="page-link">...</a>
          </li>
        );
      }

      // Always show last page
      pages.push(
        <li className={`page-item ${currentPage === totalPages ? "active" : ""}`} key={totalPages}>
          <a className="page-link" onClick={() => handlePageClick(totalPages)}>
            {totalPages}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <ul className="pagination">
      {/* Previous Button */}
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <a
          className="page-link"
          onClick={() => handlePageClick(currentPage - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.57983 5.99989C2.57983 5.7849 2.66192 5.56987 2.82573 5.4059L7.98559 0.24617C8.31382 -0.0820565 8.84598 -0.0820565 9.17408 0.24617C9.50217 0.574263 9.50217 1.10632 9.17408 1.43457L4.60841 5.99989L9.17376 10.5654C9.50185 10.8935 9.50185 11.4256 9.17376 11.7537C8.84566 12.0821 8.31366 12.0821 7.98544 11.7537L2.82555 6.59404C2.66176 6.42999 2.57983 6.21495 2.57983 5.99989Z"
                fill="#050B20"
              />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </a>
      </li>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <a
          className="page-link"
          onClick={() => handlePageClick(currentPage + 1)}
          aria-label="Next"
        >
          <span aria-hidden="true">
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2880_6407)">
                <path
                  d="M9.42017 6.00011C9.42017 6.2151 9.33808 6.43013 9.17427 6.5941L4.01441 11.7538C3.68618 12.0821 3.15402 12.0821 2.82592 11.7538C2.49783 11.4257 2.49783 10.8937 2.82592 10.5654L7.39159 6.00011L2.82624 1.43461C2.49815 1.10652 2.49815 0.574382 2.82624 0.246315C3.15434 -0.0820709 3.68634 -0.0820709 4.01457 0.246315L9.17446 5.40596C9.33824 5.57001 9.42017 5.78505 9.42017 6.00011Z"
                  fill="#050B20"
                />
              </g>
              <defs>
                <clipPath id="clip0_2880_6407">
                  <rect
                    width={12}
                    height={12}
                    fill="white"
                    transform="translate(12 12) rotate(-180)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    </ul>
  );
}