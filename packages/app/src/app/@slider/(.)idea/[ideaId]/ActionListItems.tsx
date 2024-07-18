"use client";

import { ActionListItem } from "@/components/ActionList";

const ActionListItems = ({ builtActions }: { builtActions: any }) => {
  return builtActions.map((action: any) => (
    <ActionListItem key={action.id} action={action} />
  ));
};

export default ActionListItems;
