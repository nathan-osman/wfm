import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export default function Button(
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>,
) {
  const { children, ...otherProps } = props
  return (
    <button
      className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2"
      {...otherProps}
    >
      {children}
    </button>
  )
}
