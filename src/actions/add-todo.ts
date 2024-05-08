'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action'
import { db } from '@/lib/db'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  userId: z.string().min(1).max(191),
  title: z.string().min(1).max(191),
})

export const addTodo = action(schema, async ({ userId, title }) => {
  let result: Todo | null = null;
  result = await db.todo.create({
    data: {
      userId: userId || "",
      title,
    },
  });
  revalidatePath('/')
  return result
})