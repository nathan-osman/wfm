import { Outlet } from 'react-router-dom'
import { ApiProvider } from '../lib/api'
import { DialogProvider } from '../lib/dialog'

export default function App() {
  return (
    <DialogProvider>
      <ApiProvider>
        <Outlet />
      </ApiProvider>
    </DialogProvider>
  )
}
