import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import TodoItem from "@/components/todo-item";
import { Todo } from "@prisma/client";
import TodoAddForm from "@/components/todo-add-form";

export default async function HomePage() {
  const { userId } = auth();
  if (!userId) return;

  async function addTodo(title: string): Promise<Todo> {
    "use server";
    return await db.todo.create({
      data: {
        userId: userId || "",
        title,
      },
    });
  }

  const todos = await db.todo.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div className="w-full max-w-md">
        <TodoAddForm addTodo={addTodo} />
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox id="todo1" />
              <Label
                className="text-gray-500 dark:text-gray-400 line-through"
                htmlFor="todo1"
              >
                Buy groceries
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
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox id="todo2" />
              <Label
                className="text-gray-900 dark:text-gray-100"
                htmlFor="todo2"
              >
                Finish project proposal
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

          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox id="todo3" />
              <Label
                className="text-gray-500 dark:text-gray-400 line-through"
                htmlFor="todo3"
              >
                Call mom
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
        </div>
      </div>
    </div>
  );
}
