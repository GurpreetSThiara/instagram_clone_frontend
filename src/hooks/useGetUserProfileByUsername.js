import  { useEffect, useState } from 'react'
import useShowToast from './useShowToast';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import useUserProfileStore from '../store/userProfileStore';

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading]=useState();
    const showToast = useShowToast();
    const {userProfile , setUserProfile} = useUserProfileStore();


    useEffect(()=>{
        const getUserProfile = async ()=>{
            setIsLoading(true);
            try{
                console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
                console.log(username)
                const q =query(collection(firestore,"users"),where("username","==",username))
                const qs=await getDocs(q);
                console.log(qs)


                if(qs.empty){
                    return setUserProfile(null);
                }
                let userDoc;
                qs.forEach(doc => {
                    userDoc=doc.data();
                    
                });
                setUserProfile(userDoc);
            }catch(e){
                showToast("Error",e.message,"error")
            }finally{
                setIsLoading(false);
            }
        }
        getUserProfile();
    },[setUserProfile,username,showToast]);
  return {isLoading , userProfile};
}

export default useGetUserProfileByUsername
