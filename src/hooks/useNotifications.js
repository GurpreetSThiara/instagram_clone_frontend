import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { firestore } from "../Firebase/Firebase";

const useNotifications = () => {
  const user = useAuthStore(s=>s.user)
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

      const notifyTag = async ({postId,postOwnerId,userId})=>{
        const notification = {
          "type":"tag",
           "taggedBy":postOwnerId,
           "postId":postId,
           

           createdAt: Date.now(),
        
        }
      const notificationRef =   await addDoc(collection(firestore, 'users', userId, 'notifications'),notification );
      }

      const deleteNotification = async ({  notification }) => {
        try {
          // Assuming 'user' is the authenticated user and 'notification' is the notification object
          const notificationRef = doc(firestore, 'users', user.uid, 'notifications', notification.id);
      
          // Delete the notification document
          await deleteDoc(notificationRef);
      
          console.log('Notification deleted successfully!');
        } catch (error) {
          console.error('Error deleting notification:', error.message);
        }
      };

  return {notifyLike , removeNotification , notifyComment ,deleteNotification , notifyTag}
}

export default useNotifications
