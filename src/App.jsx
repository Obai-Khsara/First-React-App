import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainContent from './components/MainContent';
import Container from '@mui/material/Container';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{display: "flex", justifyContent: "center", width: "100vw"}}>
        <Container maxwidth="xl">
          <MainContent/>
        </Container>
      </div>
    </>
  )
}

export default App
