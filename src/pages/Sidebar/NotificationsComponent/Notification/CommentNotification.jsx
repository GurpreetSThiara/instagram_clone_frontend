import {
  Avatar,
  Box,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGetUserProfileById from "../../../../hooks/useGetUserProfileById";
import useGetUserPostById from "../../../../hooks/useGetUserPostById";
import { CalcTime } from "./../../../../utils/CalcTime";
import GoogleAuth from './../../../../Components/AuthenticationForm/GoogleAuth';

const CommentNotification = ({ notification }) => {
  const { userProfile } = useGetUserProfileById(notification.commentBy);
  const { isLoading, userPost } = useGetUserPostById(notification.postId);

  if (!userProfile || !userPost) {
    return (
      <Box p={2}>
        <Flex gap={1} alignItems={'center'} justifyContent={'space-between'}> 
          <SkeletonCircle size="10" />
          <Skeleton h={4} w={60}>
            <div>contents wrapped</div>
          </Skeleton>
          <Skeleton height={"35px"} width={"35px"} />
        </Flex>
      </Box>
    );
  }
  return (
    <Flex
      justifyContent={"space-between"}
      gap={3}
      px={4}
      py={2}
      cursor={"pointer"}
      _hover={{ backgroundColor: "#121212" }}
    >
      <Flex gap={3} alignItems={"center"}>
        <Avatar src={userProfile.profilePicUrl} />
        <Flex gap={1} alignItems={"center"}>
          <Text>{userProfile.username}</Text>
          <Text fontWeight={300} fontSize={15}>
            {" "}
            commented: {notification.comment}. {CalcTime(notification.createdAt)}
          </Text>
        </Flex>
      </Flex>
      <Box boxSize={12}>
        <Image src={userPost.imageURL} />
      </Box>
    </Flex>
  );
};

export default CommentNotification;
