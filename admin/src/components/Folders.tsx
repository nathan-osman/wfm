import { useLoaderData, useNavigate } from 'react-router-dom'
import Button from './form/Button'
import Field from './form/Field'
import { Folder, FolderSchema } from '../types/folders'
import { apiGet } from '../lib/api'

export async function foldersLoader(): Promise<Folder[]> {
  return apiGet(FolderSchema.array(), '/api/folders')
}

export default function Folders() {

  const navigate = useNavigate()

  const folders = useLoaderData() as Folder[]

  return (
    <div className="bg-gray-100 p-4 min-w-64">
      <div className="font-bold mb-2">
        Folders
      </div>
      <div className="my-4">
        {
          folders !== null ?
            (
              folders.length ?
                folders.map((f, i) => (
                  <div key={i}>
                    {f.name}
                  </div>
                )) :
                <div className="text-gray-500">No folders</div>
            ) :
            <div className="text-gray-500">Loading...</div>
        }
      </div>
      <Field>
        <Button
          type="button"
          primary={true}
          onClick={() => navigate('/folders/create')}
        >
          Create
        </Button>
      </Field>
    </div>
  )
}
