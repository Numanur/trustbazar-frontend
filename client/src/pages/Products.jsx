// import { useEffect, useState } from "react";
// import { publicRequest } from "../utils/makeRequest";
// import ProductCard from "../components/ProductCard";
// import Loading from "../components/Loading";

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   // fetch all the products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await publicRequest.get("/products/all");
//         setProducts(res.data.products);
//       } catch (err) {
//         console.log("products error: ", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container px-7 pb-7 my-4">
//       <div className="w-full grid grid-cols-4 gap-4 mx-auto">
//         {products.length > 0 ? (
//           products.map((product) => <ProductCard product={product} />)
//         ) : (
//           <Loading />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;

import { useEffect, useState } from "react";
import { publicRequest } from "../utils/makeRequest";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        setEmptyMessage("");

        const res = await publicRequest.get("/products/all");

        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts);

        if (
          res.data.code === "EMPTY_PRODUCTS" ||
          res.data.isEmpty === true ||
          fetchedProducts.length === 0
        ) {
          setEmptyMessage(
            res.data.message || "No products are available in the database.",
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-screen mx-10 md:mx-20 lg:mx-32 py-10">
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

          <p className="text-gray-700">{emptyMessage}</p>
        </div>
      )}

      {!errorMessage && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
