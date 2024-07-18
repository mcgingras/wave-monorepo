import NounAvatar from "./NounAvatar";

const NounAvatarGroup = ({ ids, max = 3 }: { ids: number[]; max?: number }) => {
  const trimmed = ids.slice(0, max);
  return (
    <div className="flex space-x-[-12px]">
      {trimmed.map((id) => (
        <NounAvatar
          key={id}
          id={id}
          className="w-8 h-8 rounded-full border-white border-2"
        />
      ))}
      <span className="text-neutral-700 text-xs bg-neutral-200 h-8 w-8 rounded-full flex items-center justify-center border-white border-2">
        {ids.length > max ? `+${ids.length - max}` : ""}
      </span>
    </div>
  );
};

export default NounAvatarGroup;
