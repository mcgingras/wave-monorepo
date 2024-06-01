import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";

type ABI = {};

type ABIFunction = {
  name: string;
  inputs: any[];
  outputs: any[];
  stateMutability: string;
  type: string;
};

const ABIFunctionInput = ({ input, name }: { input: any; name: string }) => {
  const { register } = useFormContext();

  switch (input.type) {
    case "string":
      return (
        <input
          {...register(name)}
          className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          type="text"
        />
      );
    case "uint256":
      return (
        <input
          {...register(name)}
          className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          type="number"
          placeholder="0"
        />
      );
    case "address":
      return (
        <input
          {...register(name)}
          className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          type="text"
          placeholder="0x..."
        />
      );
    default:
      return (
        <input
          {...register(name)}
          className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          type="text"
        />
      );
  }
};

const ABIFunctionForm = ({ func }: { func: ABIFunction }) => {
  return (
    <div className="mt-4">
      <span className="block text-sm font-medium leading-6 text-neutral-900">
        Arguments
      </span>
      {func?.inputs.map((input: any, index: number) => (
        <div key={index} className="mt-2">
          <label
            htmlFor={input.name}
            className="block text-sm font-medium leading-6 text-neutral-900"
          >
            {input.name}{" "}
            <span className="text-neutral-500 text-xs">({input.type})</span>
          </label>
          <ABIFunctionInput input={input} name={`args.${index}`} />
        </div>
      ))}
    </div>
  );
};

const ABIForm = ({ abi }: { abi: any }) => {
  const { register, control, setValue } = useFormContext();

  const functions = abi.filter(
    (item: any) => item.type === "function" && !item.constant
  );
  const [selectedFunction, setSelectedFunction] = useState(functions[0]);

  return (
    <div className="mt-4">
      <label
        htmlFor="function"
        className="block text-sm font-medium leading-6 text-neutral-900"
      >
        Function to call
      </label>
      <Controller
        control={control}
        name="function"
        render={({ field: { onChange } }) => (
          <select
            {...register("function")}
            onChange={(e) => {
              onChange(e);
              const newSelectedFunction = functions.find(
                (func: any) => func.name === e.target.value
              );
              setSelectedFunction(newSelectedFunction);
              setValue("abi", JSON.stringify(newSelectedFunction));
            }}
            className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          >
            {functions.map((func: any, index: number) => (
              <option key={index} value={func.name}>
                {func.name}
              </option>
            ))}
          </select>
        )}
      />

      <ABIFunctionForm func={selectedFunction} />
      {/* <input
        type="hidden"
        {...register("abi")}
        value={JSON.stringify(selectedFunction)}
      /> */}
      {/* {functions.map((func: any, index: number) => (
        <ABIFunctionForm key={index} func={func} />
      ))} */}
    </div>
  );
};

export default ABIForm;
