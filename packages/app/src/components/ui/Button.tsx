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
          ? "bg-blue-500 text-white"
          : "bg-blue-100 text-blue-500"
      } rounded-md px-2 py-1 hover:scale-105 transition-all`}
    >
      {title}
    </button>
  );
};

export default Button;
