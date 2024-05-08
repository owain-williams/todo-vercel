"use client";

import { toggleComplete } from "@/actions/toggle-complete";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Todo } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteTodo } from "@/actions/delete-todo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { intlFormatDistance } from "date-fns";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const { refresh } = useRouter();
  const [checked, setChecked] = useState<boolean>(todo.completed);
  const toggleChecked = () => setChecked(!checked);
  const { execute: deleteExecute, status: deleteStatus } =
    useAction(deleteTodo);
  const {
    execute: executeToggle,
    result: resultToggle,
    status: statusToggle,
  } = useAction(toggleComplete);

  useEffect(() => {
    executeToggle({ id: todo.id, checked });
  }, [checked, executeToggle, todo.id]);

  useEffect(() => {
    if (statusToggle === "hasSucceeded") {
      refresh();
    }
  }, [statusToggle, refresh]);

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2" onClick={toggleChecked}>
          <Checkbox
            checked={checked}
            id={todo.id}
            disabled={deleteStatus === "executing"}
          />
          <Label
            className={cn(
              !checked ? "text-primary" : "line-through text-primary/50"
            )}
            htmlFor={todo.id}
          >
            {todo.title}
          </Label>
        </div>
        <div className="flex flex-row items-center gap-4">
          <sub className="text-primary/50">
            {checked
              ? intlFormatDistance(todo.completedAt, new Date())
              : intlFormatDistance(todo.updatedAt, new Date())}
          </sub>
          <Button
            className="text-primary/50 hover:text-primary"
            size="sm"
            variant="ghost"
            disabled={deleteStatus === "executing"}
            aria-label="Delete todo item"
          >
            <TrashIcon
              className="h-4 w-4"
              onClick={() => {
                deleteExecute({ id: todo.id });
                refresh();
              }}
            />
          </Button>
        </div>
      </div>
    </>
  );
}
