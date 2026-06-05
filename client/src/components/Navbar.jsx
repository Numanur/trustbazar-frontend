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

        <Link
          to="/verify-product"
          className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-500 hover:via-cyan-500 hover:to-blue-600 hover:shadow-xl hover:shadow-cyan-500/40"
        >
          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
          Verify Product
        </Link>
        <Link to="/products-table">
          <span className="text-lg cursor-pointer">Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
