import { Box } from "@chakra-ui/react";
import useUserProfileStore from "../../../store/userProfileStore"
import ProfileFeedPost from "./ProfileFeedPost";


const ProfileFeedPosts = () => {
  const selectedTab = useUserProfileStore(s=>s.selectedTab);
  if(selectedTab!=="feed") return;
  return (
    <Box>
      <ProfileFeedPost/>
      
    </Box>
  )
}

export default ProfileFeedPosts
