import { useForm, FormProvider } from "react-hook-form";
import { useAccount } from "wagmi";
import { encodeFunctionData } from "viem";
import TransferActionForm from "./TransferActionForm";
import StreamActionForm from "./StreamActionForm";
import CustomActionForm from "./CustomActionForm";
import Button from "./ui/Button";

const createSignature = (functionAbiItem: {
  name: string;
  inputs: { type: string }[];
}) =>
  `${functionAbiItem.name}(${
    functionAbiItem.inputs?.map((i) => i.type).join(",") ?? ""
  })`;

const AddActionForm = ({
  closeModal,
  onSubmitCallback,
}: {
  onSubmitCallback: (data: any) => void;
  closeModal: () => void;
}) => {
  const methods = useForm<{ amount: number; receiver: string; type: string }>({
    defaultValues: {
      type: "transfer",
      amount: 0,
      receiver: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const { address } = useAccount();
  const actionType = watch("type");

  const renderFormForActionType = (type: string) => {
    if (type === "transfer") {
      return <TransferActionForm />;
    } else if (type === "stream") {
      return <StreamActionForm />;
    } else if (type === "custom") {
      return <CustomActionForm />;
    }
    return null;
  };

  const processTransactionData = (data: any) => {
    const { type } = data;
    switch (type) {
      case "transfer":
        const { amount, receiver, currency } = data;
        if (currency === "ETH") {
          return {
            target: receiver,
            value: amount,
            signature: "",
            calldata: "",
          };
        } else {
          return {
            target: receiver,
            value: 0,
            signature: "transfer(address,uint256)",
            calldata: `0x${receiver.slice(2)}`,
          };
        }
      case "stream":
        // const fetchPredictedStreamContractAddress =
        //   useFetchPredictedStreamContractAddress();

        // const canPredictStreamContractAddress =
        //   isAddress(state.receiverAddress) &&
        //   state.amount > 0 &&
        //   state.dateRange?.start != null &&
        //   state.dateRange?.end != null &&
        //   state.dateRange.start < state.dateRange.end;

        return {
          target: data.receiver,
          value: data.amount,
          signature: "",
          calldata: "",
        };
      case "custom":
        const { abi: serializedABI, function: functionName, args } = data;
        const abi = JSON.parse(serializedABI);
        const signature = createSignature(abi);
        const calldata = encodeFunctionData({
          abi: [abi],
          functionName,
          args: args.slice(0, abi.inputs.length),
        });
        return {
          target: data.target,
          value: 0,
          signature: signature,
          calldata: calldata,
        };
      default:
        return {
          target: data.receiver,
          value: data.amount,
          signature: "",
          calldata: "",
        };
    }
  };

  const onSubmit = (data: any) => {
    const transactionData = processTransactionData(data);
    onSubmitCallback({
      target: transactionData.target,
      value: transactionData.value,
      signature: transactionData.signature,
      calldata: transactionData.calldata,
    });
  };

  return (
    <div>
      <h2 className="font-bold text-center">Add action</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-span-full mt-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Type
            </label>
            <div className="mt-1">
              <select
                {...register("type")}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              >
                <option value="transfer">Transfer</option>
                <option value="stream">Stream</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {renderFormForActionType(actionType)}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button onClick={closeModal} type="secondary" title="Cancel" />
            <Button isSubmit={true} type="primary" title="Add" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddActionForm;
