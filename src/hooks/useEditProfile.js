import { useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import {getDownloadURL, ref, uploadString} from 'firebase/storage'
import {firestore, storage} from '../Firebase/Firebase'
import { doc, updateDoc } from "firebase/firestore"
import useUserProfileStore from "../store/userProfileStore"

const useEditProfile = () => {
    const [isUpdating , setIsUpdating ] = useState(false)
    const authUser = useAuthStore((state)=> state.user)
    const setUser = useAuthStore((state)=> state.setUser)
    const setUserProfile = useUserProfileStore((s)=>s.setUserProfile)

    const showtoast = useShowToast();

    const editProfile = async(input,selectedFile)=>{
        console.log("xxxxxxxxxxxxxxxxxxxxxxx")

        if(isUpdating || !authUser) return;
        console.log("xxxxxxxxxxxxxxxxxxxxxxx")
        setIsUpdating(true);
        console.log("xxxxxxxxxxxxxxxxxxxxxxx")

        const storageRef = ref(storage,`profilePics/${authUser.uid}`)
        console.log("xxxxxxxxxxxxxxxxxxxxxxx")



      if(authUser){
        const userDocRef = doc(firestore,"users",authUser.uid)
        console.log("xxxxxxxxxxxxxxxxxxxxxxx")

        let URL = ""
        try{
            if(selectedFile){
                await uploadString(storageRef,selectedFile,"data_url")
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`))
            }
                const updatedUser = {
                    ...authUser,
                  
                    fullName:input.fullName || authUser.fullName,
                    username:input.username || authUser.username,
                    bio:input.bio || authUser.bio,
                    profilePicUrl:URL || authUser.profilePicUrl
                }

                console.log(updatedUser);
                console.log(userDocRef);

        
                await updateDoc(userDocRef,updatedUser);
                console.log("UUUUUUUUUUUUUUUu");
                console.log(updatedUser);
                localStorage.setItem("instaUser",JSON.stringify(updatedUser))
                setUser(updatedUser);
                setUserProfile(updatedUser)
        
                showtoast("Success","Profile Updated Succesfully","success")

            
        }catch(e){
            showtoast("Error",e.message,"error")
        }
      }
       

    }

  return {editProfile,isUpdating}
}

export default useEditProfile
