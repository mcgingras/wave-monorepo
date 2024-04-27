import { ActionObject } from "@/models/IdeaToken/types";

const ActionDisplay = ({ actions }: { actions: ActionObject }) => {
  return (
    <pre className="bg-neutral-100 p-2 mt-2 rounded">
      {actions.targets.map((_target, index) => {
        return (
          <div key={index} className="flex flex-row space-x-2">
            <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start uppercase">
              {actions.values[index]} ETH TO {actions.targets[index]}
            </span>
            <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start uppercase">
              {actions.signatures[index]}
            </span>
          </div>
        );
      })}
    </pre>
  );
};

export default ActionDisplay;
