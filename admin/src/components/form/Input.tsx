import { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full border border-gray-300 p-2"
      {...props}
    />
  )
}
