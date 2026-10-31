import { BrowserRouter } from 'react-router-dom'
import AppProviders from '@/context/AppProviders'
import AppRouter from '@/router/AppRouter'

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </BrowserRouter>
  )
}
