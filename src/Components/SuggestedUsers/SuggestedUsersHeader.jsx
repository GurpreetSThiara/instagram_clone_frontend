import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";

const SuggestedUsersHeader = () => {
  const { handleLogout, isLoggingOut } = useLogOut();
  const user = useAuthStore((state) => state.user);
  if(!user) return null;
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex justifyContent={"center"} gap={2} alignItems={"center"}>
        <Link to={`${user.username}`}>
          <Avatar name="name"  src={user.profilePicUrl} />
        </Link>
        <Link to={`${user.username}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {user.username}
          </Text>
        </Link>
      </Flex>
      <Button
        onClick={handleLogout}
        isLoading={isLoggingOut}
        background={"transparent"}
        _hover={{ background: "transparent" }}
        size={"xs"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedUsersHeader;
