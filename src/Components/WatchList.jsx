/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import genreIds from "../Utility/genre";

const WatchList = ({ watchlist, handleRemoveFromWatchList, setWatchList }) => {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  const sortIncrease = () => {
    const sortedIncrease = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });

    setWatchList(sortedIncrease);
  };

  const sortDecrease = () => {
    const sortedDecrease = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });

    setWatchList(sortedDecrease);
  };

  const sortIncreasePop = () => {
    const sortedIncreasePop = [...watchlist].sort((movieA, movieB) => {
      return movieA.popularity - movieB.popularity;
    });

    setWatchList(sortedIncreasePop);
  };

  const sortDecreasePop = () => {
    const sortedDecreasePop = [...watchlist].sort((movieA, movieB) => {
      return movieB.popularity - movieA.popularity;
    });

    setWatchList(sortedDecreasePop);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreIds[movieObj.genre_ids[0]];
    });
    let uniqueGenres = [...new Set(temp)];
    let genreList = ["All Genres", ...uniqueGenres];
    setGenreList(genreList);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-5 ">
        {genreList.map((genre, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleFilter(genre);
              }}
              className={
                currGenre === genre
                  ? "h-[3rem] w-[7rem] m-3 bg-blue-500 bg-opacity-70 flex justify-center items-center text-white rounded-lg font-bold mr-4 cursor-pointer"
                  : "h-[3rem] w-[7rem] m-3 bg-black bg-opacity-70 flex justify-center items-center text-white rounded-lg font-bold mr-4 cursor-pointer"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none p-[1rem]"
          placeholder="Search Movies"
        />
      </div>

      <div className=" rounded-lg overflow-hidden border border-gray-300 m-8">
        <table className="w-full text-gray-600 text-center table-fixed">
          <thead className="border-b-2">
            <tr>
              <th className="w-1/5">Name</th>

              <th className="w-1/5 hidden sm:block flex items-center justify-center">
                <span className="cursor-pointer" onClick={sortIncrease}>
                  <i className="fa-solid fa-arrow-up"></i>
                </span>
                <span className="m-2">Rating</span>
                <span className="cursor-pointer" onClick={sortDecrease}>
                  <i className="fa-solid fa-arrow-down"></i>
                </span>
              </th>

              <th className="w-1/5 hidden sm:block flex items-center justify-center">
                <span className="cursor-pointer" onClick={sortIncreasePop}>
                  <i className="fa-solid fa-arrow-up"></i>
                </span>
                <span className="m-2 hidden sm:block">Popularity</span>
                <span className="cursor-pointer" onClick={sortDecreasePop}>
                  <i className="fa-solid fa-arrow-down"></i>
                </span>
              </th>

              <th className="w-1/5">Genre</th>
              <th className="w-1/5">Delete</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre === "All Genres") {
                  return true;
                } else {
                  return genreIds[movieObj.genre_ids[0]] === currGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj, index) => {
                return (
                  <tr className="border-b-2" key={index}>
                    <td className="text-center p-2">
                      <div className="flex flex-col items-center">
                        <img
                          className="w-[8rem] h-[10rem]"
                          src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        />
                        <div className="mt-2 font-bold">
                          {movieObj.original_title}
                        </div>
                      </div>
                    </td>
                    <td className="font-bold hidden sm:block ">
                      {Math.round(movieObj.vote_average * 10) / 10}
                    </td>

                    <td className="font-bold hidden sm:block ">
                      {movieObj.popularity}
                    </td>

                    <td className="font-bold">
                      {genreIds[movieObj.genre_ids[0]]}
                    </td>

                    <td
                      className="text-red-800 font-bold cursor-pointer text-[1.5rem]"
                      onClick={() => handleRemoveFromWatchList(movieObj)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
