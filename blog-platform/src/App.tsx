import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Register from './pages/Registration.tsx'
import SignUp from './pages/SignUp.tsx'
import Login from './pages/Login.tsx'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/register/login' element={<Login/>} />
      <Route path='/register/signup' element={<SignUp/>} />
    </Routes>
    </>
  )
}

export default App
