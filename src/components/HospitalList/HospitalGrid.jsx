import React, { useState } from "react";
import Card from "./Cards";

const HospitalGrid = ({ hospitals }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const totalPages = Math.ceil(hospitals.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentHospitals = hospitals.slice(startIndex, startIndex + perPage);

  return (
    <div className="flex flex-col ">
  {/* Grid of cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {currentHospitals.map((hospital, idx) => (
      <Card key={idx} hospital={hospital} />
    ))}
  </div>


      {/* Pagination footer */}
      <div className="flex justify-center items-center gap-4 py-6">
        {/* Prev Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>

        {/* Per Page Selector */}
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="ml-4 border rounded px-2 py-1"
        >
          {[4, 8, 12, 16].map((num) => (
            <option key={num} value={num}>
              {num} / Page
            </option>
          ))}
        </select>

        {/* Go To Page */}
        <input
          type="number"
          min="1"
          max={totalPages}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const page = Number(e.target.value);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }
          }}
          placeholder="Go to Page"
          className="w-24 border rounded px-2 py-1 ml-4"
        />
      </div>
    </div>
  );
};

export default HospitalGrid;
