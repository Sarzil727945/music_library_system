import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pageNumber, activePage, currentPage, totalPages, totalData }) => {
  return (
    <div className="flex justify-between mt-5">
      <div>
        Total Data: {totalData}
      </div>
      <div className="pagination float-right pagination-sm border">
        {currentPage - 3 >= 1 && (
          <Link className="text-primary px-2 border-l py-1" to={`/dashboard/my-listings/${1}`}>
            ‹ First
          </Link>
        )}
        {currentPage > 1 && (
          <Link className="text-primary px-2 border-l py-1" to={`/dashboard/my-listings/${activePage - 1}`}>
            &lt;
          </Link>
        )}
        {pageNumber.map((page) => (
          <Link
            key={page}
            to={`/dashboard/my-listings/${page}`}
            className={` ${page === activePage ? "font-bold bg-primary px-2 border-l py-1 text-white" : "text-primary px-2 border-l py-1"}`}
          >
            {page}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link className="text-primary px-2 border-l py-1" to={`/dashboard/my-listings/${activePage + 1}`}>
            &gt;
          </Link>
        )}
        {currentPage + 3 <= totalPages && (
          <Link className="text-primary px-2 border-l py-1" to={`/dashboard/my-listings/${totalPages}`}>
            Last ›
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
