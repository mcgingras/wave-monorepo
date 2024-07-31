"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { useFinalizeWave } from "@/hooks/useFinalizeWave";
import toast from "react-hot-toast";
import revalidate from "@/actions/revalidatePath";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";

const FinalizeWaveButton = () => {
  const { isConnected } = useAccount();
  const { setOpen } = useModal();

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
    <Button
      fullWidth
      title={isConfirming ? "Pending..." : "Finalize wave"}
      type="primary"
      onClick={async () => {
        if (!isConnected) {
          setOpen(true);
          return;
        }
        await finalizeWave();
      }}
    />
  );
};

export default FinalizeWaveButton;
