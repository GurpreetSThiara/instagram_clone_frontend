import { Box, Grid, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Skeleton, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProfilePost from './ProfilePost';
import useGetUserPosts from '../../../hooks/useGetUserPosts';
import useUserProfileStore from '../../../store/userProfileStore';

const ProfilePosts = () => {
    // const [isLoading , setIsLoading] = useState(true)
    const { isLoading, posts } = useGetUserPosts();
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

        {!isLoading && posts.map((post , index)=>(<Box key={index}><ProfilePost key={index} post={post}/>
        <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={post.imageURL}/>
          </ModalBody>
         
        </ModalContent>
      </Modal>
        </Box>))
        
        }
      
    </Grid>
  )
}

export default ProfilePosts
