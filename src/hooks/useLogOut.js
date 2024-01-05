import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import useShowToast from './useShowToast';

const useLogOut = () => {
    const [signOut,isLoggingOut,error]=useSignOut(auth);
    const showToast = useShowToast();
    const handleLogout = async () =>{
        try{
            await signOut();
            localStorage.removeItem("instaUser");
        }catch(error){
         showToast("Error",error.message,"error");
        }
    }

  return {handleLogout,isLoggingOut,error};
}

export default useLogOut
