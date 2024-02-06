import { doc, updateDoc } from 'firebase/firestore'

import { firestore } from '../Firebase/Firebase'
import usePostStore from '../store/postStore'

const useTurnOnOrOffComments = () => {
    const updatePost = usePostStore(s=>s.updatePost);
    const turnOnOrOffComments = async ({post ,value}) => {

        try{
            const postRef = doc(firestore,"posts",post.id);
            await updateDoc(postRef,{...post,turnOffCommenting:value});
            updatePost({...post,turnOffCommenting:value})
        }catch(e){
            console.log(e);
        }

    }
  return {turnOnOrOffComments}
}

export default useTurnOnOrOffComments
