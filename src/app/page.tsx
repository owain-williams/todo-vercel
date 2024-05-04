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

  const todos = await db.todo.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <div className="w-full max-w-md">
        <TodoAddForm userId={userId} />
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}
