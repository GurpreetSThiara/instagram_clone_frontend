import { Box, Link } from '@chakra-ui/react';

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { CreatePostLogo } from '../../../assets/constants';

const Create = ({shrinkedSideBar}) => {
  return (
    <Link
    onClick={()=>{}}
   
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
    //   onClick={() => setSelectedItem(index)}
    //   borderWidth={
    //     shrinkedSideBar
    //       ? selectedItem === index
    //         ? "1px"
    //         : "0px"
    //       : null
    //   }
    //   borderColor={
    //     shrinkedSideBar
    //       ? selectedItem === index
    //         ? "white"
    //         : "transparent"
    //       : null
    //   }
      _hover={{ backgroundColor: "#1A1A1A", borderRadius: "8" }}
    >
      {<CreatePostLogo/>}
      {!shrinkedSideBar ? (
        <Box display={{ base: "none", md: "block" }}>
          Home
        </Box>
      ) : null}
    </Box>
  </Link>
  )
}

export default Create
