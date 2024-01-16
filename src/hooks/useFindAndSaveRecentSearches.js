import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import useAuthStore from "../store/authStore";


const useFindAndSaveRecentSearches = () => {

  const authUser = useAuthStore((state) => state.user);

  const findRecentSearches = async ()=>{

  }
  const SaveRecentSearches = async ()=>{
    const userDoc ={
       searches:[]
  }
  await setDoc(doc(firestore, "recentSearches", authUser.uid), userDoc);
  }
    
  return {}
}

export default useFindAndSaveRecentSearches
