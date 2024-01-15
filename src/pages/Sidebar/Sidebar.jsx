import { useEffect, useState } from "react";
import { Avatar, Box, Button, Flex, IconButton, Input, InputGroup, InputRightElement, Link, Text, Tooltip } from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";
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

const Sidebar = () => {
  const { handleLogOut, isLoggingOut } = useLogOut();
  const [shrinkedSideBar, setShrinkedSidebar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
  <Flex
  zIndex={2}
  >
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
        onClick={()=>{setShrinkedSidebar(false)}}
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
        {isMobile ? (
          <Flex direction={"row"} gap={5} cursor={"pointer"}>
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
            <Tooltip
              hasArrow
              label={"Logout"}
              placement="right"
              openDelay={400}
              display={{ base: "block", md: "none" }}
            >
              <Link
                mt={"auto"}
                to={"/auth"}
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
                <BiLogOut />
                <Box display={{ base: "none", md: "block" }}>Logout</Box>
              </Link>
            </Tooltip>
          </Flex>
        ) : (
          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            {/* Large screen (desktop) sidebar content */}
            {SidebarItems.map((item, index) => (
              <Link
                onClick={item.onClick}
                key={index}
                to={item.link || null}
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
                  onClick={() => setSelectedItem(index)}
                  borderWidth={
                    shrinkedSideBar
                      ? selectedItem === index
                        ? "1px"
                        : "0px"
                      : null
                  }
                  borderColor={
                    shrinkedSideBar
                      ? selectedItem === index
                        ? "white"
                        : "transparent"
                      : null
                  }
                  _hover={{ backgroundColor: "#1A1A1A", borderRadius: "8" }}
                >
                  {item.icon}
                  {!shrinkedSideBar ? (
                    <Box display={{ base: "none", md: "block" }}>
                      {item.text}
                    </Box>
                  ) : null}
                </Box>
              </Link>
            ))}
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
        )}
      </Flex>
    </Box>
    {shrinkedSideBar?<Box mx={'16px'}  zIndex={2} w={397} h={'100%'} backgroundColor={"#000000"} borderRight={"1px solid #262626"} borderRightRadius={10}>
      <Box  p={'12px 14px 36px 24px'}>
      <Text fontWeight={'bold'} fontSize={'24px'}>Search</Text>
      </Box>
      <Box  h={40} p={'0px 16px'} >
        <InputGroup>
        <Input  backgroundColor={"#262626"} border={"null"}  focusBorderColor='null' width={364.2} placeholder="Search"/>
        <InputRightElement>
{/*      
       <IconButton
        backgroundColor={"#C8C8C8"}

    
         
           size={'xs'}
           _hover={'null'}
          
           borderRadius={50}
          aria-label="Clear input"
          icon={<CloseIcon w={2} h={2} color={"black"} />}
          onClick={() => {
            // Handle clearing the input or any other action
          }}
          variant="ghost"
        />
      */}
      </InputRightElement></InputGroup>

      <Box mt={12}>
        <Text fontSize={'16px'} fontWeight={'bold'}>
          Recent
        </Text>
      </Box>
        
      </Box>
    </Box>:null}
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
