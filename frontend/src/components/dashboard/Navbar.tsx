import Link from "next/link";
import React from "react";
import Dropdown from "./Dropdown";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 md:px-10 md:py-5 bg-white shadow-md">
      <div className="flex items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-green-600 hover:text-green-800 transition-colors duration-200"
        >
          SplitEasy
        </Link>
      </div>
      <div className="flex items-center md:mr-4 m-0 hover:text-green-200">
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;
