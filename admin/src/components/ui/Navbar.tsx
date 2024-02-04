import { MouseEvent } from 'react'
import { useApi } from '../../lib/api'

export default function Navbar() {

  const api = useApi()

  function handleLogout(e: MouseEvent) {
    e.preventDefault()
    api.logout()
  }

  return (
    <div className="bg-gray-100 mb-4">
      <div className="container flex items-center mx-auto my-4">
        <div className="grow">
          <div className="text-4xl">WFM</div>
          <div className="text-gray-500">Web File Manager</div>
        </div>
        <a href="#" onClick={handleLogout}>Logout</a>
      </div>
    </div>
  )
}
