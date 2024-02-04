import { z } from 'zod'

export const FolderSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  type: z.string(),
})

export type Folder = z.TypeOf<typeof FolderSchema>
