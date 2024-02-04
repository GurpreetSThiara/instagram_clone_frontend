import { Avatar, Box, Flex, Image, Skeleton, SkeletonCircle, Spinner, Text } from "@chakra-ui/react"
import useGetUserProfileById from "../../../../hooks/useGetUserProfileById"
import useGetUserPostById from "../../../../hooks/useGetUserPostById";
import { CalcTime } from './../../../../utils/CalcTime';
import useNotifications from "../../../../hooks/useNotifications";
import useNotificationStore from "../../../../store/notificationsStore";

const LikeNotification = ({notification}) => {
  const {deleteNotification} = useNotifications();
  const deleteNotificationFromLocal = useNotificationStore(s=>s.deleteNotificationFromLocal)
    const {userProfile} = useGetUserProfileById(notification.likedBy);
    const  { isLoading, userPost } = useGetUserPostById(notification.postId);
    if(!isLoading){
      if(!userPost){
        deleteNotification({notification:notification});
        deleteNotificationFromLocal(notification);
        
      }
    }

    
    if(!userProfile || !userPost ){

      return<Box p={2}>
      <Flex gap={1} alignItems={'center'} justifyContent={'space-between'}> 
        <SkeletonCircle size="10" />
        <Skeleton h={4} w={60}>
          <div>contents wrapped</div>
        </Skeleton>
        <Skeleton height={"35px"} width={"35px"} />
      </Flex>
    </Box>
    }
  return (
    <Flex  justifyContent={'space-between'} gap={3} px={4} py={2} cursor={'pointer'} _hover={{backgroundColor:"#121212"}}>
      <Flex gap={3} alignItems={'center'}>
      <Avatar src={userProfile.profilePicUrl}/>
      <Flex gap={1} alignItems={'center'}>
        <Text>{userProfile.username}</Text>
      <Text fontWeight={300} fontSize={15}> liked your post. {CalcTime(notification.createdAt)}</Text>

      </Flex>
      </Flex>
      <Box h={12} w={12} overflow={'hidden'}>
        <Image  src={userPost.imageURL} fit={'contain'} overflow={'hidden'}/>
      </Box>
    </Flex>
  )
}

export default LikeNotification
