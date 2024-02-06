import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useDeletePost from "../../../hooks/useDeletePost";

const DeletePostModal = ({ isOpen, onClose , post }) => {
    const {deletePost} = useDeletePost();
    const handleDelete = ()=>{
        deletePost({post:post});
        onClose();
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={"#262626"}>
        <ModalHeader
          borderBottom={"1px solid  #363636"}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Text fontSize={20} fontWeight={350}>
            Delete Post?
          </Text>
          <Text fontSize={16} fontWeight={350} color={"gray"}>
            Are you sure to delete this post?
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Box
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            p={0}
            m={0}
            cursor={"pointer"}
            borderBottom={"1px solid  #363636"}
          >
            <Button
              m={0}
              p={0}
              color={"red"}
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
              cursor={"pointer"}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>

          <Box
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            p={0}
            cursor={"pointer"}
          >
            <Button
              m={0}
              p={0}
              bg={"transparent"}
              _hover={{ bg: "transparent" }}
              cursor={"pointer"}
            >
              cancel
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeletePostModal;
