import { Box } from "@chakra-ui/react";
import useUserProfileStore from "../../../store/userProfileStore"
import ProfileFeedPost from "./ProfileFeedPost";
import useGetFeedPosts from "../../../hooks/useGetFeedposts";


const ProfileFeedPosts = () => {
  const selectedTab = useUserProfileStore(s=>s.selectedTab);
  const { isLoading, posts } = useGetFeedPosts();
  if(selectedTab!=="feed") return;
  return (
    <Box>
      {!isLoading && posts && posts.map((post,index)=><ProfileFeedPost key={index} post={post}/>)}
      
    </Box>
  )
}

export default ProfileFeedPosts
