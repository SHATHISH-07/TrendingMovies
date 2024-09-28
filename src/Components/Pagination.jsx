import React from "react";

const Pagination = ({ handlePrev, handleNext, pageNo }) => {
  return (
    <div className="bg-gray-400 p-4 mt-8 flex justify-center">
      <div className="px-7 hover:cursor-pointer">
        <i class="fa-solid fa-arrow-left" onClick={handlePrev}></i>
      </div>
      <div className="font-bold" onChange={pageNo}>
        {pageNo}
      </div>
      <div className="px-7 hover:cursor-pointer">
        <i className="fa-solid fa-arrow-right" onClick={handleNext}></i>
      </div>
    </div>
  );
};

export default Pagination;
