import { Box, Flex, Image, Skeleton, SkeletonCircle, VStack, useDisclosure } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import useAuthStore from "../../store/authStore"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"


const FeedPost = ({post,comments}) => {
  const { userProfile } = useGetUserProfileById(post.createdBy); 
  const user = useAuthStore(s=>s.user)
  const { isOpen, onOpen, onClose } = useDisclosure();

  if(!userProfile) {
    return  <VStack gap={4} alignItems={"flex-start"} mb={10}>
    <Flex gap={2}>
      <SkeletonCircle size={"10"} />
      <VStack gap={2} alignItems={"flex-start"}>
        <Skeleton height={"10px"} w={"200px"} />
        <Skeleton height={"10px"} w={"200px"} />
      </VStack>
    </Flex>
    <Skeleton w={"full"}>
      <Box h={"500px"}>contents wrapped</Box>
    </Skeleton>
  </VStack>
  }
   return (
    <div>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={2} borderRadius={6} overflow={"hidden"}>
            <Image src={post.imageURL} alt={userProfile?.username}/>
        </Box>
        <PostFooter creatorProfile={userProfile} post={post} isFromFeedPosts={true} comments={comments} />
      
    </div>
  )
}

export default FeedPost
