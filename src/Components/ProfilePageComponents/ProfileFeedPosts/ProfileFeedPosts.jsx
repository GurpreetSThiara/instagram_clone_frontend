import { Box } from "@chakra-ui/react";
import useUserProfileStore from "../../../store/userProfileStore"
import ProfileFeedPost from "./ProfileFeedPost";
import useGetFeedPosts from "../../../hooks/useGetFeedposts";
import useGetUserPosts from "../../../hooks/useGetUserPosts";
import usePostStore from "../../../store/postStore";


const ProfileFeedPosts = () => {
  const selectedTab = useUserProfileStore(s=>s.selectedTab);
  const { isLoading } = useGetUserPosts();
  const posts = usePostStore(s=>s.posts);
  if(selectedTab!=="feed") return;
  return (
    <Box>
      {!isLoading && posts && posts.map((item,index)=><ProfileFeedPost key={index} post={item.post}/>)}
      
    </Box>
  )
}

export default ProfileFeedPosts
