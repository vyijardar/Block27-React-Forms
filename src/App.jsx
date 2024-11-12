import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'
import { useState } from 'react'
import './App.css'

function App() {
  const [token, setToken] = useState(null);
  const[username,setUsername] = useState("");
  return (
    <>
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} username={username} setUsername={setUsername} />
    </>
  )
}

export default App
