import { Box, Spinner } from "@chakra-ui/react";
import usePostStore from "../../../store/postStore";
import { useEffect } from "react";
import useSavedPost from "../../../hooks/useSavedPost";
import useAuthStore from "../../../store/authStore";
import useUserProfileStore from "../../../store/userProfileStore";
import useGetUserPost from "../../../hooks/useGetUserPost";
import ProfileSavedPost from "./profileSavedPost";

const ProfileSavedPosts = () => {
  const savedPosts = usePostStore((s) => s.savedPosts);
  const { savePost, getSavedPosts, isLoading } = useSavedPost();
  const user = useAuthStore((s) => s.user);
  const savedPostsList = usePostStore((s) => s.savedPostsList);
//   console.log(savedPostsList);

  useEffect(() => {
    getSavedPosts(user.uid , true);
  }, []);
  if (savedPostsList.length === 0) {
    return <Spinner isLoading={true} />;
  }
  return (
    <Box>
      {savedPostsList.map((post, index) => (
        <Box key={index}>{<ProfileSavedPost post={post.post} />}</Box>
      ))}
    </Box>
  );
};

export default ProfileSavedPosts;
