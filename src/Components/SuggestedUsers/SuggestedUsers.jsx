import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'

import SuggestedUsersHeader from './SuggestedUsersHeader'
import SuggestedUser from './SuggestedUser'
import { Link as RouterLink } from 'react-router-dom'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'

const SuggestedUsers = () => {
    const {isLoading, suggestedUsers} = useGetSuggestedUsers();
    if(isLoading) return null;
  return (
    <VStack py={8} px={8} gap={4}>
        <SuggestedUsersHeader/>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                Suggested for you
            </Text>
            <Text fontSize={12} fontWeight={"bold"} _hover={{ color:"gray.400"}} cursor={"pointer"}>
                See All
            </Text>
        </Flex>

       {suggestedUsers.map((user , index)=>(<SuggestedUser user={user} key={index}/>))}


        <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2023 Built By {" "}

            <Link as={RouterLink} href='' color='blue.500' fontSize={14}>
                Gurpreet Singh
            </Link>
            
             </Box>

      
    </VStack>
  )
}

export default SuggestedUsers
