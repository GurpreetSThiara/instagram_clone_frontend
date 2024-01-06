import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../Firebase/Firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useRef } from "react";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore(state => state.login);
const signUp = async (input) => {

    if(!input.email || !input.password || !input.username || !input.fullName){
        showToast("Error","Please fill all the feilds","error");
        return;
    }
    const userRef = collection(firestore,"users");
    const q = query(userRef, where("username", "==", input.username));

    const querySnapshot = await getDocs(q);

    if(!querySnapshot.empty){
        showToast("Error","Username Already Exist","error");
        return;
    }

    try{
       const newUser =await createUserWithEmailAndPassword(input.email,input.password);
       if(!newUser && error){
        showToast("Error",error.message,"error")
        return;
       }
       if(newUser){
        const userDoc ={
            uid:newUser.user.uid,
            email:input.email,
            username:input.username,
            fullName:input.fullName,
            bio:'',
            profilePicUrl:'',
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
       console.log(e);
    }
}

  return {loading,error,signUp};
};

export default useSignUpWithEmailAndPassword;
