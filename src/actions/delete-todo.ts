'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action'
import { db } from '@/lib/db'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  id: z.string(),
})

export const deleteTodo = action(schema, async ({ id }) => {
  let result: Todo | null = null;
  result = await db.todo.delete({
    where: {
      id,
    },
  })
  revalidatePath('/')
  return result
})