import { FormEvent, useState } from 'react'
import { useApi } from '../lib/api'
import Button from '../components/form/Button'
import Field from '../components/form/Field'
import Input from '../components/form/Input'

export default function Login() {

  const api = useApi()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    api.login(email, password)
      .catch(e => setError(e.message))
  }

  return (
    <>
      <div className="bg-gray-300 grow h-full flex items-center justify-center">
        <div className="bg-white shadow-2xl p-4">
          <div className="text-2xl mb-4">Login</div>
          <form onSubmit={handleSubmit}>
            {error !== null &&
              <Field>
                <div className="text-red-700">
                  Error: {error}
                </div>
              </Field>
            }
            <Field>
              <Input
                type="text"
                placeholder="Email"
                autoFocus={true}
                onChange={e => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <Input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Field>
            <Field>
              <Button
                type="submit"
                primary={true}
              >
                Login
              </Button>
            </Field>
          </form>
        </div>
      </div>
    </>
  )
}
