import { Box, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react';
import {BsBookmark, BsGrid3X3, BsPersonSquare, BsSuitHeart,BsViewList} from 'react-icons/bs'
import useUserProfileStore from '../../../store/userProfileStore';


const ProfileTabs = () => {
    const [lastClicked, setLastClicked] = useState('posts');
    const setSelectedTab = useUserProfileStore(s=>s.setSelectedTab);

    const handleTabClick = (tabName) => {
      setLastClicked(tabName);
      setSelectedTab(tabName);
      // Add logic to handle tab clicks if needed
    };
  
  return (
    <Flex
    w={"full"}
    justifyContent={"space-between"}
    gap={{base:4,sm:10}}
    textTransform={"uppercase"}
    fontWeight={"bold"}
    >
        <Flex  onClick={()=>handleTabClick("posts")} borderTop={lastClicked==="posts"?"1px solid white":null} alignItems={"center"} p={3} gap={1} cursor={"pointer"}
          >
            <Box fontSize={20} >
                <BsGrid3X3/>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"block"}}>Posts</Text>
        </Flex>
        <Flex  onClick={()=>handleTabClick("feed")} borderTop={lastClicked==="feed"?"1px solid white":null} alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <Box fontSize={20}>
                <BsViewList/>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"block"}}>Feed</Text>
        </Flex>
        <Flex  onClick={()=>handleTabClick("saved")} borderTop={lastClicked==="saved"?"1px solid white":null} alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <Box fontSize={20}>
                <BsBookmark/>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"block"}}>Saved</Text>
        </Flex>
        <Flex  onClick={()=>handleTabClick("tagged")} borderTop={lastClicked==="tagged"?"1px solid white":null}  alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <Box fontSize={20}>
                <BsPersonSquare  fontWeight={"bold"}/>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"block"}}>Tagged</Text>
        </Flex>

      
    </Flex>
  )
}

export default ProfileTabs
