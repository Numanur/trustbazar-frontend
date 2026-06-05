import { Link } from "react-router-dom";

const VerificationCTA = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-900 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-8 md:p-12 text-white">
          <p className="text-sm font-semibold tracking-wide uppercase text-emerald-400 mb-3">
            Consumer verification
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Scan the barcode and know whether the product is original.
          </h2>

          <p className="text-slate-300 leading-8 mb-8">
            The Verify Product feature is designed for real buyers. After
            scanning the product barcode, the system checks the registered
            product record and shows a clear authenticity result.
          </p>

          <Link
            to="/verify-product"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3 rounded-xl"
          >
            Start Verification
          </Link>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-8 md:p-12 h-full">
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-slate-500">Scan Result</p>
                <h3 className="text-2xl font-bold text-slate-900">
                  Product Verified
                </h3>
              </div>

              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl font-bold">
                ✓
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">Product</span>
                <span className="font-semibold text-slate-900">
                  Registered Item
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">Serial</span>
                <span className="font-semibold text-slate-900">Matched</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-slate-500">Label</span>
                <span className="font-semibold text-emerald-600">Valid</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-emerald-600">Original</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationCTA;
