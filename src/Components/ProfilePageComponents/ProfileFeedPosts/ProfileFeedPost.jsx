import { Box, Image } from "@chakra-ui/react"
import useAuthStore from "../../../store/authStore"
import PostHeader from "../../FeedPosts/PostHeader";
import PostFooter from "../../FeedPosts/PostFooter";


const ProfileFeedPost = ({post}) => {
    const user = useAuthStore(s=>s.user);
  return (
    <Box>
        <PostHeader post={post} creatorProfile={user} />
        <Box my={2} borderRadius={6} overflow={"hidden"}>
            <Image src={post.imageURL} alt={user?.username}/>
        </Box>
        <PostFooter creatorProfile={user} post={post} />
    </Box>
  )
}

export default ProfileFeedPost
