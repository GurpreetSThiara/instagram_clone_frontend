import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProfilePost from './ProfilePost';
import useGetUserPosts from '../../../hooks/useGetUserPosts';

const ProfilePosts = () => {
    // const [isLoading , setIsLoading] = useState(true)
    const { isLoading, posts } = useGetUserPosts();



  return (
    <Grid
    templateColumns={{
        sm:"repeat(1, 1fr)",
        md:"repeat(3, 1fr)",
    }}
    gap={1}
    columnGap={1}
    >
        {isLoading && [1,1,1,1,1,1,1].map((item ,index)=><VStack key={index} >
          <Skeleton w={"full"}>
            <Box h={300}>contents wrapped</Box>
          </Skeleton>
        </VStack>)}

        {!isLoading && posts.map((post , index)=><ProfilePost key={index} img={post.imageURL}/>)
        
        }
      
    </Grid>
  )
}

export default ProfilePosts
