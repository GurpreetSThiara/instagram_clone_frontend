import { Container } from "@chakra-ui/react"
import FeedPost from "./FeedPost"


const FeedPosts = () => {
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
            <FeedPost username={"userName"} avatar={"src/public/img1.png"} image={"src/public/img1.png"}/>
       
      
    </Container>
  )
}

export default FeedPosts
