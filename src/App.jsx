import { Navigate, Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import HomePage from './pages/HomePage';
import PageLayouts from "./Layouts/PageLayouts/PageLayouts";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import useAuthStore from "./store/authStore";
import Notifications from "./pages/Notifications/Notifications";



function App() {
  const authUser = useAuthStore(state => state.user)
  

  return (
    <PageLayouts>
     <Routes>
      <Route path='/' element ={authUser?<HomePage/> :<Navigate to={"/auth"}/>}/>
      <Route path='/auth' element ={<Auth/>}/>
      <Route path='/:username' element ={<ProfilePage/>}/>
      <Route path='/:username/notifications' element ={<Notifications/>}/>
     </Routes>
    </PageLayouts>
  )
}

export default App
