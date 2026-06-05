import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const Product = lazy(() => import("../pages/Product"));
const ProductTable = lazy(() => import("../pages/ProductTable"));
const NewProduct = lazy(() => import("../pages/NewProduct"));
const UndoProducts = lazy(() => import("../pages/UndoProducts"));
const VerifyProduct = lazy(() => import("../pages/VerifyProduct"));
const Error = lazy(() => import("../pages/Error"));

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackendGuard from "../components/BackendGuard";

const Index = () => {
  const Layout = () => {
    return (
      <div className="flex flex-col">
        <Navbar />
        <div className="w-full min-h-[87.3vh] bg-gray-200">
          <Suspense
            fallback={
              <>
                <Loading />
              </>
            }
          >
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
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: (
            <BackendGuard>
              <Products />
            </BackendGuard>
          ),
        },
        {
          path: "/products/new",
          element: <NewProduct />,
        },
        {
          path: "/products/undo",
          element: <UndoProducts />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/products-table",
          element: (
            <BackendGuard>
              <ProductTable />
            </BackendGuard>
          ),
        },
        {
          path: "/verify-product",
          element: (
            <BackendGuard>
              <VerifyProduct />
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

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Index;
