import { FormEvent, useState } from 'react'
import { Params, useLoaderData } from 'react-router-dom'
import { z } from 'zod'
import { apiGet, apiPost } from '../lib/api'
import Field from '../components/form/Field'
import Input from '../components/form/Input'
import Textarea from '../components/form/Textarea'
import Title from '../components/ui/Title'
import { Folder, FolderSchema } from '../types/folders'
import Half from '../components/util/Half'
import Button from '../components/form/Button'

export async function createEditFolderLoader(
  { params }: { params: Params<"folderId"> },
): Promise<Folder> {
  return apiGet(FolderSchema, `/api/folders/${params.folderId}`)
}

export default function CreateEditFolder() {

  const folder = useLoaderData() as Folder | null
  const isEditing = folder === null

  const [name, setName] = useState(folder?.name ?? '')
  const [description, setDescription] = useState(folder?.description ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    apiPost(z.void(), '/api/folders/create', {
      name,
      description,
    })
  }

  return (
    <>
      <Title
        text={isEditing ? "Edit Folder" : "Create Folder"}
      />
      <form onSubmit={handleSubmit}>
        <Half>
          <Field>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
            />
          </Field>
          <Field>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="description"
            />
          </Field>
          <Field>
            <Button
              primary={true}
              type="submit"
            >
              Save
            </Button>
          </Field>
        </Half>
      </form>
    </>
  )
}
