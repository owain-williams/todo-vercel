'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action'
import { db } from "@/lib/db"

const schema = z.object({
  id: z.string(),
  checked: z.boolean(),
})

export const toggleComplete = action(schema, async ({ id, checked }) => {
  if (checked) {
    return await db.todo.update({
      where: {
        id,
      },
      data: {
        completed: checked,
        completedAt: new Date(),
      },
    })
  } else {
    return await db.todo.update({
      where: {
        id,
      },
      data: {
        completed: checked,
      },
    })
  }
})