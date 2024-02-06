import { doc, updateDoc } from 'firebase/firestore'

import { firestore } from '../Firebase/Firebase'
import usePostStore from '../store/postStore'

const useHideLikes = () => {
    const updatePost = usePostStore(s=>s.updatePost);
    const hideOrUnhideLikes = async ({post ,value}) => {

        try{
            const postRef = doc(firestore,"posts",post.id);
            await updateDoc(postRef,{...post,hideLikesCount:value});
            updatePost({...post,hideLikesCount:value})
        }catch(e){
            console.log(e);
        }

    }
  return {hideOrUnhideLikes}
}

export default useHideLikes
