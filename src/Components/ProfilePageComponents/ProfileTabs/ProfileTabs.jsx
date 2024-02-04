import { Box, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react';
import {BsBookmark, BsGrid3X3, BsPersonSquare, BsSuitHeart,BsViewList} from 'react-icons/bs'
import useUserProfileStore from '../../../store/userProfileStore';
import useSavedPost from '../../../hooks/useSavedPost';
import useAuthStore from '../../../store/authStore';


const ProfileTabs = ({visitingOwnProfile}) => {
    
    const { savePost, getSavedPosts } = useSavedPost();
    const user = useAuthStore(s=>s.user);

    const [lastClicked, setLastClicked] = useState('posts');
    const setSelectedTab = useUserProfileStore(s=>s.setSelectedTab);

    const handleTabClick = (tabName) => {
        if(tabName === "saved"){
            getSavedPosts(user.uid , true);
        }
      setLastClicked(tabName);
      setSelectedTab(tabName);
      // Add logic to handle tab clicks if needed
    };
  
  return (
    <Flex
    w={"full"}
    justifyContent={"center"}
    gap={{base:4,sm:10}}
    textTransform={"uppercase"}
    fontWeight={"bold"}
    >
        <Flex  onClick={()=>handleTabClick("posts")} borderTop={lastClicked==="posts"?"1px solid white":null} alignItems={"center"} p={3} gap={1} cursor={"pointer"}
          >
            <Box fontSize={12} >
                <BsGrid3X3/>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"block"}}>Posts</Text>
        </Flex>
        <Flex  onClick={()=>handleTabClick("feed")} borderTop={lastClicked==="feed"?"1px solid white":null} alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <Box fontSize={12}>
                <BsViewList/>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"block"}}>Feed</Text>
        </Flex>
       {visitingOwnProfile && <Flex  onClick={()=>handleTabClick("saved")} borderTop={lastClicked==="saved"?"1px solid white":null} alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <Box fontSize={12}>
                <BsBookmark/>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"block"}}>Saved</Text>
        </Flex> } 
        <Flex  onClick={()=>handleTabClick("tagged")} borderTop={lastClicked==="tagged"?"1px solid white":null}  alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <Box fontSize={12}>
                <BsPersonSquare  fontWeight={"bold"}/>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"block"}}>Tagged</Text>
        </Flex>

      
    </Flex>
  )
}

export default ProfileTabs
