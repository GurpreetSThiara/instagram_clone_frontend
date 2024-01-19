import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../assets/constants";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";
import { CloseIcon } from "@chakra-ui/icons";
import useSearchUsers from "../../hooks/useSearchUsers";
import searchResultsStore from "../../store/searchResultsStore";
import Create from "./SidebarItems/Create";
import Home from "./SidebarItems/Home";
import Notifications from "./SidebarItems/Notifications";
import Search from "./SidebarItems/Search";
import Profile from "./SidebarItems/Profile";
import SearchComponent from "./SearchComponent";

const Sidebar = () => {
  const { handleLogOut, isLoggingOut } = useLogOut();
  const [shrinkedSideBar, setShrinkedSidebar] = useState(false);
  const [searchSelected, setSearchSelected] = useState(false);
  const [notifcationsSelected, setNotifcationsSelected] = useState(false);

  const SidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/",
    },
    {
      icon: <SearchLogo />,
      text: "Search",
      onClick: () => {
        setShrinkedSidebar(!shrinkedSideBar);
      },
    },
    {
      icon: <NotificationsLogo />,
      text: "Notifications",
      link: "/",
    },
    {
      icon: <CreatePostLogo />,
      text: "Create",
      link: "/",
    },
    {
      icon: (
        <Avatar
          size={"sm"}
          name="Burak Orldkd"
          src="src/public/profilepic.png"
        />
      ),
      text: "Home",
      link: "/",
    },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return !isMobile ? (
    <Flex zIndex={2}>
      <Box
        zIndex={2}
        height={"100vh"}
        borderRight={"1px solid"}
        borderColor={"whiteAlpha.300"}
        py={4}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2 }}
        w={{ base: "70px", md: shrinkedSideBar ? "70px" : "240px" }}
      >
        <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
          <Link
            onClick={() => {
              setShrinkedSidebar(false);
            }}
            to={"/"}
            as={RouterLink}
            justifyContent={"center"}
            alignItems={"center"}
            display={{ base: "none", md: "block" }}
            cursor={"pointer"}
            _hover={{ backgroundColor: "#1A1A1A", borderRadius: "8" }}
            p={4}
          >
            {shrinkedSideBar ? <InstagramMobileLogo /> : <InstagramLogo />}
          </Link>
          <Link
            to={"/"}
            as={RouterLink}
            p={2}
            display={{ base: "block", md: "none" }}
            borderRadius={6}
            _hover={{ bg: "whiteAlpha.200" }}
            w={10}
            cursor={"pointer"}
          >
            <InstagramMobileLogo />
          </Link>
          {
            <Flex direction={"column"} gap={5} cursor={"pointer"}>
              {/* Large screen (desktop) sidebar content */}
              <Box
                onClick={() => {
                  setShrinkedSidebar(false);
                }}
              >
                <Home shrinkedSideBar={shrinkedSideBar} />
              </Box>
              <Box
                onClick={() => {
                  setShrinkedSidebar(true);
                  setSearchSelected(false);
                  setNotifcationsSelected(true);
                }}
              >
                <Notifications shrinkedSideBar={shrinkedSideBar} selected={notifcationsSelected} />
              </Box>
              <Box
                onClick={() => {
                  setShrinkedSidebar(false);
                }}
              >
                <Create shrinkedSideBar={shrinkedSideBar} />
              </Box>
              <Box
                onClick={() => {
                  setShrinkedSidebar(true);
                  setSearchSelected(true);
                  setNotifcationsSelected(false);
                }}
              >
                <Search shrinkedSideBar={shrinkedSideBar} selected={searchSelected} />
              </Box>
              <Box
                onClick={() => {
                  setShrinkedSidebar(false);
                }}
              >
                <Profile shrinkedSideBar={shrinkedSideBar} />
              </Box>
             

              <Flex
                onClick={handleLogOut}
                alignItems={"center"}
                gap={4}
                _hover={{ bd: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                <BiLogOut />
                {shrinkedSideBar ? null : (
                  <Button
                    variant={"ghost"}
                    _hover={{ bg: "transparent" }}
                    display={{ base: "none", md: "block" }}
                  >
                    Logout
                  </Button>
                )}
              </Flex>
            </Flex>
          }
        </Flex>
      </Box>
      {searchSelected ? (
        <SearchComponent />
      ) : null}
    </Flex>
  ) : (
    <Flex
      direction={"row"}
      gap={5}
      cursor={"pointer"}
      justifyContent={"space-between"}
      backgroundColor={"black"}
    >
      {SidebarItems.map((item, index) => (
        <Tooltip
          key={index}
          hasArrow
          label={item.text}
          placement="right"
          openDelay={400}
          display={{ base: "block", md: "none" }}
        >
          <Link
            to={item.link || null}
            display={"flex"}
            as={RouterLink}
            alignItems={"center"}
            gap={4}
            _hover={{ bd: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            {item.icon}
            <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
          </Link>
        </Tooltip>
      ))}
    </Flex>
  );
};

export default Sidebar;
