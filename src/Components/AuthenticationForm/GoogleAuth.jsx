import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../../Firebase/Firebase'
import useShowToast from '../../hooks/useShowToast'
import useAuthStore from '../../store/authStore'
import { doc, setDoc } from 'firebase/firestore'

const GoogleAuth = ({prefix}) => {
    const [signInWithGoogle, user ,loading, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((s)=>s.loginUser);

    const handleGoogleAuth = async ()=>{
        try{
        const newUser = await signInWithGoogle();
        if(!newUser && error){
            return showToast("Error",error.message,"error");
            
        }
        if(newUser){
            const userDoc ={
                uid:newUser.user.uid,
                email:newUser.user.email,
                username:newUser.user.email.split("@")[0],
                fullName:newUser.user.displayName,
                bio:'',
                profilePicUrl:newUser.user.photoURL,
                followers:[],
                following:[],
                posts:[],
                createdAt:Date.now()
            }
            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
            localStorage.setItem("instaUser",JSON.stringify(userDoc));
            loginUser(userDoc);
            
           }
        }catch(e){
            showToast("Error",error.messagem,"error")
        }
    }

  return (
    <Flex onClick={handleGoogleAuth} alignItems={"center"} justifyContent={"center"}>
    <Image src="src/public/google.png" w={5} alt="Google" cursor={"pointer"}/>
    <Text mx="2" color={"blue.500"}>
      {prefix} with Google
    </Text>
  </Flex>
  )
}

export default GoogleAuth
