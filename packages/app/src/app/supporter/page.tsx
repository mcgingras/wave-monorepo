import Table from "./Table";

// clears out next-js cache for viem calls
// this might not be the "best" way but at least it's not storing stale data
// TODO: review next's caching strategies and decide on best one.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const getSupporters = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
            query GetSupporters {
                    supporters {
                         items {
                            id
                            supportedIdeas {
                                items {
                                token {
                                    nounsProposalId
                                }
                                reason
                                balance
                                }
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
      variables: {},
    }),
  };

  try {
    const data = await fetch(url, graphqlRequest);
    const json = await data.json();
    return json.data.supporters.items;
  } catch (e) {
    console.log("error", e);
    return [];
  }
};

const SupportersPage = async () => {
  const supporters = await getSupporters();

  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] pt-12 flex flex-col bg-neutral-100">
      <section className="container mx-auto pb-12">
        <h2 className="polymath-disp font-bold text-2xl text-neutral-800">
          Supporters
        </h2>
        <Table data={supporters} />
      </section>
    </div>
  );
};

export default SupportersPage;
