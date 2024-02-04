import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { clsx } from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean
}

export default function Button(props: PropsWithChildren<Props>) {

  const {
    primary,
    children,
    ...otherProps
  } = props

  const className = clsx(
    primary ? 'bg-blue-700' : 'bg-gray-500',
    primary ? 'hover:bg-blue-500' : 'hover:bg-gray-400',
    'text-white',
    'px-4',
    'py-2',
  )

  return (
    <button
      className={className}
      {...otherProps}
    >
      {children}
    </button>
  )
}
