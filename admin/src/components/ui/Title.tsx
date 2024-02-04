type Props = {
  text: string
}

export default function (props: Props) {
  return (
    <div className="text-4xl mb-8">
      {props.text}
    </div>
  )
}
