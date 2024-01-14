import  { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Tooltip,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from '../../assets/constants';
import { AiFillHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import useLogOut from '../../hooks/useLogOut';

const Sidebar = () => {
  const {handleLogOut,isLoggingOut}=useLogOut();
  const [shrinkedSideBar , setShrinkedSidebar] = useState(false);
  const SidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: 'Home',
      link: '/',
    },
    {
      icon: <SearchLogo />,
      text: 'Search',
      onClick:()=>{setShrinkedSidebar(!shrinkedSideBar)}
    },
    {
      icon: <NotificationsLogo />,
      text: 'Notifications',
      link: '/',
    },
    {
      icon: <CreatePostLogo />,
      text: 'Create',
      link: '/',
    },
    {
      icon: <Avatar size={'sm'} name='Burak Orldkd' src='src/public/profilepic.png' />,
      text: 'Home',
      link: '/',
    },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    !isMobile?
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={'column'} gap={10} w={'full'} h={'full'}>
        <Link to={'/'} as={RouterLink} pl={2} display={{ base: 'none', md: 'block' }} cursor={'pointer'}>
          {shrinkedSideBar?<InstagramMobileLogo/>:<InstagramLogo />}
        </Link>
        <Link
          to={'/'}
          as={RouterLink}
          p={2}
          display={{ base: 'block', md: 'none' }}
          borderRadius={6}
          _hover={{ bg: 'whiteAlpha.200' }}
          w={10}
          cursor={'pointer'}
        >
          <InstagramMobileLogo />
        </Link>
        {isMobile ? (
          <Flex direction={'row'} gap={5} cursor={'pointer'} >
            {SidebarItems.map((item, index) => (
              <Tooltip
                key={index}
                hasArrow
                label={item.text}
                placement='right'
                openDelay={400}
                display={{ base: 'block', md: 'none' }}
              >
                <Link
                  to={item.link || null}
                  display={'flex'}
                  as={RouterLink}
                  alignItems={'center'}
                  gap={4}
                  _hover={{ bd: 'whiteAlpha.400' }}
                  borderRadius={6}
                  p={2}
                  w={{ base: 10, md: 'full' }}
                  justifyContent={{ base: 'center', md: 'flex-start' }}
                >
                  {item.icon}
                  <Box display={{ base: 'none', md: 'block' }}>{item.text}</Box>
                </Link>
              </Tooltip>
            ))}
            <Tooltip hasArrow label={'Logout'} placement='right' openDelay={400} display={{ base: 'block', md: 'none' }}>
              <Link
                mt={'auto'}
                to={'/auth'}
                display={'flex'}
                as={RouterLink}
                alignItems={'center'}
                gap={4}
                _hover={{ bd: 'whiteAlpha.400' }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: 'full' }}
                justifyContent={{ base: 'center', md: 'flex-start' }}
              >
                <BiLogOut />
                <Box display={{ base: 'none', md: 'block' }}>Logout</Box>
              </Link>
            </Tooltip>
          </Flex>
        ) : (
          <Flex direction={'column'} gap={5} cursor={'pointer'}>
            {/* Large screen (desktop) sidebar content */}
            {SidebarItems.map((item, index) => (
              
              <Link
              onClick={item.onClick}
                key={index}
                to={item.link || null}
                as={RouterLink}
                display={'flex'}
                alignItems={'center'}
                gap={4}
                _hover={{ bd: 'whiteAlpha.400' }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: 'full' }}
                justifyContent={{ base: 'center', md: 'flex-start' }}
              >
                {item.icon}
              {!shrinkedSideBar?<Box display={{ base: 'none', md: 'block' }}>{item.text}</Box>:<></>} 
              </Link>
            ))}
            <Flex
            onClick={handleLogOut}
              alignItems={'center'}
              gap={4}
              _hover={{ bd: 'whiteAlpha.400' }}
              borderRadius={6}
              p={2}
              w={{ base: 10, md: 'full' }}
              justifyContent={{ base: 'center', md: 'flex-start' }}
            >
              <BiLogOut />
              <Button variant={"ghost"} _hover={{bg:"transparent"}} display={{ base: 'none', md: 'block' }}>Logout</Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
    :
    <Flex direction={'row'} gap={5} cursor={'pointer'} justifyContent={"space-between"} backgroundColor={"black"}>
    {SidebarItems.map((item, index) => (
      <Tooltip
        key={index}
        hasArrow
        label={item.text}
        placement='right'
        openDelay={400}
        display={{ base: 'block', md: 'none' }}
      >
        <Link
          to={item.link || null}
          display={'flex'}
          as={RouterLink}
          alignItems={'center'}
          gap={4}
          _hover={{ bd: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
        >
          {item.icon}
          <Box display={{ base: 'none', md: 'block' }}>{item.text}</Box>
        </Link>
      </Tooltip>
    ))}
 
  </Flex>

  );
};

export default Sidebar;
