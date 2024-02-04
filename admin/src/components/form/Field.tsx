import { PropsWithChildren } from 'react'

export default function Field(props: PropsWithChildren) {
  return (
    <div className='my-2'>
      {props.children}
    </div>
  )
}
