import { Avatar, Box, Link } from '@chakra-ui/react';

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { NotificationsLogo } from '../../../assets/constants';
import useAuthStore from '../../../store/authStore';

const Profile = ({shrinkedSideBar}) => {
    const user = useAuthStore(s=>s.user)
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
      <Avatar
          size={"sm"}
          name={user?.fullName}
          src={user?.profilePicUrl}
        />
      {!shrinkedSideBar ? (
        <Box display={{ base: "none", md: "block" }}>
          Profile
        </Box>
      ) : null}
    </Box>
  </Link>
  )
}

export default Profile
