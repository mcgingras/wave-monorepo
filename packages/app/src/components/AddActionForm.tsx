import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { parseEther, decodeAbiParameters, encodeAbiParameters } from "viem";
import OneTimePaymentForm from "./OneTimePaymentForm";
import StreamingPaymentForm from "./StreamingPaymentForm";
import CustomTransactionForm from "./CustomTransactionForm";
import fetchPredictedStreamContractAddress from "@/hooks/useFetchPredictedStreamContractAddress";
import Button from "./ui/Button";

const createSignature = (functionAbiItem: any) =>
  `${functionAbiItem.name}(${
    functionAbiItem.inputs?.map((i: any) => i.type).join(",") ?? ""
  })`;

/**
 * Action types are the top level actions you can select from the UI.
 * Selecting an action will render a form that will help build a transaction.
 */
const actionTypes = [
  "one-time-payment",
  "streaming-payment",
  //   "payer-top-up", (not selectable)
  "custom-transaction",
];

const AddActionForm = ({
  closeModal,
  addAction,
}: {
  closeModal: () => void;
  addAction: (action: any) => void;
}) => {
  const methods = useForm<any>();
  const { register, handleSubmit, watch } = methods;
  const onSubmit: SubmitHandler<any> = async (data) => {
    let action;
    if (data.type === "one-time-payment") {
      action = {
        type: data.type,
        currency: data.currency,
        amount: data.amount,
        target: data.receiverAddress,
      };
    } else if (data.type === "streaming-payment") {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      const predictedStreamContractAddress =
        await fetchPredictedStreamContractAddress({
          receiverAddress: data.receiverAddress,
          currency: data.currency,
          amount: data.amount,
          startDate: start,
          endDate: end,
        });

      action = {
        type: data.type,
        currency: data.currency,
        amount: data.amount,
        target: data.receiverAddress,
        startTimestamp: start.getTime(),
        endTimestamp: end.getTime(),
        predictedStreamContractAddress: predictedStreamContractAddress,
      };
    } else if (data.type === "custom-transaction") {
      const parsedAbi = JSON.parse(data.abi);
      const selectedSignatureAbiItem = parsedAbi?.find(
        (i: any) => createSignature(i) === data.signature
      );
      const { inputs: inputTypes } = selectedSignatureAbiItem;
      action = {
        type: "custom-transaction",
        contractCallTarget: data.target,
        contractCallSignature: data.signature,
        contractCallArguments: JSON.parse(
          JSON.stringify(
            // Encoding and decoding gives us valid defaults for empty
            // arguments, e.g. empty numbers turn into zeroes
            decodeAbiParameters(
              inputTypes,
              encodeAbiParameters(inputTypes, data.args)
            ),
            (_, value) => (typeof value === "bigint" ? value.toString() : value)
          )
        ),
        contractCallValue: data.ethValue
          ? parseEther(data.ethValue).toString()
          : 0,
      };
    }

    addAction(action);
  };

  const type = watch("type");

  const renderFormForType = (type: string) => {
    switch (type) {
      case "one-time-payment":
        return <OneTimePaymentForm />;
      case "streaming-payment":
        return <StreamingPaymentForm />;
      case "custom-transaction":
        return <CustomTransactionForm />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-sm font-bold text-neutral-500 mb-1 ml-1">
            Action Type
          </label>
          {/*
            onChange --
            - set default values for the given type
            - clear out the old values for the other types
         */}
          <select className="border p-1" {...register("type")}>
            {actionTypes.map((actionType) => (
              <option key={actionType} value={actionType}>
                {actionType}
              </option>
            ))}
          </select>
          <div className="mt-4">
            {renderFormForType(type || actionTypes[0])}
          </div>
          <button className="mt-4 bg-blue-100 text-blue-500 rounded px-2 py-1 cursor-pointer">
            Submit
          </button>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={closeModal} type="secondary" title="Cancel" />
          <Button isSubmit={true} type="primary" title="Add" />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddActionForm;
