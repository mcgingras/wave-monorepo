const MultiButton = () => {
  return (
    <div className="flex flex-row group transition-all">
      <div className="border-y border-l rounded-l-md group-hover:shadow-[0_0_0_2px_rgba(245,245,245,1)] text-neutral-400 flex items-center justify-center px-2">
        1 ETH Raised
      </div>
      <div className="bg-blue-100 text-blue-500 group-hover:shadow-[0_0_0_2px_rgba(219,234,254,1)] rounded-r-md px-2 py-1">
        Support
      </div>
    </div>
  );
};

export default MultiButton;
