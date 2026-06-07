// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="w-full bg-emerald-600 text-white px-7 py-4 flex justify-around">
//       <h1 className="text-xl font-semibold">Product Authenticity</h1>
//       <div className="flex gap-7">
//         <Link to="/">
//           <span className="text-lg cursor-pointer">Home</span>
//         </Link>
//         <Link to="/products">
//           <span className="text-lg cursor-pointer">Products</span>
//         </Link>

//         <Link
//           to="/verify-product"
//           className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-500 hover:via-cyan-500 hover:to-blue-600 hover:shadow-xl hover:shadow-cyan-500/40"
//         >
//           <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
//           Verify Product
//         </Link>
//         {/* <Link to="/products-table">
//           <span className="text-lg cursor-pointer">Admin</span>
//         </Link> */}
//         <Link
//           to="/products-table"
//           className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-slate-800 hover:via-indigo-800 hover:to-purple-800 hover:shadow-xl hover:shadow-indigo-900/40"
//         >
//           <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs">
//             ⚡
//           </span>
//           Admin
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const normalButtonClass = ({ isActive }) =>
    `inline-flex h-12 items-center justify-center rounded-xl px-5 text-base font-bold transition-all duration-300 ${
      isActive
        ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
        : "bg-white text-slate-700 border border-emerald-100 hover:bg-emerald-100 hover:text-emerald-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-emerald-50/95 backdrop-blur-md shadow-sm">
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 lg:px-20">
        <div className="flex h-22 min-h-[88px] items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-2xl font-black text-white shadow-md">
              T
            </span>

            <div className="leading-tight">
              <h1 className="text-3xl font-black tracking-tight text-emerald-950">
                TrustBazar
              </h1>
              <p className="text-sm font-semibold text-emerald-700">
                Product Authenticity
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink to="/" className={normalButtonClass}>
              Home
            </NavLink>

            <NavLink to="/products" className={normalButtonClass}>
              Products
            </NavLink>

            <NavLink
              to="/verify-product"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-sky-500 px-6 text-base font-bold text-white shadow-md shadow-sky-400/25 transition-all duration-300 hover:bg-sky-600 hover:-translate-y-0.5"
            >
              Verify Product
            </NavLink>

            <NavLink
              to="/products-table"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-900 px-6 text-base font-bold text-white shadow-md shadow-emerald-800/25 transition-all duration-300 hover:bg-emerald-950 hover:-translate-y-0.5"
            >
              Admin
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-900 shadow-sm lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <span className="text-3xl leading-none">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="lg:hidden pb-5">
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-md">
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className={normalButtonClass}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/products"
                  onClick={closeMenu}
                  className={normalButtonClass}
                >
                  Products
                </NavLink>

                <NavLink
                  to="/verify-product"
                  onClick={closeMenu}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-sky-500 px-6 text-base font-bold text-white shadow-md transition hover:bg-sky-600"
                >
                  Verify Product
                </NavLink>

                <NavLink
                  to="/products-table"
                  onClick={closeMenu}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-900 px-6 text-base font-bold text-white shadow-md transition hover:bg-emerald-950"
                >
                  Admin
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
