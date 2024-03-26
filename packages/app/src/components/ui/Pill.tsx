const Pill = ({ title }: { title: string }) => {
  return (
    <span className="text-sm border rounded-sm text-gray-700 px-3 py-1.5">
      {title}
    </span>
  );
};

export default Pill;
