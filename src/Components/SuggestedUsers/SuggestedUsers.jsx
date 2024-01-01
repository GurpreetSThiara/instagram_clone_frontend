import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'

import SuggestedUsersHeader from './SuggestedUsersHeader'
import SuggestedUser from './SuggestedUser'
import { Link as RouterLink } from 'react-router-dom'

const SuggestedUsers = () => {
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

        <SuggestedUser name="ponty chadda" followers={1111} avatar="https://sp-images.summitpost.org/1038746.jpg?auto=format&fit=max&ixlib=php-2.1.1&q=35&w=1024&s=394ed8f3158db7ef966a1b238d293e8b" />
        <SuggestedUser name="monty laal" followers={1411} avatar="https://media.licdn.com/dms/image/C4E03AQFpjaGTSSuRaw/profile-displayphoto-shrink_800_800/0/1598945509781?e=2147483647&v=beta&t=-BPJg7Sms8RTT_geWZ6pJ6-D6FRtTUfm9VHPzBIrwII" />
        <SuggestedUser name="shanty kumar" followers={4111} avatar="https://i1.rgstatic.net/ii/profile.image/599086382186502-1519844732695_Q512/Jan-Louda.jpg" />


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
