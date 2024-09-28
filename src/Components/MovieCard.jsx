import React, { useState } from "react";

const MovieCard = ({
  poster_path,
  name,
  movieObj,
  handleAddWatchList,
  handleRemoveFromWatchList,
  watchlist,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 700);
  };

  const handleAddToWatchListAndShowPopup = (movieObj) => {
    handleAddWatchList(movieObj);
    showPopup();
  };

  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="relative h-[45vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {popupVisible && (
        <div className="absolute top-0 right-0 h-[25px] w-auto  bg-black flex justify-center pr-2 pl-2 rounded-lg text-white font-bold mt-2 mr-8">
          Added to WatchList
        </div>
      )}
      {doesContain(movieObj) ? (
        <div
          className="text-[10px] absolute top-0 right-0 h-[25px] w-[25px] bg-black flex justify-center rounded-lg mt-2 mr-2 items-center"
          onClick={() => handleRemoveFromWatchList(movieObj)}
        >
          &#10060;
        </div>
      ) : (
        <div
          className="absolute top-0 right-0 h-[25px] w-[25px] bg-black flex justify-center rounded-lg text-white font-bold mt-2 mr-2"
          onClick={() => handleAddToWatchListAndShowPopup(movieObj)}
        >
          +
        </div>
      )}
      <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-2 rounded-b-xl">
        {name}
      </div>
    </div>
  );
};

export default MovieCard;
