import { Outlet } from 'react-router-dom'
import Folders from '../components/Folders'
import Navbar from '../components/ui/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex gap-x-8 items-start">
        <Folders />
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </>
  )
}
