import React from "react";
import { Link } from "react-router";
import "./css/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-bg flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="neon-text text-[9rem] font-extrabold md:text-[12rem] leading-[1]">
          404
        </h1>

        <p className="mt-2 text-gray-400">
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="neon-btn mt-8 inline-block rounded-xl px-8 py-4 text-lg font-semibold text-white"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
