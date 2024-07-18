import {
  ImageData,
  getNounSeedFromBlockHash,
  getNounData,
} from "@nouns/assets";
import { buildSVG } from "@nouns/sdk";

type Seed = {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
};

const svgCacheBySeed = new Map();

const buildSvgStringFromSeed = (seed: Seed, { transparent = false } = {}) => {
  let cacheKey = [
    seed.background,
    seed.body,
    seed.accessory,
    seed.head,
    seed.glasses,
  ].join("-");

  if (transparent) cacheKey += "-t";

  if (svgCacheBySeed.has(cacheKey)) return svgCacheBySeed.get(cacheKey);

  const { parts, background } = getNounData(seed);

  return buildSVG(
    parts,
    ImageData.palette,
    transparent ? "00000000" : background
  );
};

const buildDataUriFromSvgString = (svgString: string) => {
  const svgBase64 = btoa(svgString);
  return `data:image/svg+xml;base64,${svgBase64}`;
};

const getPseudorandomAccountSeed = (address: `0x${string}`) => {
  const paddedAddress = `0x${address.replace("0x", "").padStart(32 * 2, "0")}`;
  return getNounSeedFromBlockHash(0, paddedAddress);
};

export const buildAccountPlaceholderSvgString = (
  accountAddress: `0x${string}`,
  options: any
) => {
  const seed = getPseudorandomAccountSeed(accountAddress);
  return buildSvgStringFromSeed(seed, options);
};

export const buildAccountPlaceholderDataUri = (
  accountAddress: `0x${string}`,
  options: any
) => {
  const svgString = buildAccountPlaceholderSvgString(accountAddress, options);
  return buildDataUriFromSvgString(svgString);
};

export const buildDataUriFromSeed = (seed: Seed, options: any) => {
  const svgString = buildSvgStringFromSeed(seed, options);
  return buildDataUriFromSvgString(svgString);
};
