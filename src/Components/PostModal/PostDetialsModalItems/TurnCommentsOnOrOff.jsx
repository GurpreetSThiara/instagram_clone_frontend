import { Box, Button, useDisclosure } from "@chakra-ui/react";

import useTurnOnOrOffComments from "../../../hooks/useTurnOnOrOffComments";

const TurnCommentsOnOrOff = ({ post, user }) => {
  const { turnOnOrOffComments } = useTurnOnOrOffComments();
  const handleClick = () => {
    turnOnOrOffComments({ post: post, value: !post.turnOffCommenting });
  };
  return (
    <Box
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      p={0}
      borderBottom={"1px Solid #212121"}
      cursor={"pointer"}
      onClick={handleClick}
    >
      <Button
        m={0}
        p={0}
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
        cursor={"pointer"}
      >
        {post.turnOffCommenting ? "Turn on commenting" : "Turn off commenting"}
      </Button>
    </Box>
  );
};

export default TurnCommentsOnOrOff;
