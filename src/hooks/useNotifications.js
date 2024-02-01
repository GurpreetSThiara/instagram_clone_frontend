import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useNotifications = () => {
    const notifyLike =async ({likedByUserId,postId,postOwnerId}) =>{
          const notification = {
            "type":"like",
             "likedBy":likedByUserId,
             "postId":postId,
             

             createdAt: Date.now(),
          
          }
        const notificationRef =   await addDoc(collection(firestore, 'users', postOwnerId, 'notifications'),notification );

        
    }
    const notifyComment =async ({commentByUserId,postId,postOwnerId,comment}) =>{
      const notification = {
        "type":"comment",
         "commentBy":commentByUserId,
         "postId":postId,
         "comment":comment,
         

         createdAt: Date.now(),
      
      }
    const notificationRef =   await addDoc(collection(firestore, 'users', postOwnerId, 'notifications'),notification );

    
}
    const removeNotification = async ({ postId, postOwnerId, likedByUserId }) => {
        try {
          const notificationQuery = collection(
            firestore,
            'users',
            postOwnerId,
            'notifications'
          );
    
          const snapshot = await notificationQuery
            .where('postId', '==', postId)
            .where('likedBy', '==', likedByUserId)
            .get();
    
          if (!snapshot.empty) {
            const notificationDoc = snapshot.docs[0];
            await deleteDoc(doc(firestore, 'users', postOwnerId, 'notifications', notificationDoc.id));
            console.log('Notification removed:', notificationDoc.id);
          }
        } catch (error) {
          console.error('Error removing notification:', error);
        }
      };


  return {notifyLike , removeNotification , notifyComment}
}

export default useNotifications
