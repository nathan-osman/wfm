import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { z } from 'zod'
import Spinner from '../components/Spinner'
import { ErrorSchema } from '../types/error'
import { Login } from '../components/Login'

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
  login: (email: string, password: string) => Promise<void>
}

const ApiContext = createContext<ApiContextType | null>(null)

function ApiProvider(props: PropsWithChildren) {

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const _fetch = async function <T>(url: string, init: RequestInit = {}): Promise<T | null> {
    const response = await fetch(url, init)
    if (!response.ok) {
      throw new Error(ErrorSchema.parse(await response.json()).error)
    }
    if (response.status === 204) {
      return null
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
    login: async function (email: string, password: string): Promise<void> {
      return apiContext.post(z.null(), '/api/login', { email, password })
        .then(() => setIsLoggedIn(true))
    },
  }

  useEffect(() => {
    apiContext.get(z.null(), '/api/test')
      .then(() => setIsLoggedIn(true))
      .catch(() => { })
      .finally(() => setIsLoaded(true))
  }, [])

  return (
    <ApiContext.Provider value={apiContext}>
      {
        isLoaded ? (
          isLoggedIn ?
            props.children :
            <Login />
        ) : <Spinner />
      }
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
