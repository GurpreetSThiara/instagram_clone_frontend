import { Box, Grid, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Skeleton, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProfilePost from './ProfilePost';
import useGetUserPosts from '../../../hooks/useGetUserPosts';
import useUserProfileStore from '../../../store/userProfileStore';
import usePostStore from '../../../store/postStore';
import useGetUserProfileById from '../../../hooks/useGetUserProfileById';

const ProfilePosts = ({userProfile}) => {
    // const [isLoading , setIsLoading] = useState(true)
    const { isLoading } = useGetUserPosts();
    const posts = usePostStore(s=>s.posts);
    const selectedTab = useUserProfileStore(s=>s.selectedTab);
    const { isOpen, onOpen, onClose } = useDisclosure();
 




  if(selectedTab!=="posts") return;
  return (
    <Grid
    templateColumns={{
        sm:"repeat(3, 1fr)",
        md:"repeat(3, 1fr)",
        base:"repeat(3, 1fr)"
    }}
    gap={1}
    columnGap={1}
    >
        {isLoading && [1,1,1,1,1,1,1].map((item ,index)=><VStack key={index} >
          <Skeleton w={"full"}>
            <Box h={{base:100,md:300}}>contents wrapped</Box>
          </Skeleton>
        </VStack>)}

        {!isLoading && posts?.map((item , index)=>(<Box key={index}><ProfilePost userProfile={userProfile} key={index} post={item.post} comments={item.comments}/>
   
        </Box>))
        
        }
      
    </Grid>
  )
}

export default ProfilePosts
