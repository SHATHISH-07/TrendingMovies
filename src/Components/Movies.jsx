/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Banner from "./Banner";
import axios from "axios";
import Pagination from "./Pagination";

const Movies = ({
  handleAddWatchList,
  handleRemoveFromWatchList,
  watchlist,
}) => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(() => {
    const savedPageNo = localStorage.getItem("pageNo");
    return savedPageNo ? parseInt(savedPageNo, 10) : 1;
  });

  const [randomMovie, setRandomMovie] = useState(null);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    localStorage.setItem("pageNo", pageNo);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=6ea705692e8ad2f4c1175e3308638d71&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        const moviesData = res.data.results;
        setMovies(moviesData);

        const randomIndex = Math.floor(Math.random() * moviesData.length);
        setRandomMovie(moviesData[randomIndex]);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [pageNo]);

  return (
    <>
      {randomMovie && (
        <Banner
          backdrop_path={randomMovie.backdrop_path}
          original_title={randomMovie.original_title}
        />
      )}

      <div>
        <div className="text-2xl m-5 text-center font-bold">
          Trending Movies
        </div>

        <div className="flex flex-row flex-wrap justify-around gap-8">
          {movies.map((movieObj) => {
            return (
              <MovieCard
                key={movieObj.id}
                movieObj={movieObj}
                poster_path={movieObj.poster_path}
                name={movieObj.original_title}
                handleAddWatchList={handleAddWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                watchlist={watchlist}
              />
            );
          })}
        </div>

        <Pagination
          handlePrev={handlePrev}
          handleNext={handleNext}
          pageNo={pageNo}
        />
      </div>
    </>
  );
};

export default Movies;
