const Button = ({
  title,
  type,
  onClick,
  isSubmit = false,
}: {
  title: string;
  type: string;
  onClick?: () => void;
  isSubmit?: boolean;
}) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className={`${
        type === "primary"
          ? "bg-blue-500 text-white hover:shadow-[0_0_0_2px_rgba(59,130,246,1)]"
          : type === "secondary"
          ? "bg-blue-100 text-blue-500 hover:shadow-[0_0_0_2px_rgba(219,234,254,1)]"
          : "bg-neutral-100 text-neutral-400 hover:shadow-[0_0_0_2px_rgba(245,245,245,1)]"
      } rounded-md px-2 py-1 transition-all`}
    >
      {title}
    </button>
  );
};

export default Button;
