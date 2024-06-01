import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import ABIForm from "./ABIForm";
import { isAddress } from "viem";

const FAKE_RESPONSE = {
  ok: true,
  abi: [
    {
      constant: true,
      inputs: [{ name: "", type: "uint256" }],
      name: "proposals",
      outputs: [
        { name: "recipient", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "description", type: "string" },
        { name: "votingDeadline", type: "uint256" },
        { name: "open", type: "bool" },
        { name: "proposalPassed", type: "bool" },
        { name: "proposalHash", type: "bytes32" },
        { name: "proposalDeposit", type: "uint256" },
        { name: "newCurator", type: "bool" },
        { name: "yea", type: "uint256" },
        { name: "nay", type: "uint256" },
        { name: "creator", type: "address" },
      ],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "minTokensToCreate",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "rewardAccount",
      outputs: [{ name: "", type: "address" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "daoCreator",
      outputs: [{ name: "", type: "address" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "divisor",
      outputs: [{ name: "divisor", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "extraBalance",
      outputs: [{ name: "", type: "address" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_proposalID", type: "uint256" },
        { name: "_transactionData", type: "bytes" },
      ],
      name: "executeProposal",
      outputs: [{ name: "_success", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "unblockMe",
      outputs: [{ name: "", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalRewardToken",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "actualBalance",
      outputs: [{ name: "_actualBalance", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "closingTime",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "allowedRecipients",
      outputs: [{ name: "", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transferWithoutReward",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "refund",
      outputs: [],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_recipient", type: "address" },
        { name: "_amount", type: "uint256" },
        { name: "_description", type: "string" },
        { name: "_transactionData", type: "bytes" },
        { name: "_debatingPeriod", type: "uint256" },
        { name: "_newCurator", type: "bool" },
      ],
      name: "newProposal",
      outputs: [{ name: "_proposalID", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "DAOpaidOut",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "minQuorumDivisor",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_newContract", type: "address" }],
      name: "newContract",
      outputs: [],
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_recipient", type: "address" },
        { name: "_allowed", type: "bool" },
      ],
      name: "changeAllowedRecipients",
      outputs: [{ name: "_success", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "halveMinQuorum",
      outputs: [{ name: "_success", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "paidOut",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_proposalID", type: "uint256" },
        { name: "_newCurator", type: "address" },
      ],
      name: "splitDAO",
      outputs: [{ name: "_success", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "DAOrewardAccount",
      outputs: [{ name: "", type: "address" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "proposalDeposit",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "numberOfProposals",
      outputs: [{ name: "_numberOfProposals", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "lastTimeMinQuorumMet",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_toMembers", type: "bool" }],
      name: "retrieveDAOReward",
      outputs: [{ name: "_success", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "receiveEther",
      outputs: [{ name: "", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "isFueled",
      outputs: [{ name: "", type: "bool" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_tokenHolder", type: "address" }],
      name: "createTokenProxy",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_proposalID", type: "uint256" }],
      name: "getNewDAOAddress",
      outputs: [{ name: "_newDAO", type: "address" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_proposalID", type: "uint256" },
        { name: "_supportsProposal", type: "bool" },
      ],
      name: "vote",
      outputs: [{ name: "_voteID", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "getMyReward",
      outputs: [{ name: "_success", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "rewardToken",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transferFromWithoutReward",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "remaining", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_proposalDeposit", type: "uint256" }],
      name: "changeProposalDeposit",
      outputs: [],
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "blocked",
      outputs: [{ name: "", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "curator",
      outputs: [{ name: "", type: "address" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "_proposalID", type: "uint256" },
        { name: "_recipient", type: "address" },
        { name: "_amount", type: "uint256" },
        { name: "_transactionData", type: "bytes" },
      ],
      name: "checkProposalCode",
      outputs: [{ name: "_codeChecksOut", type: "bool" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "privateCreation",
      outputs: [{ name: "", type: "address" }],
      type: "function",
    },
    {
      inputs: [
        { name: "_curator", type: "address" },
        { name: "_daoCreator", type: "address" },
        { name: "_proposalDeposit", type: "uint256" },
        { name: "_minTokensToCreate", type: "uint256" },
        { name: "_closingTime", type: "uint256" },
        { name: "_privateCreation", type: "address" },
      ],
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_from", type: "address" },
        { indexed: true, name: "_to", type: "address" },
        { indexed: false, name: "_amount", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_owner", type: "address" },
        { indexed: true, name: "_spender", type: "address" },
        { indexed: false, name: "_amount", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: "value", type: "uint256" }],
      name: "FuelingToDate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "to", type: "address" },
        { indexed: false, name: "amount", type: "uint256" },
      ],
      name: "CreatedToken",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "to", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Refund",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "proposalID", type: "uint256" },
        { indexed: false, name: "recipient", type: "address" },
        { indexed: false, name: "amount", type: "uint256" },
        { indexed: false, name: "newCurator", type: "bool" },
        { indexed: false, name: "description", type: "string" },
      ],
      name: "ProposalAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "proposalID", type: "uint256" },
        { indexed: false, name: "position", type: "bool" },
        { indexed: true, name: "voter", type: "address" },
      ],
      name: "Voted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "proposalID", type: "uint256" },
        { indexed: false, name: "result", type: "bool" },
        { indexed: false, name: "quorum", type: "uint256" },
      ],
      name: "ProposalTallied",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: "_newCurator", type: "address" }],
      name: "NewCurator",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_recipient", type: "address" },
        { indexed: false, name: "_allowed", type: "bool" },
      ],
      name: "AllowedRecipientChanged",
      type: "event",
    },
  ],
};

const CustomActionForm = () => {
  const [contractABI, setContractABI] = useState<any[]>([]);

  const fetchContractABI = async (contractAddress: string) => {
    // const response = await fetch(`https://abidata.net/${contractAddress}`);
    // const json = await response.json();
    // if (json.ok) return;
    // setContractABI(json.abi);
    setContractABI(FAKE_RESPONSE.abi);
  };

  const { register, control } = useFormContext();

  return (
    <>
      <div className="mt-4">
        <label
          htmlFor="target"
          className="block text-sm font-medium leading-6 text-neutral-900"
        >
          Target contract
        </label>

        <Controller
          control={control}
          name="target"
          render={({ field: { onChange } }) => (
            <input
              {...register("target")}
              className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="0xf5ac35838d2d58158e2487ed5b5e47879c519397"
              onChange={(e) => {
                onChange(e);
                if (isAddress(e.target.value)) {
                  fetchContractABI(e.target.value);
                }
              }}
            />
          )}
        />

        {contractABI.length > 0 && <ABIForm abi={contractABI} />}
      </div>
    </>
  );
};

export default CustomActionForm;
