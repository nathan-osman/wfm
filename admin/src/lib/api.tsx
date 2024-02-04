import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import Spinner from '../components/Spinner'
import { ErrorSchema } from '../types/error'

async function apiFetch<T>(url: string, init: RequestInit = {}): Promise<T | undefined> {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(ErrorSchema.parse(await response.json()).error)
  }
  if (response.status === 204) {
    return
  }
  return await response.json()
}

async function apiGet<T extends z.ZodTypeAny>(
  schema: T,
  url: string,
): Promise<z.TypeOf<T>> {
  return schema.parse(await apiFetch(url))
}

async function apiPost<T extends z.ZodTypeAny>(
  schema: T,
  url: string,
  value: any,
): Promise<z.TypeOf<T>> {
  return schema.parse(
    await apiFetch(
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
}

type ApiContextType = {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const ApiContext = createContext<ApiContextType | null>(null)

function ApiProvider(props: PropsWithChildren) {

  const navigate = useNavigate()

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const apiContext = {
    login: async function (email: string, password: string): Promise<void> {
      return apiPost(z.void(), '/api/login', { email, password })
        .then(() => navigate('/'))
    },
    logout: async function (): Promise<void> {
      return apiPost(z.void(), '/api/logout', null)
        .then(() => navigate('/login'))
    },
  }

  useEffect(() => {
    apiGet(z.void(), '/api/test')
      .catch(() => navigate('/login'))
      .finally(() => setIsLoaded(true))
  }, [])

  return (
    <ApiContext.Provider value={apiContext}>
      {
        isLoaded ?
          props.children :
          <div className="grow h-full">
            <Spinner />
          </div>
      }
    </ApiContext.Provider>
  )
}

function useApi(): ApiContextType {
  return useContext(ApiContext)!!
}

export {
  apiFetch,
  apiGet,
  apiPost,
  ApiProvider,
  useApi,
}
