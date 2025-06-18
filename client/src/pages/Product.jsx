import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicRequest } from "../utils/makeRequest";
import Loading from "../components/Loading";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel, MdDangerous } from "react-icons/md";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  // fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/single/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.log("product error: ", err);
      }
    };
    fetchProduct();
  }, [id]);

  return Object.keys(product).length > 0 ? (
    <div className="container py-10">
      <div>
        <div className="flex gap-4 justify-center bg-white p-4 rounded">
          <div className="bg-slate-50">
            {product?.basicDetails?.productImg ? (
              <img
                src={product?.basicDetails?.productImg}
                alt="product image"
                className="object-cover h-[400px] border"
              />
            ) : (
              <div className="text-3xl h-[400px] w-[400px] bg-gray-300 rounded flex justify-center items-center">
                No Image
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between min-w-[500px] rounded p-5 bg-slate-100">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-3xl px-2">
                {product?.basicDetails?.productName}
              </h1>
              <div className="flex flex-col bg-white rounded p-2">
                <span>Category: {product?.basicDetails?.category}</span>
                <span>Brand: {product?.basicDetails?.brand}</span>
                <span>Price: {product?.basicDetails?.price} BDT</span>
                <span>Weight: {product?.basicDetails?.weight}</span>
                <span>Origin: {product?.basicDetails?.origin}</span>
              </div>
            </div>

            <div className="">
              <button
                className={`${product?.sellStatus == "available"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-500 "
                  }  px-3 py-1 rounded text-lg font-semibold capitalize flex items-center justify-center`}
              >
                <span>
                  {product?.sellStatus == "available" ? (
                    <AiFillCheckCircle className="mr-1" />
                  ) : (
                    <MdCancel className="mr-1" />
                  )}
                </span>
                {product?.sellStatus}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white mt-5 rounded p-4">
          <div className="mb-5">
            <h1 className="text-3xl flex items-center">
              <span>
                <AiFillCheckCircle className="mr-1 mt-1 text-2xl text-lime-500" />
              </span>
              Description
            </h1>
            <hr />
            <div className="mt-3 w-1/2">
              {product?.basicDetails?.description}
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-3xl flex items-center">
              <span>
                <AiFillCheckCircle className="mr-1 mt-1 text-2xl text-lime-500" />
              </span>
              Vendors Information
            </h1>
            <hr />
            <div className="mt-3 w-1/2">
              <h2>Vendor Name: {product?.vendorDetails?.vendorName}</h2>
              <span>Vendor Code: {product?.vendorDetails?.vendorCode}</span>
              <p>
                Address: {product?.vendorDetails?.vendorContactInfo?.address}
              </p>
              <p>Hotline: {product?.vendorDetails?.vendorContactInfo?.phone}</p>
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-3xl flex items-center">
              <span>
                <AiFillCheckCircle className="mr-1 mt-1 text-2xl text-lime-500" />
              </span>
              Expiration
            </h1>
            <hr />
            <div className="mt-3 w-1/2">
              <span>
                Manufacturing Date: {product?.expiration?.manufacturingDate}
              </span>
              <br />
              <span>
                Expiration Date: {product?.expiration?.expirationDate}
              </span>
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-3xl flex items-center">
              <span>
                <AiFillCheckCircle className="mr-1 mt-1 text-2xl text-lime-500" />
              </span>
              Tracking
            </h1>
            <hr />
            <div className="mt-3 w-1/2">
              <h3>ISIN: {product?.tracking?.serialNumber}</h3>
              <p>
                Compilance Certificate:{" "}
                {product?.compilanceInfo?.compilanceCertificate}
              </p>
              <div className="w-full">
                <img
                  src={`data:image/png;base64,${product.tracking.barcode}`}
                  alt="Barcode"
                  className="h-16 hover:scale-150"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-3xl flex items-center">
              <span>
                <MdDangerous className="mr-1 mt-1  text-yellow-400" />
              </span>
              Caution
            </h1>
            <hr />
            <div className="mt-3 w-1/2">
              <p> {product?.compilanceInfo?.safetyInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Product;
