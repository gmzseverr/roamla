import React from "react";
import { Link } from "react-router";

function Header() {
  return (
    <div className="flex justify-between items-center px-4 py-3 sm:px-8 md:px-12 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img
          src="/globe_24dp_8C1AF6_FILL0_wght400_GRAD0_opsz24.svg"
          alt="Roamla Logo"
          className="w-7 h-7 text-fuchsia-600 dark:text-fuchsia-400"
        />
        <h3 className="font-extrabold text-xl text-fuchsia-600 dark:text-fuchsia-400">
          roamla
        </h3>
      </Link>

      <Link to="/login">
        <button
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold
           py-2 px-5 rounded-full text-base
           transition-colors duration-200 ease-in-out shadow-md
           focus:outline-none focus:ring-2 focus:ring-fuchsia-300 dark:focus:ring-fuchsia-800"
        >
          Sign In
        </button>
      </Link>
    </div>
  );
}

export default Header;
