// import { useEffect, useState } from "react";
// import { publicRequest } from "../utils/makeRequest";
// import { productColumns } from "../utils/TableSource";
// import { DataGrid } from "@mui/x-data-grid";
// import Loading from "../components/Loading";
// import { Link } from "react-router-dom";

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);

//   // fetch all the products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await publicRequest.get("/products/all");
//         let productArr = [];

//         res.data?.products?.length > 0 &&
//           res.data.products.map((product) => {
//             productArr.push({
//               _id: product._id,
//               productName: product.basicDetails.productName,
//               category: product.basicDetails.category,
//               weight: product.basicDetails.weight,
//               price: product.basicDetails.price,
//               sellStatus: product.sellStatus,
//               serialNumber: product.tracking.serialNumber,
//             });
//           });

//         setProducts(productArr);
//       } catch (err) {
//         console.log("products error: ", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleSell = async (serialNumber, status) => {
//     if (status === "sold") return "";

//     try {
//       const res = await publicRequest.put(`/products/${serialNumber}`);
//       res.data.success &&
//         setProducts((prev) => {
//           return prev.map((item) => {
//             return item.serialNumber === serialNumber
//               ? { ...item, sellStatus: "sold" }
//               : item;
//           });
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // create action column
//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 120,
//       renderCell: (params) => {
//         return (
//           <div
//             className={`${
//               params.row.sellStatus === "sold"
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-amber-400 cursor-pointer"
//             } text-white py-1 px-4 rounded`}
//             onClick={() => handleSell(params.row.serialNumber)}
//           >
//             {params.row.sellStatus === "available" ? "Sell" : "Sold"}
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="w-full px-4 flex flex-col items-center  my-6">
//       <div>
//         <Link
//           to={"/products/new"}
//           className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded text-white mb-6"
//         >
//           Add Product
//         </Link>
//         <div className="bg-white mt-4">
//           {products.length > 0 ? (
//             <DataGrid
//               rows={products}
//               columns={productColumns.concat(actionColumn)}
//               disableRowSelectionOnClick
//               disableSelectionOnClick
//               pageSize={10}
//               getRowId={(row) => row._id}
//               rowsPerPageOptions={[5]}
//               checkboxSelection
//             />
//           ) : (
//             <Loading />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductTable;

