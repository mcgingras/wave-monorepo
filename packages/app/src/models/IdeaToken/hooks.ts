import useSWR from "swr";
import { IdeaToken } from "./types";

/* -------------------------------------------------------------------------------------------------
 * useIdeaToken
 * -----------------------------------------------------------------------------------------------*/

export const useIdeaTokens = () => {
  const { error, isLoading, mutate, data } = useSWR(
    true
      ? {
          url: `http://localhost:42069`,
          args: { nothing: true },
        }
      : null,
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
          url: `http://localhost:42069`,
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
            id
            author
            title
            description
            createdAt
            actions
            supporters {
                balance
                owner
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
  console.log(json);
  return json.data;
}

async function SWRGetIdeaTokens({
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
  query GetIdeaTokens {
    ideaTokens {
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
