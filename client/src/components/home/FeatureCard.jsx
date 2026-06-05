const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-5">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>

      <p className="text-slate-600 leading-7">{description}</p>
    </div>
  );
};

export default FeatureCard;
