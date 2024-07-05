"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

// redirect to prev page
const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      title="Back"
      type="secondary"
      onClick={() => {
        router.back();
      }}
    />
  );
};

export default BackButton;
