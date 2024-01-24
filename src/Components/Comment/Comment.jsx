import { Avatar, Box, Button, Flex, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import { CalcTime } from '../../utils/CalcTime';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const Comment = ({comment}) => {
 const   { isLoading, userProfile, setUserProfile } = useGetUserProfileById(comment.createdBy);
 
 if (isLoading) {
    return (
      // Display loading skeleton while data is being fetched
      <Flex gap={4} alignSelf={"start"} py={1.5}>
        <Skeleton circle size={"sm"} />
        <Flex direction={"column"} gap={1.5}>
       
          <Skeleton width="200px" height="16px" />
          <Skeleton width="160px" height="12px" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex  w={'full'}   display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'} py={1.5} >
       <Box display={'flex'} gap={2}>
       <Avatar src={userProfile.profilePicUrl} name={userProfile.username} size={"sm"}/>
        <Flex direction={"column"}>
            <Flex gap={2}>
                <Text fontWeight={"bold"} fontSize={14}>
                    {userProfile.username}
                </Text>
                <Text fontSize={14}>
                    {comment.comment}
                </Text>
            </Flex>
          <Flex gap={2}>
          <Text fontSize={12} color={"gray"}>
                    {CalcTime(comment.createdAt)}
                </Text>
                <Box backgroundColor={'transparent'}> <Text fontSize={12} color={"gray"}>
                  Like
                </Text></Box>
                <Box backgroundColor={'transparent'}> <Text fontSize={12} color={"gray"}>
                  Reply
                </Text></Box>
          </Flex>
        </Flex>
       </Box>
       <Box>

        <BsHeartFill/>
       </Box>
      
    </Flex>
  )
}

export default Comment
