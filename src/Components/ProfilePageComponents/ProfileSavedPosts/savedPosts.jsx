import { Spinner } from "@chakra-ui/react";
import usePostStore from "../../../store/postStore"
import { useEffect } from "react";


const ProfileSavedPosts = () => {
    const savedPosts = usePostStore(s=>s.savedPosts);
    if(!savedPosts){
        return <Spinner isLoading={true}/>
    }

    useEffect(()=>{},[])
  return (
    <div>
      
    </div>
  )
}

export default savedPosts
