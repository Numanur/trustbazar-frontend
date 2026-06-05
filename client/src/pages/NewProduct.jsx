// import { useState } from "react";
// import Box from "@mui/material/Box";
// import ProductForm from "../components/Form";
// import { productColumns } from "../utils/FormSource";
// import NO_IMG_ICON from "../assets/no-image-icon.jpeg";
// import { useNavigate } from "react-router-dom";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../config/firebase";
// import { publicRequest } from "../utils/makeRequest";

// const NewProduct = () => {
//   const [newProduct, setNewProduct] = useState({
//     productName: "",
//     description: "",
//     category: "",
//     brand: "",
//     price: "",
//     weight: "",
//     origin: "",
//     serialNumber: "",
//     productImg: "",
//     manufacturingDate: "",
//     expirationDate: "",
//   });
//   const [file, setFile] = useState(null);
//   const [fileLoading, setFileLoading] = useState(false);
//   const [uploaded, setUploaded] = useState(0);
//   const navigate = useNavigate();

//   const {
//     productName,
//     description,
//     category,
//     brand,
//     price,
//     weight,
//     productImg,
//     origin,
//     serialNumber,
//     manufacturingDate,
//     expirationDate,
//   } = newProduct;

//   // file upload using firebase
//   const handleUpload = (e) => {
//     e.preventDefault();

//     if (!file?.name) {
//       return toast.warn("Select Profile Picture!", { autoClose: 3000 });
//     }

//     setFileLoading(true);

//     // firebase setup
//     const fileName = new Date().getTime() + file.name;
//     const storage = getStorage(app);

//     const storageRef = ref(storage, `/BlockchainProduct/${fileName}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//       },
//       (err) => {
//         // Handle unsuccessful uploads
//         console.log(err.message);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setNewProduct((prev) => {
//             return {
//               ...prev,
//               productImg: downloadURL,
//             };
//           });

//           setFileLoading(false);
//           setUploaded((prev) => prev + 1);
//         });
//       }
//     );
//   };

//   // handle submit
//   const handleSubmit = async (e) => {
//     const dataFormate = (date) => {
//       return date.split("-").reverse().join("/");
//     };

//     const product = {
//       productName,
//       description,
//       category,
//       brand,
//       price,
//       weight,
//       origin,
//       productImg,
//       serialNumber,
//       manufacturingDate: dataFormate(manufacturingDate),
//       expirationDate: dataFormate(expirationDate),
//     };

//     try {
//       const res = await publicRequest.post("/products/create", product);
//       console.log(res.data);
//       res.data.success && navigate("/products-table");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="max-w-screen p-7 mx-32">
//       <div className="shadow-lg p-4 py-10 flex gap-4 bg-white rounded">
//         <div className="w-2/6 flex flex-col items-center justify-between">
//           <label htmlFor="file">
//             <img
//               src={file ? URL.createObjectURL(file) : NO_IMG_ICON}
//               className="w-[350px] h-[350px] rounded-full object-cover cursor-pointer"
//             />
//           </label>
//           <input
//             type="file"
//             name="file"
//             id="file"
//             className="text-sm mx-auto hidden"
//             onChange={(e) => setFile(e.target.files[0])}
//           />

//           {fileLoading ? (
//             <button className="bg-amber-400 text-white text-base py-2 px-4 rounded cursor-not-allowed">
//               Uploading...
//             </button>
//           ) : uploaded === 1 ? (
//             <button className="bg-gray-400 text-white text-base py-2 px-4 rounded cursor-not-allowed">
//               Uploaded
//             </button>
//           ) : (
//             <button
//               className="bg-amber-400 text-white text-base py-2 px-4 rounded"
//               onClick={handleUpload}
//             >
//               Upload
//             </button>
//           )}
//         </div>
//         <div className="w-4/6">
//           <Box component="form" noValidate autoComplete="off">
//             <div className="w-full flex flex-wrap">
//               {productColumns.length > 0
//                 ? productColumns.map((product) => (
//                     <ProductForm
//                       newProduct={newProduct}
//                       setNewProduct={setNewProduct}
//                       type={product.type}
//                       name={product.name}
//                       label={product.label}
//                       key={product.name}
//                     />
//                   ))
//                 : null}
//             </div>
//           </Box>
//           <button
//             className="bg-emerald-500 hover:bg-emerald-600  text-white text-base py-2 px-4 rounded ml-4"
//             onClick={handleSubmit}
//           >
//             Add Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewProduct;

