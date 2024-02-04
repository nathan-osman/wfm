import { useEffect, useState } from 'react'
import { useApi } from '../lib/api'
import Folders from './Folders'
import Navbar from './ui/Navbar'
import { Folder, FolderSchema } from '../types/folders'

export default function () {

  const api = useApi()

  const [folders, setFolders] = useState<Folder[] | null>(null)

  useEffect(() => {
    api.get(FolderSchema.array(), '/api/folders')
      .then(v => setFolders(v))
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mx-auto flex">
        {
          folders !== null ?
            <Folders
              folders={folders}
            /> :
            <div>Loading...</div>
        }
      </div>
    </>
  )
}
