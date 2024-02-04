import { Box, Image } from "@chakra-ui/react"
import useAuthStore from "../../../store/authStore"
import PostHeader from "../../FeedPosts/PostHeader";
import PostFooter from "../../FeedPosts/PostFooter";


const ProfileFeedPost = ({post ,userProfile}) => {
    const user = useAuthStore(s=>s.user);
  return (
    <Box>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={2} borderRadius={6} overflow={"hidden"}>
            <Image src={post.imageURL} alt={user?.username}/>
        </Box>
        <PostFooter creatorProfile={userProfile} post={post} />
    </Box>
  )
}

export default ProfileFeedPost
