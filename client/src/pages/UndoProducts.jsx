import { useEffect, useState } from "react";
import { publicRequest } from "../utils/makeRequest";
import { productColumns } from "../utils/TableSource";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/Loading";

const UndoProducts = () => {
  const [products, setProducts] = useState([]);

  // fetch all the products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get("api/products/all");
        let productArr = [];

        res.data?.products?.length > 0 &&
          res.data.products.map((product) => {
            productArr.push({
              _id: product._id,
              productName: product.basicDetails.productName,
              category: product.basicDetails.category,
              weight: product.basicDetails.weight,
              price: product.basicDetails.price,
              sellStatus: product.sellStatus,
              serialNumber: product.tracking.serialNumber,
            });
          });

        setProducts(productArr);
      } catch (err) {
        console.log("products error: ", err);
      }
    };
    fetchProducts();
  }, []);

  const handleSell = async (serialNumber, status) => {
    try {
      if (status === "sold") {
        const res = await publicRequest.put(`/products/undo/${serialNumber}`);
        res.data.success &&
          setProducts((prev) => {
            return prev.map((item) => {
              return item.serialNumber === serialNumber
                ? { ...item, sellStatus: "available" }
                : item;
            });
          });
      } else {
        const res = await publicRequest.put(`/products/${serialNumber}`);
        res.data.success &&
          setProducts((prev) => {
            return prev.map((item) => {
              return item.serialNumber === serialNumber
                ? { ...item, sellStatus: "sold" }
                : item;
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (serialNumber) => {
    try {
      const res = await publicRequest.delete(`/products/${serialNumber}`);
      res.data.success &&
        setProducts((prev) => {
          return prev.filter((item) => item.serialNumber !== serialNumber);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // create action column
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="flex gap-3">
            <div
              className={`text-white py-1 px-4 rounded cursor-pointer ${
                params.row.sellStatus === "sold"
                  ? "bg-gray-400"
                  : "bg-amber-400"
              }`}
              onClick={() =>
                handleSell(params.row.serialNumber, params.row.sellStatus)
              }
            >
              {params.row.sellStatus === "available" ? "Sell" : "Sold"}
            </div>
            <div
              className="bg-red-500 text-white py-1 px-4 rounded cursor-pointer"
              onClick={() => handleDelete(params.row.serialNumber)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-w-screen px-4 py-7 flex justify-center">
      <div className="w-full">
        {products.length > 0 ? (
          <DataGrid
            rows={products}
            columns={productColumns.concat(actionColumn)}
            disableSelectionOnClick
            disableRowSelectionOnClick
            pageSize={10}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default UndoProducts;
