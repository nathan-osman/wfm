import { useEffect, useState } from 'react'
import { useApi } from '../lib/api'
import { useDialog } from '../lib/dialog'
import Button from './form/Button'
import Field from './form/Field'
import { Folder, FolderSchema } from '../types/folders'

export default function Folders() {

  const api = useApi()
  const dialog = useDialog()

  const [folders, setFolders] = useState<Folder[] | null>(null)

  useEffect(() => {
    api.get(FolderSchema.array(), '/api/folders')
      .then(v => setFolders(v))
  }, [])

  function handleAddNew() {
    //...
  }

  return (
    <div className="bg-gray-100 p-4 min-w-64">
      <div className="font-bold mb-2">
        Folders
      </div>
      <div>
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
          onClick={handleAddNew}
        >
          Add New
        </Button>
      </Field>
    </div>
  )
}
