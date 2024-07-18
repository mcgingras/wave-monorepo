import { useFormContext } from "react-hook-form";

const OneTimePaymentForm = () => {
  const methods = useFormContext();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <label className="block text-sm font-medium leading-6 text-neutral-800">
          Amount
        </label>
        <input
          type="number"
          {...methods.register("amount")}
          className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-200 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium leading-6 text-neutral-800">
          Currency
        </label>
        <select
          {...methods.register("currency")}
          className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-200 sm:text-sm sm:leading-6"
        >
          <option value="eth">ETH</option>
          <option value="usdc">USDC</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium leading-6 text-neutral-800">
          Reciever
        </label>
        <input
          {...methods.register("receiverAddress")}
          className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-200 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default OneTimePaymentForm;
