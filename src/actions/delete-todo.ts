'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action'
import { db } from '@/lib/db'

const schema = z.object({
  id: z.string(),
})

export const deleteTodo = action(schema, async ({ id }) => {
  return await db.todo.delete({
    where: {
      id,
    },
  })
})