const BackendErrorBanner = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 py-16">
      <div className="rounded-2xl border border-red-300 bg-red-50 px-6 py-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white text-4xl font-bold">
          !
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-3">
          Backend Server Unavailable
        </h2>

        <p className="text-gray-700 max-w-2xl mx-auto leading-7">
          The website cannot connect to the server right now. Product data,
          verification, admin table, and product details will be shown after the
          server connection is restored.
        </p>

        <p className="text-sm text-gray-500 mt-4">
          Please try again later or contact the system administrator.
        </p>
      </div>
    </div>
  );
};

export default BackendErrorBanner;
