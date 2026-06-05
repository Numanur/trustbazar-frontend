import SectionTitle from "./SectionTitle";

const steps = [
  {
    step: "01",
    title: "Admin Registers Product",
    description:
      "The admin adds product details such as name, brand, category, origin, manufacturing date, expiry date, price, serial number, and product image.",
  },
  {
    step: "02",
    title: "Barcode Is Generated",
    description:
      "A unique barcode is generated from the product serial number. This barcode can be printed on the product label.",
  },
  {
    step: "03",
    title: "Consumer Scans Barcode",
    description:
      "The consumer opens the Verify Product page and scans the barcode using a phone camera.",
  },
  {
    step: "04",
    title: "System Shows Result",
    description:
      "If the barcode matches a registered product, the system shows a green Verified Original Product banner. If not, it shows an error banner.",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20 py-20">
      <SectionTitle
        label="How it works"
        title="Simple Verification for Real-World Buyers"
        description="TrustBazar turns product identity checking into a direct consumer action. A buyer scans the barcode and immediately receives the authenticity result."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item) => (
          <div
            key={item.step}
            className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white font-bold mb-5">
              {item.step}
            </span>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {item.title}
            </h3>

            <p className="text-slate-600 leading-7">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
