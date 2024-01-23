import { Box, Image } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import useAuthStore from "../../store/authStore"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"


const FeedPost = ({post}) => {
  const { userProfile } = useGetUserProfileById(post.createdBy); 
   return (
    <div>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={2} borderRadius={6} overflow={"hidden"}>
            <Image src={post.imageURL} alt={userProfile?.username}/>
        </Box>
        <PostFooter creatorProfile={userProfile} post={post} />
      
    </div>
  )
}

export default FeedPost
