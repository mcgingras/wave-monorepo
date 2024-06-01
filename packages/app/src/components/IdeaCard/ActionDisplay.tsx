import { ActionObject } from "@/models/IdeaToken/types";

const ActionDisplay = ({ actions }: { actions: string }) => {
  const parsedActions = JSON.parse(actions);
  return (
    <pre className="bg-neutral-100 p-2 mt-2 rounded">
      {parsedActions.targets.map((_target, index) => {
        return (
          <div key={index} className="flex flex-row space-x-2">
            <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start uppercase">
              {parsedActions.values[index]} ETH TO{" "}
              {parsedActions.targets[index]}
            </span>
            <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start uppercase">
              {parsedActions.signatures[index]}
            </span>
          </div>
        );
      })}
    </pre>
  );
};

export default ActionDisplay;
