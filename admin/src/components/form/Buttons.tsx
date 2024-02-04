import { PropsWithChildren } from 'react'

export default function Buttons(props: PropsWithChildren) {
  return (
    <div className="inline-flex gap-x-2">
      {props.children}
    </div>
  )
}
