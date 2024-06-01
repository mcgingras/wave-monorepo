import useSWR from "swr";
import { IdeaToken } from "./types";

/* -------------------------------------------------------------------------------------------------
 * useIdeaToken
 * -----------------------------------------------------------------------------------------------*/

export const useIdeaTokens = () => {
  const { error, isLoading, mutate, data } = useSWR(
    {
      key: "GetIdeaTokens",
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    },
    SWRGetIdeaTokens
  );

  const ideaTokens = data?.ideaTokens || [];
  const isEmpty = ideaTokens.length === 0;

  return {
    isLoading: isLoading,
    isEmpty,
    mutate,
    error,
    ideaTokens,
  };
};

export const useIdeaToken = (ideaTokenId: bigint) => {
  const { error, isLoading, mutate, data } = useSWR(
    ideaTokenId
      ? {
          key: "GetIdeaToken",
          url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
          args: { ideaTokenId },
        }
      : null,
    SWRGetIdeaToken
  );

  const ideaToken = data?.ideaToken || null;

  if (ideaToken && typeof ideaToken.actions === "string") {
    ideaToken.actions = JSON.parse(ideaToken.actions);
  }

  return {
    isLoading,
    mutate,
    error,
    ideaToken,
  };
};

export const useIdeaTokensForWave = (waveId: bigint) => {
  const { error, isLoading, mutate, data } = useSWR(
    {
      key: "GetIdeaTokensForWave",
      url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
      args: { waveId },
    },
    SWRGetIdeaTokensForWave
  );

  const ideaTokens = data?.ideaTokens || [];

  return {
    isLoading,
    mutate,
    error,
    ideaTokens,
  };
};

/* -------------------------------------------------------------------------------------------------
 * SWRGetIdeaToken
 * -----------------------------------------------------------------------------------------------*/

export async function SWRGetIdeaToken({
  url,
  args,
}: {
  url: string;
  args: any;
}): Promise<{
  success: boolean;
  ideaToken: IdeaToken;
}> {
  const query = `
    query GetIdeaToken($ideaTokenId: BigInt!) {
        ideaToken(id: $ideaTokenId) {
            items {
            id
            author
            title
            description
            createdAt
            actions
            isArchived
            supporters {
                balance
                owner
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
      variables: args,
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data;
}

async function SWRGetIdeaTokens({ url }: { url: string }): Promise<{
  success: boolean;
  ideaTokens: IdeaToken[];
}> {
  const query = `
  query GetIdeaTokens {
    ideaTokens(where: { isArchived: false }) {
        items {
        id
        author
        title
        description
        createdAt
        supporters {
            balance
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

async function SWRGetIdeaTokensForWave({
  url,
  args,
}: {
  url: string;
  args: any;
}): Promise<{
  success: boolean;
  ideaTokens: IdeaToken[];
}> {
  const query = `
  query GetIdeaTokensForWave($waveId: BigInt!) {
    ideaTokens(where: { waveId: $waveId }) {
        items {
        id
        author
        title
        description
        createdAt
        supporters {
            balance
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
      variables: args,
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data;
}
