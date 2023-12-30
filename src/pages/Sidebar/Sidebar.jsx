import { Avatar, Box, Flex,Link, Tooltip } from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom'
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
import {AiFillHome }  from 'react-icons/ai'
import {BiLogOut}  from 'react-icons/bi'


const Sidebar = () => {
  const SidebarItems = [
    {
      icon:<AiFillHome size={25}/>,
      text:"Home",
      link:"/",
    },
    {
      icon:<SearchLogo/>,
      text:"Search",
      link:"/",
    },
    {
      icon:<NotificationsLogo/>,
      text:"Notifications",
      link:"/",
    },
    {
      icon:<CreatePostLogo/>,
      text:"Create",
      link:"/",
    },
    {
      icon:<Avatar size={"sm"} name='Burak Orldkd' src='src/public/profilepic.png'/>,
      text:"Home",
      link:"/",
    }
  ];
  return (
    <Box height={"100vh"} borderRight={"1px solid"} borderColor={"whiteAlpha.300"} py={8} position={"sticky"} top={0} left={0} px={{base:2,md:4}}> 
      <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
        <Link to={"/"} a={RouterLink} pl={2} display={{base:"none",md:"block"}} cursor={"pointer"}>
          <InstagramLogo/>
        </Link>
        <Link to={"/"} a={RouterLink} p={2} display={{base:"block",md:"none"}} borderRadius={6} _hover={{bg:"whiteAlpha.200"}} w={10} cursor={"pointer"}>
          <InstagramMobileLogo/>

        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          {SidebarItems.map((item,index)=>(
            <Tooltip key={index} hasArrow label={item.text} placement='right' openDelay={400} display={{base:"block",md:"none"}}>
              <Link to={item.link || null} display={"flex"} as={RouterLink} alignItems={"center"} gap={4} _hover={{bd:"whiteAlpha.400"}} borderRadius={6} p={2} w={{base:10,md:"full"}} justifyContent={{base:"center",md:"flex-start"}}>
                {item.icon}
                <Box display={{base:"none", md:"block"}}>
                  {item.text}
                </Box>

              </Link>
            </Tooltip>
          ))}
        </Flex>
        <Tooltip  hasArrow label={"Logout"} placement='right' openDelay={400} display={{base:"block",md:"none"}}>
              <Link mt={"auto"} to={"/auth"} display={"flex"} as={RouterLink} alignItems={"center"} gap={4} _hover={{bd:"whiteAlpha.400"}} borderRadius={6} p={2} w={{base:10,md:"full"}} justifyContent={{base:"center",md:"flex-start"}}>
                <BiLogOut/>
                <Box  display={{base:"none", md:"block"}}>
                  Logout
                </Box>

              </Link>
            </Tooltip>
      </Flex>
    </Box>
  )
}

export default Sidebar
