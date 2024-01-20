import { Box, Link } from '@chakra-ui/react';

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { NotificationsLogo } from '../../../assets/constants';

const Notifications = ({shrinkedSideBar , selected}) => {
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
      borderWidth={
        shrinkedSideBar
          ? selected
            ? "1px"
            : "0px"
          : null
      }
      borderColor={
        shrinkedSideBar
          ? selected
            ? "white"
            : "transparent"
          : null
      }
      _hover={{ backgroundColor: "#1A1A1A", borderRadius: "8" }}
    >
     <Box>
     <NotificationsLogo />
     </Box>
      {!shrinkedSideBar ? (
        <Box display={{ base: "none", md: "block" }}>
          Notifications
        </Box>
      ) : null}
    </Box>
  </Link>
  )
}

export default Notifications
