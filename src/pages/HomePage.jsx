
import { Box, Container, Flex } from '@chakra-ui/react'
import PageLayouts from '../Layouts/PageLayouts/PageLayouts'
import FeedPosts from './Auth/Components/AuthenticationForm/FeedPosts/FeedPosts'


const HomePage = () => {
  return (
    <Container maxW={"container.lg"} >
      <Flex gap={20}>
        <Box flex={2} py={10}>
        <FeedPosts/>
        </Box>
      
      
        <Box flex={3} mr={20} display={{base:"none",lg:"block"}} maxW={"300px"}  >

        FeedPosts
        </Box>
      </Flex>
       
      
    </Container>
  )
}

export default HomePage
