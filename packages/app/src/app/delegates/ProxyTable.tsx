import ProxyTableUI from "./ProxyTableUI";

const getDelegateProxies = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
      query GetDelegateProxies {
          delegateProxys {
              items {
              id
              nouns {
                items {
                    id
                }
              }
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

const ProxyTable = async () => {
  const delegateProxies = await getDelegateProxies();
  return <ProxyTableUI data={delegateProxies} />;
};

export default ProxyTable;
