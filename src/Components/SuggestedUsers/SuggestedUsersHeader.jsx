import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SuggestedUsersHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex justifyContent={"center"} gap={2} alignItems={"center"}>
        <Avatar name="name" size={"lg"} src="src/public/profilepic.png" />
        <Text fontSize={12} fontWeight={"bold"}>
          username
        </Text>
      </Flex>
      <Link as={RouterLink} to={"/auth"} fontSize={14} fontWeight={"medium"} color={"blue.400"} cursor={"pointer"} style={{textDecoration:"none"}}>Log out</Link>
    </Flex>
  );
};

export default SuggestedUsersHeader;
