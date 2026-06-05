import { useEffect, useState } from "react";
import { publicRequest } from "../utils/makeRequest";
import Loading from "./Loading";
import BackendErrorBanner from "./BackendErrorBanner";

const BackendGuard = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [backendOk, setBackendOk] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        setChecking(true);

        const res = await publicRequest.get("/health");

        if (res.data?.success === true && res.data?.code === "BACKEND_READY") {
          setBackendOk(true);
        } else {
          setBackendOk(false);
        }
      } catch (error) {
        console.error("Backend health check failed:", error.message);
        setBackendOk(false);
      } finally {
        setChecking(false);
      }
    };

    checkBackend();
  }, []);

  if (checking) {
    return <Loading />;
  }

  if (!backendOk) {
    return <BackendErrorBanner />;
  }

  return children;
};

export default BackendGuard;
