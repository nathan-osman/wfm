import Folders from '../components/Folders'
import Navbar from '../components/ui/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex">
        <Folders />
      </div>
    </>
  )
}
