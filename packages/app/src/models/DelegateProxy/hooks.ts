import useSWR from "swr";
import { DelegateProxy } from "./types";

/* -------------------------------------------------------------------------------------------------
 * useDelegateProxies
 * -----------------------------------------------------------------------------------------------*/

export const useDelegateProxies = () => {
  const { error, isLoading, mutate, data } = useSWR(
    {
      key: "GetDelegateProxies",
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
      args: { nothing: true },
    },
    SWRGetDelegateProxies
  );

  const delegateProxies = data?.delegateProxys || [];
  const isEmpty = delegateProxies.length === 0;

  return {
    isLoading: isLoading,
    isEmpty,
    mutate,
    error,
    delegateProxies,
  };
};

/* -------------------------------------------------------------------------------------------------
 * SWRGetDelegateProxies
 * -----------------------------------------------------------------------------------------------*/

async function SWRGetDelegateProxies({
  url,
  args,
}: {
  url: string;
  args: any;
}): Promise<{
  success: boolean;
  delegateProxys: DelegateProxy[];
}> {
  const query = `
  query GetDelegateProxies {
    delegateProxys {
        items {
        id
        votingPower
        delegators {
          id
        }
       }
      }
    }
 `;

  const graphqlRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data;
}
