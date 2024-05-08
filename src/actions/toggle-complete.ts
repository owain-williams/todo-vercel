'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action'
import { db } from "@/lib/db"
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  id: z.string(),
  checked: z.boolean(),
})

export const toggleComplete = action(schema, async ({ id, checked }) => {
  let result: Todo | null = null;
  if (checked) {
    result = await db.todo.update({
      where: {
        id,
      },
      data: {
        completed: checked,
        completedAt: new Date(),
      },
    })
  } else {
    result = await db.todo.update({
      where: {
        id,
      },
      data: {
        completed: checked,
      },
    })
  }
  revalidatePath('/')
  return result
})