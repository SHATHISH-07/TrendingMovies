import React from "react";

const Banner = ({ backdrop_path, original_title }) => {
  return (
    <div
      className=" h-[80vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        backgroundPosition: "center top",
      }}
    >
      <div className=" h-[3rem] text-white bg-black bg-opacity-50 text-xl w-full text-center p-2">
        {original_title}
      </div>
    </div>
  );
};

export default Banner;
