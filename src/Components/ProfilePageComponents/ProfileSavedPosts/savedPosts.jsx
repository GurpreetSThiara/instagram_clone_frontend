import { Box, Spinner } from "@chakra-ui/react";
import usePostStore from "../../../store/postStore";
import { useEffect } from "react";
import useSavedPost from "../../../hooks/useSavedPost";
import useAuthStore from "../../../store/authStore";
import useUserProfileStore from "../../../store/userProfileStore";
import useGetUserPost from "../../../hooks/useGetUserPost";

const ProfileSavedPosts = () => {
  const savedPosts = usePostStore((s) => s.savedPosts);
  const { savePost, getSavedPosts, isLoading } = useSavedPost();
  const user = useAuthStore((s) => s.user);
  const savedPostsList = usePostStore(s=>s.savedPostsList);

  



 







  useEffect(() => {
    getSavedPosts(user.uid);
   
  }, [user]);
  if (savedPostsList.length === 0) {
    return <Spinner isLoading={true} />;
  }
  return <Box>{JSON.stringify(savedPostsList)}</Box>;
};

export default ProfileSavedPosts;
