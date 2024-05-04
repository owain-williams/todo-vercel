'use server'

import { db } from "@/lib/db"
import { Todo } from "@prisma/client"

export default async function toggleComplete(todo: Todo, checked: boolean) {
  return await db.todo.update({
    where: {
      id: todo.id,
    },
    data: {
      completed: checked,
    },
  })
}