const IdeaCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl">
      <div className="p-4 border-b border-neutral-100">
        <span className="h-4 w-24 animate-pulse bg-neutral-200 block"></span>
      </div>
      <div className="p-4 border-b border-neutral-100">
        <div className="flex flex-col space-y-2">
          <span className="h-4 w-48 animate-pulse bg-neutral-200"></span>
          <span className="h-4 w-40 animate-pulse bg-neutral-200"></span>
          <span className="h-4 w-48 animate-pulse bg-neutral-200"></span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col space-y-2">
          <span className="h-4 w-48 animate-pulse bg-neutral-200"></span>
          <span className="h-4 w-40 animate-pulse bg-neutral-200"></span>
          <span className="h-4 w-48 animate-pulse bg-neutral-200"></span>
        </div>
      </div>
    </div>
  );
};

export default IdeaCardSkeleton;
