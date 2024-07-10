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
          <label className="block text-sm font-medium leading-6 text-neutral-800">
            Action Type
          </label>
          {/*
            onChange --
            - set default values for the given type
            - clear out the old values for the other types
         */}
          <select
            className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-200 sm:text-sm sm:leading-6"
            {...register("type")}
          >
            {actionTypes.map((actionType) => (
              <option key={actionType} value={actionType}>
                {actionType}
              </option>
            ))}
          </select>
          <div className="mt-4">
            {renderFormForType(type || actionTypes[0])}
          </div>
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
