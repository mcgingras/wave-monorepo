"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { useFinalizeWave } from "@/hooks/useFinalizeWave";
import toast from "react-hot-toast";
import revalidate from "@/actions/revalidatePath";

const FinalizeWaveCard = () => {
  const { finalizeWave, error, isConfirming, data } = useFinalizeWave();

  useEffect(() => {
    if (error) {
      toast.error("Error finalizing wave.");
    }

    if (data) {
      toast("Wave finalized.");
      revalidate("/");
    }
  }, [error, data]);

  return (
    <div className="bg-white border border-neutral-200 p-4 rounded-lg flex flex-col items-center justify-center space-y-2 mt-4">
      <p className="text-neutral-500 text-center">This wave has ended!</p>
      <Button
        title={isConfirming ? "Pending..." : "Finalize wave"}
        type="primary"
        onClick={async () => {
          await finalizeWave();
        }}
      />
    </div>
  );
};

export default FinalizeWaveCard;
