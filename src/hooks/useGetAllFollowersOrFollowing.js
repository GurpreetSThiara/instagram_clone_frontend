import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import { useState } from "react";
import useAllFollowers from "../store/userFollowers";


const useFindAllFollowersOrFollowing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setFollowers = useAllFollowers(s=>s.setFollowers)
	// const [userProfiles, setUserProfiles] = useState(null);
  let userProfiles = [];
    const findAllFollowers =async(followers)=>{
     
      console.log(followers);
     
      setIsLoading(true);
        for(let id of followers){
          
          try {
            const userRef = await getDoc(doc(firestore, "users", id));
            if (userRef.exists()) {
              userProfiles.push(userRef.data())
            
            }
          } catch (error) {
            // showToast("Error", error.message, "error");
          } finally {
            setIsLoading(false);
          }
        }

        console.log("ssssssssssssssssssssssssss")
        console.log(userProfiles)
        setFollowers(userProfiles) ;
       
     
    }
    
    console.log("22222222222222222")
    console.log(userProfiles)
 
  
  return {findAllFollowers,userProfiles}
}

export default useFindAllFollowersOrFollowing
