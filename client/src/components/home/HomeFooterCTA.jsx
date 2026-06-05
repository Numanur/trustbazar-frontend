import { Link } from "react-router-dom";

const HomeFooterCTA = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 pb-20">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Build confidence before purchase
        </h2>

        <p className="text-slate-600 max-w-2xl mx-auto leading-8 mb-8">
          TrustBazar helps consumers check product identity, view product
          details, and avoid suspicious or unregistered items through a simple
          barcode verification workflow.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/verify-product"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-7 py-3 rounded-xl"
          >
            Verify Product
          </Link>

          <Link
            to="/products"
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-3 rounded-xl"
          >
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFooterCTA;
