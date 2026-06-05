const metrics = [
  {
    value: "01",
    label: "Unique barcode identity for each product",
  },
  {
    value: "24/7",
    label: "Consumer-side verification access",
  },
  {
    value: "3-Step",
    label: "Scan, match, and verify workflow",
  },
  {
    value: "Secure",
    label: "Structured product record validation",
  },
];

const TrustMetrics = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 -mt-10 relative z-10">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
        {metrics.map((item, index) => (
          <div
            key={item.label}
            className={`p-7 ${
              index !== metrics.length - 1 ? "lg:border-r border-slate-200" : ""
            }`}
          >
            <h3 className="text-3xl font-extrabold text-emerald-600 mb-2">
              {item.value}
            </h3>

            <p className="text-slate-600 leading-6">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustMetrics;
