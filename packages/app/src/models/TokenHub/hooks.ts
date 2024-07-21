import { useState, useEffect } from "react";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import { getClient } from "@/lib/viem";
import { Idea } from "./types";

export const useEstimatedYield = (address: `0x${string}` | undefined) => {
  const [estimatedYield, setEstimatedYield] = useState<number | null>(null);

  const getEstimatedYield = async () => {
    const client = getClient(process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1);
    const yieldInfo = await client.readContract({
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "getOptimisticYieldEstimate",
      args: [address as `0x${string}`],
    });

    setEstimatedYield(parseInt(yieldInfo.toString()));
  };

  useEffect(() => {
    getEstimatedYield();
  }, []);

  return { estimatedYield };
};

export const useIdeaData = (ideaId: number) => {
  const [idea, setIdea] = useState<Idea | null>(null);

  const getIdea = async () => {
    const client = getClient(process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1);
    const ideaInfo = await client.readContract({
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "getIdeaInfo",
      args: [BigInt(ideaId)],
    });

    setIdea({ id: ideaId, ...ideaInfo });
  };

  useEffect(() => {
    getIdea();
  }, []);

  return { idea };
};

export const useTokenHubData = () => {
  const [minRequriedVotes, setMinRequiredVotes] = useState<number | null>(null);
  const [numWinners, setNumWinners] = useState<number | null>(null);
  const [winningIdeaIds, setWinningIdeaIds] = useState<number[] | null>(null);
  const [winningIdeas, setWinningIdeas] = useState<Idea[] | null>(null);
  const [eligibleProposerIds, setEligibleProposerIds] = useState<
    number[] | null
  >(null);

  // Returns the following:
  // minRequriedVotes: number
  const getCurrentMinRequiredVotes = async () => {
    const client = getClient(process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1);
    const minRequiredVotes = await client.readContract({
      address: configAddresses.Wave as `0x${string}`,
      abi: PropLotHarnessABI,
      functionName: "getCurrentMinRequiredVotes",
    });

    setMinRequiredVotes(parseInt(minRequiredVotes.toString()));
  };

  // returns the following:
  // minRequiredVotes: number
  // numEligibleProposerDelegates: number
  const getAllEligibleProposerDelegates = async () => {
    const client = getClient(process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1);
    const [minRequiredVotes, delegateAddresses] = await client.readContract({
      address: configAddresses.Wave as `0x${string}`,
      abi: PropLotHarnessABI,
      functionName: "getAllEligibleProposerDelegates",
    });

    setMinRequiredVotes(parseInt(minRequiredVotes.toString()));
    setEligibleProposerIds(
      delegateAddresses.map((id: any) => parseInt(id.toString()))
    );
  };

  // Returns the following:
  // minRequriedVotes: number
  // winningIdeas: Idea[]
  // numWinners: number
  const getWinningIdeaIds = async () => {
    const client = getClient(process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1);
    const [minRequiredVotes, numWinners, winningIds] =
      await client.readContract({
        address: configAddresses.IdeaTokenHub as `0x${string}`,
        abi: IdeaTokenHubABI,
        functionName: "getWinningIdeaIds",
      });

    const winners = await Promise.all(
      winningIds.map(async (id: any) => {
        const ideaInfo = await client.readContract({
          address: configAddresses.IdeaTokenHub as `0x${string}`,
          abi: IdeaTokenHubABI,
          functionName: "getIdeaInfo",
          args: [id],
        });

        return { id, ...ideaInfo };
      })
    );

    setWinningIdeas(winners);
    setNumWinners(parseInt(numWinners.toString()));
    setWinningIdeaIds(winningIds.map((id: any) => parseInt(id.toString())));
    setMinRequiredVotes(parseInt(minRequiredVotes.toString()));
  };

  useEffect(() => {
    getWinningIdeaIds();
    getCurrentMinRequiredVotes();
    getAllEligibleProposerDelegates();
  }, []);

  return {
    minRequriedVotes,
    winningIdeaIds,
    winningIdeas,
    numWinners,
    eligibleProposerIds,
  };
};
