// import { Suspense, lazy } from "react";
// import { createBrowserRouter, Outlet } from "react-router-dom";

// import Loading from "../components/Loading";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import BackendGuard from "../components/BackendGuard";
// import ProtectedRoute from "../components/ProtectedRoute";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Home = lazy(() => import("../pages/Home"));
// const Products = lazy(() => import("../pages/Products"));
// const Product = lazy(() => import("../pages/Product"));
// const ProductTable = lazy(() => import("../pages/ProductTable"));
// const NewProduct = lazy(() => import("../pages/NewProduct"));
// const UndoProducts = lazy(() => import("../pages/UndoProducts"));
// const VerifyProduct = lazy(() => import("../pages/VerifyProduct"));
// const Error = lazy(() => import("../pages/Error"));

// const AdminLogin = lazy(() => import("../pages/AdminLogin"));
// const AdminSignup = lazy(() => import("../pages/AdminSignup"));

// const Layout = () => {
//   return (
//     <div className="flex flex-col">
//       <Navbar />

//       <div className="w-full min-h-[87.3vh] bg-gray-200">
//         <Suspense fallback={<Loading />}>
//           <Outlet />
//         </Suspense>
//       </div>

//       <Footer />
//       <ToastContainer />
//     </div>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "products",
//         element: (
//           <BackendGuard>
//             <Products />
//           </BackendGuard>
//         ),
//       },
//       {
//         path: "products/:id",
//         element: (
//           <BackendGuard>
//             <Product />
//           </BackendGuard>
//         ),
//       },
//       {
//         path: "verify-product",
//         element: (
//           <BackendGuard>
//             <VerifyProduct />
//           </BackendGuard>
//         ),
//       },
//       {
//         path: "products-table",
//         element: (
//           <BackendGuard>
//             <ProductTable />
//           </BackendGuard>
//         ),
//       },
//       {
//         path: "products/undo",
//         element: (
//           <BackendGuard>
//             <UndoProducts />
//           </BackendGuard>
//         ),
//       },
//       {
//         path: "products/new",
//         element: (
//           <BackendGuard>
//             <ProtectedRoute>
//               <NewProduct />
//             </ProtectedRoute>
//           </BackendGuard>
//         ),
//       },
//       {
//         path: "admin-login",
//         element: (
//           <BackendGuard>
//             <AdminLogin />
//           </BackendGuard>
//         ),
//       },
//       {
//         path: "admin-signup",
//         element: (
//           <BackendGuard>
//             <AdminSignup />
//           </BackendGuard>
//         ),
//       },
//       {
//         path: "*",
//         element: <Error />,
//       },
//     ],
//   },
// ]);

// export default router;

import { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackendGuard from "../components/BackendGuard";
import ProtectedRoute from "../components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const Product = lazy(() => import("../pages/Product"));
const ProductTable = lazy(() => import("../pages/ProductTable"));
const NewProduct = lazy(() => import("../pages/NewProduct"));
const UndoProducts = lazy(() => import("../pages/UndoProducts"));
const VerifyProduct = lazy(() => import("../pages/VerifyProduct"));
const Error = lazy(() => import("../pages/Error"));

const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const AdminSignup = lazy(() => import("../pages/AdminSignup"));

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />

      <div className="w-full min-h-[87.3vh] bg-gray-200">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: (
          <BackendGuard>
            <Products />
          </BackendGuard>
        ),
      },
      {
        path: "products/:id",
        element: (
          <BackendGuard>
            <Product />
          </BackendGuard>
        ),
      },
      {
        path: "verify-product",
        element: (
          <BackendGuard>
            <VerifyProduct />
          </BackendGuard>
        ),
      },
      {
        path: "products-table",
        element: (
          <BackendGuard>
            <ProtectedRoute>
              <ProductTable />
            </ProtectedRoute>
          </BackendGuard>
        ),
      },
      {
        path: "products/undo",
        element: (
          <BackendGuard>
            <ProtectedRoute>
              <UndoProducts />
            </ProtectedRoute>
          </BackendGuard>
        ),
      },
      {
        path: "products/new",
        element: (
          <BackendGuard>
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          </BackendGuard>
        ),
      },
      {
        path: "admin-login",
        element: (
          <BackendGuard>
            <AdminLogin />
          </BackendGuard>
        ),
      },
      {
        path: "admin-signup",
        element: (
          <BackendGuard>
            <AdminSignup />
          </BackendGuard>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
