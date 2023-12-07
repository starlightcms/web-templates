type EmptySearchProps = {
  label: string;
  description: string;
};

export const EmptySearch = ({ label, description }: EmptySearchProps) => (
  <div className="d-flex flex-column justify-content-center align-items-center gap-2 py-6 h-100">
    <span className="text-brand-primary-500 fw-bold fs-2 lh-2">{label}</span>
    <p className="m-0 text-brand-primary-800 fw-semibold fs-5 lh-1">
      {description}
    </p>
  </div>
);
