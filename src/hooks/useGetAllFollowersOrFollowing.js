import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import { useState } from "react";
import useAllFollowers from "../store/userFollowers";
import useAllFollowings from "../store/useFollowings";


const useFindAllFollowersOrFollowing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setFollowers = useAllFollowers(s=>s.setFollowers)
  const setFollowings = useAllFollowings(s=>s.setFollowings)
	// const [userProfiles, setUserProfiles] = useState(null);
 
    const findAllFollowers =async(followers)=>{
      let userProfiles = [];
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

    const findAllFollowings =async(following)=>{
      let userProfiles = [];
    
      setIsLoading(true);
        for(let id of following){
          
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

     
        setFollowings(userProfiles) ;
       
     
    }
    
  
 
  
  return {findAllFollowers , findAllFollowings}
}

export default useFindAllFollowersOrFollowing
