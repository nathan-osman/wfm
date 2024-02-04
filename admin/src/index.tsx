import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ApiProvider } from './lib/api'
import Root from './components/Root'
import '@fontsource/montserrat'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!!).render(
  <React.StrictMode>
    <ApiProvider>
      <Root />
    </ApiProvider>
  </React.StrictMode>
)
