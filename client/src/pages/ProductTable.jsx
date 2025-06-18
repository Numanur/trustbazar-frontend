import React, { useEffect, useState } from "react";
import { publicRequest } from "../utils/makeRequest";
import { productColumns } from "../utils/TableSource";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  // fetch all the products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get("/products/all");
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
        if (status === 'sold') return '';

        try {
            const res = await publicRequest.put(`/products/${serialNumber}`);
            res.data.success && setProducts(prev => {
                return prev.map(item => {
                    return item.serialNumber === serialNumber ? { ...item, sellStatus: 'sold' } : item;
                });
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
      width: 120,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.row.sellStatus === "sold"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-400 cursor-pointer"
            } text-white py-1 px-4 rounded`}
            onClick={() => handleSell(params.row.serialNumber)}
          >
            {params.row.sellStatus === "available" ? "Sell" : "Sold"}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full px-4 flex flex-col items-center  my-6">
      <div>
        <Link
          to={"/products/new"}
          className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded text-white mb-6"
        >
          Add Product
        </Link>
        <div className="bg-white mt-4">
          {products.length > 0 ? (
            <DataGrid
              rows={products}
              columns={productColumns.concat(actionColumn)}
              disableRowSelectionOnClick
              disableSelectionOnClick
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
    </div>
  );
};

export default ProductTable;
