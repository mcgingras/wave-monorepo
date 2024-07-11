import NounAvatar from "./NounAvatar";

const NounAvatarGroup = ({ ids }: { ids: number[] }) => {
  return (
    <div className="flex space-x-[-12px]">
      {ids.map((id) => (
        <NounAvatar
          key={id}
          id={id}
          className="w-8 h-8 rounded-full border-white border-2"
        />
      ))}
    </div>
  );
};

export default NounAvatarGroup;
