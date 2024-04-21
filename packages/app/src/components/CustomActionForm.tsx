import { useFormContext } from "react-hook-form";
import AddressInput from "./ui/AddressInput";

const CustomActionForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const processFormState = (data: any) => {
    const { amount, receiver, currency } = data;
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
          htmlFor="target"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Target contract
        </label>

        <input
          {...register("target")}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
          placeholder="0xabc"
        />
      </div>
    </>
  );
};

export default CustomActionForm;
