"use client";

import Button from "@/components/ui/Button";
import { useFinalizeWave } from "@/hooks/useFinalizeWave";

const FinalizeWaveCard = () => {
  const { finalizeWave, error } = useFinalizeWave();

  return (
    <div className="border border-neutral-200 p-4 rounded-lg flex flex-col items-center justify-center space-y-2 mt-4">
      <p className="text-neutral-500 text-center">This wave has ended!</p>
      <Button
        title="Finalize wave"
        type="primary"
        onClick={() => finalizeWave()}
      />
    </div>
  );
};

export default FinalizeWaveCard;
