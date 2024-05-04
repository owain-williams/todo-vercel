"use client";

import toggleComplete from "@/actions/toggle-complete";
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

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const { refresh } = useRouter();
  const [checked, setChecked] = useState<boolean>(todo.completed);
  const toggleChecked = () => setChecked(!checked);
  const { execute, result, status } = useAction(deleteTodo);

  useEffect(() => {
    toggleComplete(todo, checked);
  }, [checked]);

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2" onClick={toggleChecked}>
          <Checkbox
            checked={checked}
            id={todo.id}
            disabled={status === "executing"}
          />
          <Label
            className={cn(
              !checked
                ? "text-primary"
                : "line-through text-gray-500 dark:text-gray-400"
            )}
            htmlFor={todo.id}
          >
            {todo.title}
          </Label>
        </div>
        <Button
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          size="sm"
          variant="ghost"
          disabled={status === "executing"}
        >
          <TrashIcon
            className="h-4 w-4"
            onClick={() => {
              execute({ id: todo.id });
              refresh();
            }}
          />
        </Button>
      </div>
    </>
  );
}
