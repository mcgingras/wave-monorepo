import DelegateTableUI from "./DelegateTableUI";

const getDelegates = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
        query GetDelegates{
            delegators {
                items {
                id
                delegateProxyId
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
    return json.data.delegators.items;
  } catch (e) {
    console.log("error", e);
    return [];
  }
};

const DelegateTable = async () => {
  const delegates = await getDelegates();
  return <DelegateTableUI data={delegates} />;
};

export default DelegateTable;
