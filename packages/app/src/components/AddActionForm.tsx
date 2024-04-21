import { useForm, FormProvider } from "react-hook-form";
import { useReadContract, useAccount } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import TransferActionForm from "./TransferActionForm";
import StreamActionForm from "./StreamActionForm";
import CustomActionForm from "./CustomActionForm";

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
  const { data: suitableDelegateForAddress, error } = useReadContract({
    address: configAddresses.PropLotHarness as `0x${string}`,
    abi: PropLotHarnessABI,
    functionName: "getSuitableDelegateFor",
    args: [address as `0x${string}`],
  });

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

  const onSubmit = (data: any) => {
    onSubmitCallback({
      target: data["active--target"],
      value: data["active--value"],
      signature: data["active--signature"],
      calldata: data["active--calldata"],
    });
  };

  return (
    <div>
      <h1 className="font-bold">Add action</h1>
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
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
              >
                <option value="transfer">Transfer</option>
                <option value="stream">Stream</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {renderFormForActionType(actionType)}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              className="px-3 py-1 rounded-full border-2 border-neutral-800 hover:bg-neutral-100 transition-colors text-sm"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-white text-sm">
              Add
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddActionForm;
