import { getAddress as checksumEncodeAddress } from "viem";

export const truncateAddress = (address_: `0x${string}`) => {
  const address = checksumEncodeAddress(address_);
  return [address.slice(0, 6), address.slice(-4)].join("...");
};

export const formatSolidityArgument = (a: string | any[] | any): string => {
  if (typeof a === "string") return `"${a}"`;
  if (Array.isArray(a)) return `[${a.map(formatSolidityArgument).join(",")}]`;

  const formattedInput = a.toString();

  if (formattedInput !== "[object Object]") return formattedInput;

  // @ts-ignore
  const formattedEntries = Object.entries(a).reduce((acc, [key, value]) => {
    const formattedValue = formatSolidityArgument(value);
    if (acc == null) return `${key}: ${formattedValue}`;
    return `${acc}, ${key}: ${formattedValue}`;
  }, null);

  return `(${formattedEntries})`;
};
