"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Todo } from "@prisma/client";
import { cn } from "@/lib/utils";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <Checkbox id={todo.id} />
          <Label
            className={cn(
              !todo.completed
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
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
