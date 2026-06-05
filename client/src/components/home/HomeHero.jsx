import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-sm text-slate-200">
                Barcode-based product authenticity platform
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Verify Product Authenticity Before You Trust It
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-8 mb-8 max-w-2xl">
              TrustBazar helps consumers verify whether a product is original by
              scanning its barcode. Product records, identity, selling status,
              and label information are checked through a secure verification
              pipeline.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/verify-product"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-base font-semibold px-7 py-3 rounded-xl shadow-lg shadow-emerald-900/30 text-center"
              >
                Verify Product
              </Link>

              <Link
                to="/products"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-base font-semibold px-7 py-3 rounded-xl text-center"
              >
                Explore Products
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-5 mt-10 max-w-lg">
              <div>
                <h3 className="text-2xl font-bold text-white">Scan</h3>
                <p className="text-sm text-slate-400">Barcode label</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Check</h3>
                <p className="text-sm text-slate-400">Product record</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Verify</h3>
                <p className="text-sm text-slate-400">Original status</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 text-slate-900">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-slate-500">Product Check</p>
                    <h3 className="text-2xl font-bold">Verification Result</h3>
                  </div>

                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-bold">
                    ✓
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 mb-5">
                  <div className="h-20 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 26 }).map((_, index) => (
                        <span
                          key={index}
                          className={`block bg-white ${
                            index % 3 === 0 ? "w-1" : "w-0.5"
                          } ${index % 4 === 0 ? "h-12" : "h-16"}`}
                        ></span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 mb-1">
                    Scanned Serial Number
                  </p>
                  <p className="font-semibold text-slate-900">
                    TBZ-ORIGINAL-2026-001
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                  <h4 className="text-xl font-bold text-emerald-700 mb-2">
                    Verified Original Product
                  </h4>
                  <p className="text-slate-600">
                    The barcode matches a registered product record in the
                    TrustBazar database.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 hidden md:block">
              <p className="text-sm text-slate-500 mb-1">Security Layer</p>
              <p className="font-bold text-slate-900">
                Tamper-aware Label Check
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
