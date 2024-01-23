import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import { useState } from "react";


const useFindAllFollowersOrFollowing = () => {
  const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);
    const findAllFollowers =async({followers})=>{
      let profiles = [];
      setIsLoading(true);
        for(let id of followers){
          
          try {
            const userRef = await getDoc(doc(firestore, "users", id));
            if (userRef.exists()) {
              profiles.push(userRef.data())
            
            }
          } catch (error) {
            // showToast("Error", error.message, "error");
          } finally {
            setIsLoading(false);
          }
        }
        return {profiles,isLoading}
    }
  
  return {findAllFollowers}
}

export default useFindAllFollowersOrFollowing
