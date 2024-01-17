import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

const SuggestedUser = ( {user} ) => {
  const navigate = useNavigate();
  const {isFollowing , handleFollowUser , isUpdating} = useFollowUser(user.uid);

  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <Flex justify={"space-between"} alignItems={"center"} w={"full"} onClick={()=>navigate(`/${user.username}`)} cursor={'pointer'} >
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user.profilePicUrl}  size={"md"} />
        <VStack spacing={2} alignItems={"flex-start"}>
          <Box fontSize={12} fontWeight={"bold"}>
            {user.username}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {user?.followers?.length} followers
          </Box>
        </VStack>
      </Flex>
      <Button
        fontSize={13}
        bg={"transparent"}
        p={0}
        h={"max-content"}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        _hover={{ color: "white" }}
        onClick={handleFollowUser}
        isLoading={isUpdating}
        
         
      >
        {isFollowing?"Unfollow":"Follow"}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
