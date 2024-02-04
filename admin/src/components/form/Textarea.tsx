import { TextareaHTMLAttributes } from 'react'

export default function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full border border-gray-300 p-2"
      {...props}
    />
  )
}
