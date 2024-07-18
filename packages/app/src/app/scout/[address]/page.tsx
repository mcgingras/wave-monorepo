import Image from "next/image";
import EnsImage from "./EnsImage";
import EnsName from "./EnsName";
import { Support } from "@/models/Supporter/types";
import IdeaNFT from "@/components/IdeaNFT";
import { formatUnits } from "viem";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const getSupporter = async (supporterAddress: string) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
      query GetSupporter($supporterAddress: String!) {
          supporter(id: $supporterAddress) {
              id
              supportedIdeas {
                items {
                token {
                  id
                  title
                  nounsProposalId
                }
                reason
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
      variables: { supporterAddress },
    }),
  };

  try {
    const data = await fetch(url, graphqlRequest);
    const json = await data.json();
    return json.data.supporter;
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

const BadgeCardTwo = ({ support }: { support: Support }) => {
  return (
    <div className="bg-white p-4 rounded-lg flex flex-row space-x-4">
      <div className="flex justify-center items-center p-2 bg-neutral-100 rounded-sm relative w-1/3">
        <Image src="/badge.svg" alt="temporary nft image" fill={true} />
        {/* <p className="text-sm text-neutral-500">
                  Balance: {idea.balance}
                </p> */}
      </div>
      <div className="flex flex-col w-2/3">
        <span className="text-neutral-400">{support.token.id.toString()}</span>
        <h3 className="font-bold flex-1 mt-1">{support.token.title}</h3>
        <p className="text-sm text-neutral-500 line-clamp-3 mt-1">
          {support.reason}
        </p>
      </div>
    </div>
  );
};

const BadgeCard = ({ support }: { support: Support }) => {
  return (
    <div className="bg-white rounded-lg">
      <a href={`/idea/${support.token.id}`} className="block">
        <div className="flex items-center justify-center border-b border-neutral-100 p-8">
          <IdeaNFT id={support.token.id} className="h-[150px] w-[150px]" />
        </div>
        <div className="p-4">
          <div className="flex flex-row space-x-2 items-center">
            <span className="text-neutral-500 bg-neutral-100 rounded-lg text-xs px-2 py-0.5 flex items-center justify-center self-start">
              {support.token.id.toString()}
            </span>
            <h3 className="text-sm text-neutral-700 font-bold polymath-disp tracking-wider flex-1">
              {support.token.title}
            </h3>
            <span className="bg-green-100 text-green-500 rounded-lg text-xs px-2 py-0.5 self-start">
              + {formatUnits(BigInt(support.balance), 18)} ETH
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-4">{support.reason}</p>
        </div>
      </a>
    </div>
  );
};

const ScoutPage = async ({
  params,
}: {
  params: { address: `0x${string}` };
}) => {
  const supporter = await getSupporter(params.address);
  const supportedIdeas = supporter.supportedIdeas.items;
  console.log(supportedIdeas);
  const proposals = supportedIdeas.filter(
    (support: any) => support.token.nounsProposalId !== null
  );
  const fundedProposals = supportedIdeas.filter(
    (support: any) => support.token.nounsProposalStatus === "PASSED"
  );

  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] pt-12 flex flex-col bg-neutral-100">
      <div className="container mx-auto pb-12">
        <section className="grid grid-cols-3 gap-12">
          <div>
            <div className="flex flex-row space-x-4 items-center self-start">
              <EnsImage address={params.address} />
              <EnsName
                address={params.address}
                className="polymath-disp font-bold text-2xl text-neutral-800"
              />
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex flex-row items-center space-x-4">
                <p className="text-neutral-500">Ideas</p>
                <span className="h-1 block border-b border-dotted border-neutral-400 flex-1"></span>
                <span className="font-semibold text-neutral-700">
                  {supportedIdeas.length}
                </span>
              </li>
              <li className="flex flex-row items-center space-x-4">
                <p className="text-neutral-500">Proposals</p>
                <span className="h-1 block border-b border-dotted border-neutral-400 flex-1"></span>
                <span className="font-semibold text-neutral-700">
                  {proposals.length}
                </span>
              </li>
              <li className="flex flex-row items-center space-x-4">
                <p className="text-neutral-500">Passed proposals</p>
                <span className="h-1 block border-b border-dotted border-neutral-400 flex-1"></span>
                <span className="font-semibold text-neutral-700">
                  {fundedProposals.length}
                </span>
              </li>
            </ul>
          </div>
        </section>
        <section className="mt-12">
          <h3 className="polymath-disp font-bold text-2xl text-neutral-800">
            Supported ideas
          </h3>
          {supportedIdeas.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {supportedIdeas.map((support: Support, idx: number) => {
                return (
                  <BadgeCard key={`supported-idea-${idx}`} support={support} />
                );
              })}
            </div>
          ) : (
            <div className="text-center">No supported ideas</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ScoutPage;
