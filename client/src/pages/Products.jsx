import React, { useEffect, useState } from "react";
import { publicRequest } from "../utils/makeRequest";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);

  // fetch all the products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get("/products/all");
        setProducts(res.data.products);
      } catch (err) {
        console.log("products error: ", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container px-7 pb-7 my-4">
      <div className="w-full grid grid-cols-4 gap-4 mx-auto">
        {products.length > 0 ? (
          products.map((product) => <ProductCard product={product} />)
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Products;
