import { Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import HomePage from './pages/HomePage';



function App() {
  

  return (
    <>
     <Routes>
      <Route path='/' element ={<HomePage/>}/>
      <Route path='/auth' element ={<Auth/>}/>
     </Routes>
    </>
  )
}

export default App
