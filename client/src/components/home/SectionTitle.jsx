const SectionTitle = ({ label, title, description }) => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      {label && (
        <p className="text-sm font-semibold tracking-wide uppercase text-emerald-600 mb-3">
          {label}
        </p>
      )}

      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-slate-600 text-base md:text-lg leading-7">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
