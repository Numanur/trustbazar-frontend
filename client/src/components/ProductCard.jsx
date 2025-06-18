import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // navigate to single product page
  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className=" hover:border-emerald-400 hover:bg-emerald-50 bg-white  p-4 rounded-lg cursor-pointer flex flex-col gap-7"
      key={product._id}
      onClick={() => handleNavigate(product.tracking.serialNumber)}
    >
      {product.basicDetails.productImg ? (
        <img
          src={product.basicDetails.productImg}
          alt="product imgage"
          className="object-cover h-[300px] rounded"
        />
      ) : (
        <div className="h-[300px] bg-gray-300 rounded text-white text-3xl flex justify-center items-center">
          No Image
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">
          {product.basicDetails.productName}
        </h1>
        <div className="flex-1  ">
          <div className="flex gap-3 ">
            <span>Brand: {product.basicDetails.brand}</span>
            <span>Price: {product.basicDetails.price}tk.</span>
          </div>
        </div>
        <div className="capitalize font-bold flex-1">
          Status:
          <span
            className={`mx-2 ${
              product.sellStatus == "available"
                ? "text-emerald-600 bg-emerald-50 px-2"
                : "text-red-600 bg-red-50 px-2"
            }`}
          >
            {product.sellStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
