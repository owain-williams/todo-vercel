import TodoAddForm from "@/components/todo-add-form";
import TodoItem from "@/components/todo-item";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = auth();
  if (!userId) return;

  const todos = await db.todo.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <Link
          href="https://github.com/owain-williams/todo-vercel"
          className="p-4"
        >
          <GithubIcon />
        </Link>
        <div className="p-4">
          <UserButton />
        </div>
      </div>
      <div className="flex flex-col items-center py-2">
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
    </div>
  );
}
