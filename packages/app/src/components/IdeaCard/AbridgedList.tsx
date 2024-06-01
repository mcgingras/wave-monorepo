import Link from "next/link";
import { IdeaToken } from "@/models/IdeaToken/types";
import AbridgedIdeaCard from "./Abridged";

const AbridgedList = ({ ideas }: { ideas: IdeaToken[] }) => {
  return (
    <div className="flex flex-col">
      {ideas.map((idea) => (
        <AbridgedIdeaCard ideaToken={idea} key={idea.id.toString()} />
      ))}
    </div>
  );
};

export default AbridgedList;
