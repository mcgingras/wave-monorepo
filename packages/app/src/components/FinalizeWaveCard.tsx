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
    <div className="mt-4">
      <Button
        fullWidth
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
