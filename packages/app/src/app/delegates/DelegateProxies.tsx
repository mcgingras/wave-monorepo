import { truncateEthAddress } from "@/lib/utils";

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
    return null;
  }
};

const DelegateProxies = async () => {
  const delegateProxies = await getDelegateProxies();
  return (
    <div className="w-full bg-white rounded-lg">
      {delegateProxies.map((proxy: any, id: any) => {
        return (
          <div
            key={proxy.id}
            className="p-4 border-b border-neutral-100 flex flex-col space-y-2"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row space-x-1">
                <h2 className="font-bold">Proxy {id + 1}</h2>
                <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
                  {truncateEthAddress(proxy.id)}
                </span>
              </div>
              <span
                className={`h-4 w-4 rounded-full flex items-center justify-center ${
                  parseInt(proxy.votingPower.toString()) > 0
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                <span
                  className={`rounded-full h-2 w-2 ${
                    parseInt(proxy.votingPower.toString()) > 0
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>
              </span>
            </div>
            <div className="text-neutral-500 text-sm">
              Voting power: {proxy.votingPower.toString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DelegateProxies;
