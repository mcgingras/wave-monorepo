import Link from "next/link";
import { IdeaToken } from "@/models/IdeaToken/types";
import AbridgedIdeaCard from "./Abridged";

const AbridgedList = ({ ideas }: { ideas: IdeaToken[] }) => {
  return (
    <div className="flex flex-col">
      {ideas.map((idea) => (
        <Link href={`/idea/${idea.id}`} key={idea.id.toString()}>
          <AbridgedIdeaCard ideaToken={idea} />
        </Link>
      ))}
    </div>
  );
};

export default AbridgedList;
