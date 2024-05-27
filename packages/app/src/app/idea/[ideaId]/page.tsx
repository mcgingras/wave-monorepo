"use client";

import { useIdeaToken } from "@/models/IdeaToken/hooks";
import IdeaCardSkeleton from "@/components/IdeaCard/Skeleton";
import ExpandableIdeaCard from "@/components/IdeaCard/Expandable";

const IdeaPage = ({ params }: { params: { ideaId: bigint } }) => {
  const { ideaToken, isLoading } = useIdeaToken(params.ideaId);

  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] bg-neutral-100 py-12 flex flex-col">
      <section className="w-[600px] mx-auto space-y-4">
        {ideaToken ? (
          <ExpandableIdeaCard
            ideaToken={ideaToken}
            expandable={true}
            clickable={false}
            archived={ideaToken.isArchived}
          />
        ) : (
          <IdeaCardSkeleton />
        )}
      </section>
    </div>
  );
};

export default IdeaPage;
