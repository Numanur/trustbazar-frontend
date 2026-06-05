import SectionTitle from "./SectionTitle";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "▦",
    title: "Barcode-Based Identity",
    description:
      "Each product receives a unique barcode generated from its serial number, helping consumers verify the exact item record.",
  },
  {
    icon: "✓",
    title: "Original Product Verification",
    description:
      "The verification page checks whether the scanned barcode exists in the registered product database.",
  },
  {
    icon: "↻",
    title: "Product Lifecycle Status",
    description:
      "Product selling status can be updated by the admin, helping the system distinguish available and sold products.",
  },
  {
    icon: "🛡",
    title: "Tamper-Aware Product Label",
    description:
      "The printed barcode works as a verification label. If a fake or different barcode is scanned, the system displays an error banner.",
  },
  {
    icon: "☁",
    title: "Cloud Image Storage",
    description:
      "Product images are stored through Cloudinary, while MongoDB stores the secure image URL with the product record.",
  },
  {
    icon: "⌁",
    title: "Traceable Product Information",
    description:
      "Consumers can view structured product information such as origin, manufacturing date, expiry date, brand, and category.",
  },
];

const SecurityFeatures = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20">
        <SectionTitle
          label="Security features"
          title="Built for Product Trust and Counterfeit Awareness"
          description="The platform combines barcode verification, product record management, cloud image storage, and consumer-facing authenticity feedback."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;
