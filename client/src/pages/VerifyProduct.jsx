import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { publicRequest } from "../utils/makeRequest";

const VerifyProduct = () => {
  const VERIFY_MESSAGES = {
    PRODUCT_VERIFIED: "Verified Original Product",
    PRODUCT_NOT_VERIFIED:
      "Different or invalid barcode detected. This barcode does not match any registered TrustBazar product.",
    SERIAL_REQUIRED:
      "No barcode data was found. Please scan the product barcode again.",
    SERVER_ERROR:
      "Verification service is currently unavailable. Please try again later.",
  };

  const scannerRef = useRef(null);
  const processingRef = useRef(false);

  const [scannerKey, setScannerKey] = useState(0);
  const [scannerEnabled, setScannerEnabled] = useState(true);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [scannedCode, setScannedCode] = useState("");
  const [manualCode, setManualCode] = useState("");
  const [product, setProduct] = useState(null);

  const verifyProduct = async (serialNumber) => {
    try {
      setStatus("checking");
      setMessage("Checking product authenticity...");
      setProduct(null);

      const res = await publicRequest.post("/products/verify", {
        serialNumber,
      });

      if (res.data.success && res.data.code === "PRODUCT_VERIFIED") {
        setStatus("verified");
        setMessage(VERIFY_MESSAGES.PRODUCT_VERIFIED);
        setProduct(res.data.product);
      }
    } catch (err) {
      setProduct(null);

      const backendCode = err.response?.data?.code;

      if (backendCode === "PRODUCT_NOT_VERIFIED") {
        setStatus("not_verified");
        setMessage(VERIFY_MESSAGES.PRODUCT_NOT_VERIFIED);
        return;
      }

      if (backendCode === "SERIAL_REQUIRED") {
        setStatus("not_verified");
        setMessage(VERIFY_MESSAGES.SERIAL_REQUIRED);
        return;
      }

      setStatus("error");
      setMessage(VERIFY_MESSAGES.SERVER_ERROR);
    }
  };

  useEffect(() => {
    if (!scannerEnabled) return;

    const readerId = `barcode-reader-${scannerKey}`;

    const scanner = new Html5QrcodeScanner(
      readerId,
      {
        fps: 10,
        qrbox: {
          width: 320,
          height: 160,
        },
        rememberLastUsedCamera: true,
        formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128],
      },
      false,
    );

    scanner.render(
      async (decodedText) => {
        if (processingRef.current) return;

        processingRef.current = true;
        setScannedCode(decodedText);
        setScannerEnabled(false);

        try {
          await scanner.clear();
        } catch (error) {
          console.log("Scanner clear error:", error);
        }

        verifyProduct(decodedText);
      },
      () => {
        // Ignore scan failure messages while camera is searching
      },
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [scannerKey, scannerEnabled]);

  const handleManualVerify = () => {
    if (!manualCode.trim()) {
      alert("Enter product serial number or scan barcode first.");
      return;
    }

    processingRef.current = true;
    setScannerEnabled(false);
    setScannedCode(manualCode.trim());
    verifyProduct(manualCode.trim());
  };

  const handleScanAgain = () => {
    processingRef.current = false;
    setStatus("idle");
    setMessage("");
    setProduct(null);
    setScannedCode("");
    setManualCode("");
    setScannerEnabled(true);
    setScannerKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-screen mx-6 md:mx-20 lg:mx-32 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-3">Verify Product</h1>

        <p className="text-center text-gray-600 mb-8">
          Scan the barcode printed on your product to check whether it is an
          original TrustBazar product.
        </p>

        {status === "idle" && (
          <div className="max-w-2xl mx-auto">
            <div
              id={`barcode-reader-${scannerKey}`}
              className="w-full overflow-hidden rounded-lg border border-gray-300"
            ></div>

            <div className="mt-6">
              <p className="text-center text-gray-500 mb-3">
                If camera scanning does not work, enter the serial number
                manually.
              </p>

              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Enter serial number"
                  className="flex-1 border border-gray-300 rounded px-4 py-2 outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={handleManualVerify}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        )}

        {status === "checking" && (
          <div className="max-w-2xl mx-auto rounded-lg border border-blue-300 bg-blue-50 px-6 py-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              Verifying Product...
            </h2>
            <p className="text-gray-700">{message}</p>
            {scannedCode && (
              <p className="mt-3 text-sm text-gray-500">
                Scanned Code: {scannedCode}
              </p>
            )}
          </div>
        )}

        {status === "verified" && (
          <div className="max-w-2xl mx-auto rounded-lg border border-green-300 bg-green-50 px-6 py-8 text-center shadow-sm">
            <AiFillCheckCircle className="text-green-600 text-7xl mx-auto mb-4" />

            <h2 className="text-3xl font-bold text-green-700 mb-2">
              Verified Original Product
            </h2>

            <p className="text-gray-700 mb-4">
              This barcode matches an original product record in the TrustBazar
              database.
            </p>

            {product && (
              <div className="mt-5 text-left bg-white rounded-lg p-5 border">
                <p>
                  <strong>Product Name:</strong>{" "}
                  {product?.basicDetails?.productName}
                </p>
                <p>
                  <strong>Brand:</strong> {product?.basicDetails?.brand}
                </p>
                <p>
                  <strong>Category:</strong> {product?.basicDetails?.category}
                </p>
                <p>
                  <strong>Serial Number:</strong>{" "}
                  {product?.tracking?.serialNumber}
                </p>
                <p>
                  <strong>Status:</strong> {product?.sellStatus}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleScanAgain}
              className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded"
            >
              Scan Another Product
            </button>
          </div>
        )}

        {(status === "not_verified" || status === "error") && (
          <div className="max-w-2xl mx-auto rounded-lg border border-red-300 bg-red-50 px-6 py-8 text-center shadow-sm">
            <MdCancel className="text-red-600 text-7xl mx-auto mb-4" />

            <h2 className="text-3xl font-bold text-red-700 mb-2">
              Product Not Verified
            </h2>

            <p className="text-gray-700">{message}</p>

            {scannedCode && (
              <p className="mt-3 text-sm text-gray-500">
                Scanned Code: {scannedCode}
              </p>
            )}

            <button
              type="button"
              onClick={handleScanAgain}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyProduct;
