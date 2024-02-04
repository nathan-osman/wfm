import {
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'
import { z } from 'zod'
import { ErrorSchema } from '../types/error'

type ApiContextType = {
  get: <T extends z.ZodTypeAny>(
    schema: T,
    url: string,
  ) => Promise<z.TypeOf<T>>
  post: <T extends z.ZodTypeAny>(
    schema: T,
    url: string,
    value: any,
  ) => Promise<z.TypeOf<T>>
}

const ApiContext = createContext<ApiContextType | null>(null)

function ApiProvider(props: PropsWithChildren) {

  const _fetch = async function <T>(url: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(url, init)
    if (!response.ok) {
      throw new Error(ErrorSchema.parse(await response.json()).error)
    }
    return await response.json()
  }

  const apiContext = {
    get: async function <T extends z.ZodTypeAny>(
      schema: T,
      url: string,
    ): Promise<z.TypeOf<T>> {
      return schema.parse(await _fetch(url))
    },
    post: async function <T extends z.ZodTypeAny>(
      schema: T,
      url: string,
      value: any,
    ): Promise<z.TypeOf<T>> {
      return schema.parse(
        await _fetch(
          url,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(value),
          }
        ),
      )
    },
  }

  return (
    <ApiContext.Provider value={apiContext}>
      {props.children}
    </ApiContext.Provider>
  )
}

function useApi(): ApiContextType {
  return useContext(ApiContext)!!
}

export {
  ApiProvider,
  useApi,
}
