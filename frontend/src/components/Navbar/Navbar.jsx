import React from "react";
import { Link } from "react-router-dom";
import AuthComp from "./AuthComp.jsx";

export default function Navbar() {
  return (
    <nav className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Link to="/" className="text-red-400 hover:text-red-600">
            FromOwner
          </Link>
          <Link to="/search" className="ml-4 text-gray-600 hover:text-gray-800">
            Search
          </Link>
          <Link to="/cars" className="ml-4 text-gray-600 hover:text-gray-800">
            Available
          </Link>
        </div>
        <AuthComp />
      </div>
      <hr />
    </nav>
  );
}