import { useState } from "react";
import Box from "@mui/material/Box";
import ProductForm from "../components/Form";
import { productColumns } from "../utils/FormSource";
import NO_IMG_ICON from "../assets/no-image-icon.jpeg";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../utils/makeRequest";

const NewProduct = () => {
  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    weight: "",
    origin: "",
    serialNumber: "",
    productImg: "",
    manufacturingDate: "",
    expirationDate: "",
  });

  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const navigate = useNavigate();

  const {
    productName,
    description,
    category,
    brand,
    price,
    weight,
    productImg,
    origin,
    serialNumber,
    manufacturingDate,
    expirationDate,
  } = newProduct;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setFile(selectedFile);
    setUploaded(0);

    setNewProduct((prev) => ({
      ...prev,
      productImg: "",
    }));
  };

  // Image upload using backend + Cloudinary
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Select product image first!");
      return;
    }

    try {
      setFileLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await publicRequest.post("/products/upload-image", formData);

      setNewProduct((prev) => ({
        ...prev,
        productImg: res.data.imageUrl,
      }));

      setFileLoading(false);
      setUploaded(1);

      console.log("Image uploaded successfully:", res.data.imageUrl);
    } catch (err) {
      setFileLoading(false);
      console.error("Image upload failed:", err.response?.data || err.message);
      alert(
        "Image upload failed. Check frontend console and backend terminal.",
      );
    }
  };

  const dataFormate = (date) => {
    if (!date) return "";
    return date.split("-").reverse().join("/");
  };

  // Handle product submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productImg) {
      alert("Please upload product image before adding product.");
      return;
    }

    const product = {
      productName,
      description,
      category,
      brand,
      price,
      weight,
      origin,
      productImg,
      serialNumber,
      manufacturingDate: dataFormate(manufacturingDate),
      expirationDate: dataFormate(expirationDate),
    };

    try {
      const res = await publicRequest.post("/products/create", product);
      console.log(res.data);

      if (res.data.success) {
        navigate("/products-table");
      }
    } catch (err) {
      console.error(
        "Product creation failed:",
        err.response?.data || err.message,
      );
      alert("Product creation failed. Check console.");
    }
  };

  return (
    <div className="max-w-screen p-7 mx-32">
      <div className="shadow-lg p-4 py-10 flex gap-4 bg-white rounded">
        <div className="w-2/6 flex flex-col items-center justify-between">
          <label htmlFor="file">
            <img
              src={file ? URL.createObjectURL(file) : NO_IMG_ICON}
              alt="Product preview"
              className="w-[350px] h-[350px] rounded-full object-cover cursor-pointer"
            />
          </label>

          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            className="text-sm mx-auto hidden"
            onChange={handleFileChange}
          />

          {fileLoading ? (
            <button
              type="button"
              disabled
              className="bg-amber-400 text-white text-base py-2 px-4 rounded cursor-not-allowed"
            >
              Uploading...
            </button>
          ) : uploaded === 1 ? (
            <button
              type="button"
              disabled
              className="bg-gray-400 text-white text-base py-2 px-4 rounded cursor-not-allowed"
            >
              Uploaded
            </button>
          ) : (
            <button
              type="button"
              className="bg-amber-400 text-white text-base py-2 px-4 rounded"
              onClick={handleUpload}
            >
              Upload
            </button>
          )}
        </div>

        <div className="w-4/6">
          <Box component="form" noValidate autoComplete="off">
            <div className="w-full flex flex-wrap">
              {productColumns.length > 0
                ? productColumns.map((product) => (
                    <ProductForm
                      newProduct={newProduct}
                      setNewProduct={setNewProduct}
                      type={product.type}
                      name={product.name}
                      label={product.label}
                      key={product.name}
                    />
                  ))
                : null}
            </div>
          </Box>

          <button
            type="button"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-base py-2 px-4 rounded ml-4"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
