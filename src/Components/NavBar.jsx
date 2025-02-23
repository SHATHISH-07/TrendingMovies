import Logo from "../MovieLogo.png";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="flex border space-x-8 items-center pl-3 py-4">
      <img className="w-[45px]" src={Logo} alt="NavLogo" />
      <Link
        to="/"
        className={` text-xl sm:text-3xl font-bold ${
          location.pathname === "/" ? "underline" : ""
        }`}
      >
        Movies
      </Link>
      <Link
        to="/WatchList"
        className={`text-xl sm:text-3xl font-bold ${
          location.pathname === "/WatchList" ? "underline" : ""
        }`}
      >
        WatchList
      </Link>
    </div>
  );
};

export default NavBar;
