import { Box, Link, useDisclosure } from '@chakra-ui/react';

import { Link as RouterLink } from "react-router-dom";
import { CreatePostLogo } from '../../../assets/constants';

import CreateModal from './CreateModel/CreateModal';
import { useEffect, useState } from 'react';


const Create = ({shrinkedSideBar}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
 

  
  return (
    <>
    <Link
    onClick={onOpen}
   
    to={'/'}
    as={RouterLink}
    _hover={{ bd: "whiteAlpha.400" }}
  >
    <Box
      display={"flex"}
      borderRadius={8}
      gap={shrinkedSideBar ? 0 : 3}
      p={3}
      w={{ base: 10, md: "full" }}
      h={"full"}
      justifyContent={{
        base: "center",
        md: shrinkedSideBar ? "center" : "flex-start",
      }}

      _hover={{ backgroundColor: "#1A1A1A", borderRadius: "8" }}
    >
      <Box>
      {<CreatePostLogo/>}
      </Box>
      {!shrinkedSideBar ? (
        <Box display={{ base: "none", md: "block" }}>
          Create
        </Box>
      ) : null}
    </Box>
  </Link>
  <CreateModal isOpen={isOpen} onClose={onClose}/>
  </>
  )
}

export default Create
