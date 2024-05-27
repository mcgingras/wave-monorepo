"use client";

import Button from "@/components/ui/Button";
import { useFinalizeWave } from "@/hooks/useFinalizeWave";
import toast from "react-hot-toast";

const FinalizeWaveCard = () => {
  const { finalizeWave, error, isPending } = useFinalizeWave();

  return (
    <div className="border border-neutral-200 p-4 rounded-lg flex flex-col items-center justify-center space-y-2 mt-4">
      <p className="text-neutral-500 text-center">This wave has ended!</p>
      <Button
        title={isPending ? "Pending..." : "Finalize wave"}
        type="primary"
        onClick={async () => {
          await finalizeWave();
          toast("Wave finalized.");
        }}
      />
    </div>
  );
};

export default FinalizeWaveCard;
