import { Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import HomePage from './pages/HomePage';
import PageLayouts from "./Layouts/PageLayouts/PageLayouts";
import ProfilePage from "./pages/ProfilePage/ProfilePage";



function App() {
  

  return (
    <PageLayouts>
     <Routes>
      <Route path='/' element ={<HomePage/>}/>
      <Route path='/auth' element ={<Auth/>}/>
      <Route path='/username' element ={<ProfilePage/>}/>
     </Routes>
    </PageLayouts>
  )
}

export default App
