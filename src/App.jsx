import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import "./App.css";
import Movies from "./Components/Movies";
import WatchList from "./Components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [watchlist, setWatchList] = useState([]);

  const handleAddWatchList = (movieObj) => {
    const newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchList = watchlist.filter(
      (movie) => movie.id !== movieObj.id
    );
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchList));
    setWatchList(filteredWatchList);
  };

  useEffect(() => {
    const storedWatchList = localStorage.getItem("moviesApp");
    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                handleAddWatchList={handleAddWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                watchlist={watchlist}
              />
            }
          />

          <Route
            path="/WatchList"
            element={
              <WatchList
                watchlist={watchlist}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                setWatchList={setWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
