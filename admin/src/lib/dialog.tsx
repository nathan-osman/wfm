import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'

type DialogContextType = {
  show: (content: ReactNode, buttons: ReactNode) => void
  close: () => void
}

const DialogContext = createContext<DialogContextType | null>(null)

function DialogProvider(props: PropsWithChildren) {

  const [isShown, setIsShown] = useState<boolean>(false)
  const [content, setContent] = useState<ReactNode>(null)
  const [buttons, setButtons] = useState<ReactNode>(null)

  const dialogContext = {
    show: function (content: ReactNode, buttons: ReactNode) {
      setIsShown(true)
      setContent(content)
      setButtons(buttons)
    },
    close: function () {
      setIsShown(false)
    },
  }

  return (
    <DialogContext.Provider value={dialogContext}>
      {
        isShown &&
        <div className="fixed w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="shadow-2xl">
            <div className="bg-white p-4">
              {content}
            </div>
            <div className="bg-gray-100 p-4 text-right">
              {buttons}
            </div>
          </div>
        </div>
      }
      {props.children}
    </DialogContext.Provider>
  )
}

function useDialog(): DialogContextType {
  return useContext(DialogContext)!!
}

export {
  DialogProvider,
  useDialog,
}
