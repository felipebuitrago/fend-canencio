import { useState } from 'react'
import Button from '@mui/material/Button'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppRouter } from './router/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
      <AppRouter />
    </>

  )
}

export default App
