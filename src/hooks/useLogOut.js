import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useLogOut = () => {
    const [signOut,isLoggingOut,error]=useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state)=>state.logout);
    const handleLogout = async () =>{
        try{
            await signOut();
            localStorage.removeItem("instaUser");
            logoutUser();
        }catch(error){
         showToast("Error",error.message,"error");
        }
    }

  return {handleLogout,isLoggingOut,error};
}

export default useLogOut
