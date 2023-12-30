import { Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import HomePage from './pages/HomePage';
import PageLayouts from "./Layouts/PageLayouts/PageLayouts";



function App() {
  

  return (
    <PageLayouts>
     <Routes>
      <Route path='/' element ={<HomePage/>}/>
      <Route path='/auth' element ={<Auth/>}/>
     </Routes>
    </PageLayouts>
  )
}

export default App
