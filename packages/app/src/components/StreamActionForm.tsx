import { useFormContext } from "react-hook-form";
import AddressInput from "./ui/AddressInput";

const StreamActionForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const processFormState = (data: any) => {
    const { amount, receiver, currency, startDate, endDate } = data;
    if (currency === "ETH") {
      setValue("active--target", receiver);
      setValue("active--value", amount);
      setValue("active--signature", "");
      setValue("active--calldata", "");
    } else {
      setValue("active--target", receiver);
      setValue("active--value", "0");
      setValue("active--signature", "transfer(address,uint256)");
      setValue("active--calldata", `0x${receiver.slice(2)}`);
    }
  };

  watch((data, { name }) => {
    if (name === "amount" || name === "currency" || name === "receiver") {
      processFormState(data);
    }
  });

  return (
    <>
      <div className="mt-4">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium leading-6 text-neutral-900"
        >
          Start date
        </label>
        <div className="flex flex-row space-x-2">
          <input
            type="date"
            {...register("startDate")}
            className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium leading-6 text-neutral-900"
        >
          End date
        </label>
        <div className="flex flex-row space-x-2">
          <input
            type="date"
            {...register("endDate")}
            className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-neutral-900"
        >
          Amount
        </label>
        <div className="flex flex-row space-x-2">
          <input
            {...register("amount")}
            className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            placeholder="0"
          />
          <select
            {...register("currency")}
            className="block w-24 rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          >
            <option value="WETH">WETH</option>
            <option value="USDC">USDC</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="receiver"
          className="block text-sm font-medium leading-6 text-neutral-900"
        >
          Receiver
        </label>
        <AddressInput name="receiver" />
        <input type="hidden" {...register("active--target")} />
        <input type="hidden" {...register("active--value")} />
        <input type="hidden" {...register("active--signature")} />
        <input type="hidden" {...register("active--calldata")} />
      </div>
    </>
  );
};

export default StreamActionForm;
