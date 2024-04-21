import { useFormContext } from "react-hook-form";
import { useEnsAddress } from "wagmi";
import { normalize } from "viem/ens";

const AddressInput = ({ name }: { name: string }) => {
  const { register, watch } = useFormContext();

  const address = watch(name);

  const { data: ensAddress } = useEnsAddress({
    chainId: 1,
    name: address,
  });

  console.log("ens", ensAddress);

  return (
    <>
      <input
        type="text"
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
        placeholder="lilfrog.eth"
        {...register(name)}
      />
      <p className="text-xs text-neutral-500 mt-1">{ensAddress}</p>
    </>
  );
};

export default AddressInput;
