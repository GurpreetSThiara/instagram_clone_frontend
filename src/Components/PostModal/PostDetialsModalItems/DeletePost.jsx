import { Box, Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import DeletePostModal from '../DeletePostModal/DeletePostModal';

const DeletePost = ({post,user}) => {
    const {isOpen , onOpen , onClose} = useDisclosure();

  return (
    <Box
                 
    alignItems={"center"}
    justifyContent={"center"}
    display={"flex"}
    p={0}
    borderBottom={'1px Solid #212121'}
    cursor={"pointer"}
    onClick={onOpen}
  >
    <Button
    m={0}
    p={0}
    color={'red'}
      bg={"transparent"}
      _hover={{ bg: "transparent" }}
      cursor={"pointer"}
     
    >
      Delete
    </Button>
    <DeletePostModal isOpen={isOpen} onClose={onClose} post={post} user={user}/>
  </Box>
  )
}

export default DeletePost
