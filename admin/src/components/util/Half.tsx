import { PropsWithChildren } from 'react'

export default function Half(props: PropsWithChildren) {
  return (
    <div className="lg:w-1/2">
      {props.children}
    </div>
  )
}
