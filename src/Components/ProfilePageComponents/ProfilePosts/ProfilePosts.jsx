import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProfilePost from './ProfilePost';

const ProfilePosts = () => {
    const [isLoading , setIsLoading] = useState(true)

    useEffect(()=>{
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);

    });
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

        {!isLoading && <>
        <ProfilePost img='src/public/img3.png' />
        <ProfilePost img='src/public/img3.png' />
        <ProfilePost img='src/public/img3.png' />
        </>}
      
    </Grid>
  )
}

export default ProfilePosts
