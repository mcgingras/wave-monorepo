import { Suspense } from "react";
import ProxyTable from "./ProxyTable";
import DelegateTable from "./DelegateTable";
import Hero from "./Hero";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const getDelegateProxies = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
        query GetDelegateProxies {
            delegateProxys {
                items {
                id
                votingPower
                delegators {
                    items {
                        id
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
    return json.data.delegateProxys.items;
  } catch (e) {
    console.log("error", e);
    return [];
  }
};

const DelegatePage = async () => {
  const delegateProxies = await getDelegateProxies();
  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] pt-12 flex flex-col bg-neutral-100">
      <div className="container mx-auto pb-12">
        <Hero proxies={delegateProxies} />
        <section className="mt-12">
          <h3 className="polymath-disp font-bold text-2xl text-neutral-800">
            Delegate proxies
          </h3>
          <Suspense fallback={"loading"}>
            <ProxyTable />
          </Suspense>
        </section>
        <section className="mt-12">
          <h3 className="polymath-disp font-bold text-2xl text-neutral-800">
            Current delegates
          </h3>
          <DelegateTable />
        </section>
      </div>
    </div>
  );
};

export default DelegatePage;
