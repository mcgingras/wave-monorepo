"use client";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

// redirect to prev page
const BackButton = () => {
  const router = useRouter();
  return (
    <ArrowLeftIcon
      className="h-8 w-8 text-neutral-500 bg-white rounded-full p-1 cursor-pointer transition-all hover:shadow-[0_0_0_2px_rgba(255,255,255,1)]"
      onClick={() => {
        router.back();
      }}
    />
  );
};

export default BackButton;
