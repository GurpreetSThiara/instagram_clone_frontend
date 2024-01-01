import { Box, Image } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"


const FeedPost = ({image,username,avatar}) => {
  return (
    <div>
        <PostHeader username={username} avatar={avatar}/>
        <Box my={2} borderRadius={6} overflow={"hidden"}>
            <Image src={image} alt={username}/>
        </Box>
        <PostFooter username={username}/>
      
    </div>
  )
}

export default FeedPost
