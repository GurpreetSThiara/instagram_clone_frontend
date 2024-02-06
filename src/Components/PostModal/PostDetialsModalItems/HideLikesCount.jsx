import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import DeletePostModal from "../DeletePostModal/DeletePostModal";
import useHideLikes from "../../../hooks/useHideLikes";

const HideLikesCount = ({ post, user }) => {
  const { hideOrUnhideLikes } = useHideLikes();
  const handleClick = () => {
    hideOrUnhideLikes({ post: post, value: !post.hideLikesCount });
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
        {post.hideLikesCount
          ? "Unhide like count to others"
          : "Hide like count to others"}
      </Button>
    </Box>
  );
};

export default HideLikesCount;