// import { useEffect, useState } from "react";
// import { publicRequest } from "../utils/makeRequest";
// import { productColumns } from "../utils/TableSource";
// import { DataGrid } from "@mui/x-data-grid";
// import Loading from "../components/Loading";
// import { Link } from "react-router-dom";

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [emptyMessage, setEmptyMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // Fetch all products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setErrorMessage("");
//         setEmptyMessage("");

//         const res = await publicRequest.get("/products/all");

//         const productArr = [];

//         if (res.data?.products?.length > 0) {
//           res.data.products.forEach((product) => {
//             productArr.push({
//               _id: product._id,
//               productName: product.basicDetails?.productName,
//               category: product.basicDetails?.category,
//               weight: product.basicDetails?.weight,
//               price: product.basicDetails?.price,
//               sellStatus: product.sellStatus,
//               serialNumber: product.tracking?.serialNumber,
//             });
//           });
//         }

//         setProducts(productArr);

//         if (
//           res.data?.code === "EMPTY_PRODUCTS" ||
//           res.data?.isEmpty === true ||
//           productArr.length === 0
//         ) {
//           setEmptyMessage(
//             res.data?.message || "No products are available in the database.",
//           );
//         }
//       } catch (err) {
//         console.log("products error: ", err);
//         setErrorMessage(
//           err.response?.data?.message || "Failed to fetch products.",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSell = async (serialNumber, status) => {
//     if (status === "sold") return;

//     try {
//       const res = await publicRequest.put(`/products/${serialNumber}`);

//       if (res.data.success) {
//         setProducts((prev) =>
//           prev.map((item) =>
//             item.serialNumber === serialNumber
//               ? { ...item, sellStatus: "sold" }
//               : item,
//           ),
//         );
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Failed to update product status.");
//     }
//   };

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 120,
//       renderCell: (params) => {
//         return (
//           <button
//             className={`px-4 py-1 rounded text-white ${
//               params.row.sellStatus === "available"
//                 ? "bg-emerald-500 hover:bg-emerald-600"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//             onClick={() =>
//               handleSell(params.row.serialNumber, params.row.sellStatus)
//             }
//           >
//             {params.row.sellStatus === "available" ? "Sell" : "Sold"}
//           </button>
//         );
//       },
//     },
//   ];

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div className="w-full p-7">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Product Table</h1>

//         <Link
//           to="/products/new"
//           className="bg-emerald-500 hover:bg-emerald-600 text-white text-base py-2 px-4 rounded"
//         >
//           Add Product
//         </Link>
//       </div>

//       {errorMessage && (
//         <div className="mb-8 rounded-lg border border-red-300 bg-red-50 px-6 py-5 text-red-700 shadow-sm">
//           <h2 className="text-xl font-semibold mb-2">
//             Failed to load products
//           </h2>
//           <p>{errorMessage}</p>
//         </div>
//       )}

//       {!errorMessage && emptyMessage && (
//         <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-6 py-6 text-center shadow-sm">
//           <h2 className="text-2xl font-semibold text-amber-700 mb-2">
//             No Products Found
//           </h2>

//           <p className="text-gray-700">
//             {emptyMessage} Please add your first product.
//           </p>
//         </div>
//       )}

//       {!errorMessage && products.length > 0 && (
//         <div style={{ height: 650, width: "100%" }}>
//           <DataGrid
//             rows={products}
//             columns={productColumns.concat(actionColumn)}
//             getRowId={(row) => row._id}
//             pageSize={5}
//             rowsPerPageOptions={[5]}
//             checkboxSelection
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductTable;

import { useEffect, useState } from "react";
import { publicRequest } from "../utils/makeRequest";
import { productColumns } from "../utils/TableSource";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-login", { replace: true });
  };

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        setEmptyMessage("");

        const res = await publicRequest.get("/products/all");

        const productArr = [];

        if (res.data?.products?.length > 0) {
          res.data.products.forEach((product) => {
            productArr.push({
              _id: product._id,
              productName: product.basicDetails?.productName,
              category: product.basicDetails?.category,
              weight: product.basicDetails?.weight,
              price: product.basicDetails?.price,
              sellStatus: product.sellStatus,
              serialNumber: product.tracking?.serialNumber,
            });
          });
        }

        setProducts(productArr);

        if (
          res.data?.code === "EMPTY_PRODUCTS" ||
          res.data?.isEmpty === true ||
          productArr.length === 0
        ) {
          setEmptyMessage(
            res.data?.message || "No products are available in the database.",
          );
        }
      } catch (err) {
        console.log("products error: ", err);

        if (
          err.response?.status === 401 ||
          err.response?.data?.code === "INVALID_TOKEN" ||
          err.response?.data?.code === "NOT_AUTHENTICATED"
        ) {
          logout();
          navigate("/admin-login", { replace: true });
          return;
        }

        setErrorMessage(
          err.response?.data?.message || "Failed to fetch products.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [logout, navigate]);

  const handleSell = async (serialNumber, status) => {
    if (status === "sold") return;

    try {
      const res = await publicRequest.put(`/products/${serialNumber}`);

      if (res.data.success) {
        setProducts((prev) =>
          prev.map((item) =>
            item.serialNumber === serialNumber
              ? { ...item, sellStatus: "sold" }
              : item,
          ),
        );
      }
    } catch (err) {
      console.log(err);

      if (
        err.response?.status === 401 ||
        err.response?.data?.code === "INVALID_TOKEN" ||
        err.response?.data?.code === "NOT_AUTHENTICATED"
      ) {
        logout();
        navigate("/admin-login", { replace: true });
        return;
      }

      alert("Failed to update product status.");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <button
            type="button"
            className={`px-4 py-1 rounded text-white ${
              params.row.sellStatus === "available"
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() =>
              handleSell(params.row.serialNumber, params.row.sellStatus)
            }
          >
            {params.row.sellStatus === "available" ? "Sell" : "Sold"}
          </button>
        );
      },
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full p-7">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Product Table
          </h1>

          {admin && (
            <p className="text-sm text-slate-500 mt-1">
              Logged in as{" "}
              <span className="font-semibold text-slate-700">
                {admin.username || admin.email}
              </span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/products/new")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-base py-2 px-4 rounded"
          >
            Add Product
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-base py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-8 rounded-lg border border-red-300 bg-red-50 px-6 py-5 text-red-700 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            Failed to load products
          </h2>
          <p>{errorMessage}</p>
        </div>
      )}

      {!errorMessage && emptyMessage && (
        <div className="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-6 py-6 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-amber-700 mb-2">
            No Products Found
          </h2>

          <p className="text-gray-700">
            {emptyMessage} Please add your first product.
          </p>
        </div>
      )}

      {!errorMessage && products.length > 0 && (
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={productColumns.concat(actionColumn)}
            getRowId={(row) => row._id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      )}
    </div>
  );
};

export default ProductTable;
