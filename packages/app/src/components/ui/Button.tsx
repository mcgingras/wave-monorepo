import { cn } from "@/lib/utils";

const Button = ({
  title,
  type,
  onClick,
  fullWidth,
  isSubmit = false,
  children,
}: {
  title?: string;
  type: "primary" | "secondary" | "danger" | "muted";
  onClick?: (e?: any) => void;
  fullWidth?: boolean;
  isSubmit?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className={cn(
        type === "primary" &&
          "bg-blue-500 text-white hover:shadow-[0_0_0_2px_rgba(59,130,246,1)]",
        type === "secondary" &&
          "bg-blue-100 text-blue-500 hover:shadow-[0_0_0_2px_rgba(219,234,254,1)]",
        type === "danger" &&
          "bg-red-100 text-red-500 hover:shadow-[0_0_0_2px_rgba(254,226,226,1)]",
        type === "muted" &&
          "bg-neutral-100 text-neutral-400 hover:shadow-[0_0_0_2px_rgba(245,245,245,1)]",
        fullWidth && "w-full",
        "rounded-md px-2 py-1 cursor-pointer transition-all"
      )}
    >
      {title || children}
    </button>
  );
};

export default Button;
