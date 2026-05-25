import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { DottedSurface } from './components/ui/dotted-surface'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider attribute="class" defaultTheme="dark">
    <DottedSurface className="opacity-100" />
    <App />
  </ThemeProvider>,
)
