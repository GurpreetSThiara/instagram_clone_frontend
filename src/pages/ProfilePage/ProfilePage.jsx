
import { Container, Flex } from '@chakra-ui/react'
import ProfileHeader from '../../Components/ProfilePageComponents/ProfileHeader/ProfileHeader'
import ProfileTabs from '../../Components/ProfilePageComponents/ProfileTabs/ProfileTabs'
import ProfilePosts from '../../Components/ProfilePageComponents/ProfilePosts/ProfilePosts'

const ProfilePage = () => {
  return (
    <Container maxW={"container.lg"} py={5} alignItems={"center"} justifyContent={"center"}>
        <Flex py={10} px={4} pl={{base:4,md:10}} w={"full"} mx={"auto"} flexDirection={"column"}>
        <ProfileHeader username={"usename"} numberOfPosts={120} followers={333} following={56}/>

        </Flex>
    
        <Flex px={{base:2 ,sm:4}} maxW={"full"} mx={"auto"} borderTop={"1px solid"} borderColor={"whiteAlpha.300"} direction={"column"} >
          <ProfileTabs/>
          <ProfilePosts/>

        </Flex>
   
    </Container>
  )
}

export default ProfilePage
