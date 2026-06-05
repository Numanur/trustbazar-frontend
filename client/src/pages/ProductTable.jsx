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

import { useEffect, useState } from "react";
import { publicRequest } from "../utils/makeRequest";
import { productColumns } from "../utils/TableSource";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage(
          err.response?.data?.message || "Failed to fetch products.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      alert("Failed to update product status.");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <button
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Product Table</h1>

        <Link
          to="/products/new"
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-base py-2 px-4 rounded"
        >
          Add Product
        </Link>
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
