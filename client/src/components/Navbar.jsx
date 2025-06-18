import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-emerald-600 text-white px-7 py-4 flex justify-around">
      <h1 className="text-xl font-semibold">Product Authenticity</h1>
      <div className="flex gap-7">
        <Link to="/">
          <span className="text-lg cursor-pointer">Home</span>
        </Link>
        <Link to="/products">
          <span className="text-lg cursor-pointer">Products</span>
        </Link>
        <Link to="/products-table">
          <span className="text-lg cursor-pointer">Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
