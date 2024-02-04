export default function Spinner() {
  return (
    <div className="grow h-full flex gap-x-4 items-center justify-center">
      <div className="text-4xl">
        <i className="fa-solid fa-cog fa-spin"></i>
      </div>
      <div>
        <div className="text-2xl">Please wait</div>
        <div className="text-muted">Page is loading...</div>
      </div>
    </div>
  )
}
