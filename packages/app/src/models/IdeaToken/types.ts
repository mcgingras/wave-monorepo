import { Supporter } from "../Supporter/types";

export type IdeaToken = {
  id: BigInt;
  author: string;
  title: string;
  description: string;
  createdAt: BigInt;
  supporters: Supporter[];
};
