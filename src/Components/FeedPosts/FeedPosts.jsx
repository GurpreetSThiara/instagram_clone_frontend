import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import { useEffect, useState } from "react";
import usePostStore from "../../store/postStore";
import useGetFeedPosts from './../../hooks/useGetFeedposts';

const FeedPosts = () => {
  // const [isLoading, setLoading] = useState(true);
  const { isLoading, posts } = useGetFeedPosts();


  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // useEffect(()=>{

  // },[])
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, index) => (
          <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={"10"} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={"10px"} w={"200px"} />
                <Skeleton height={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading && posts && posts.length!==0? posts.map((post)=>(
      <FeedPost key={posts.id} post={post} />)):<>  <Container maxW={"container.sm"} textAlign={"center"}>
      <Box fontSize={"xl"} fontWeight={"bold"} mb={4}>
        Oops! It seems a bit lonely here...
      </Box>
      <Box fontSize={"md"} mb={4}>
        Why not follow some amazing people and make friends? 🌟
      </Box>
      {/* Add a funny message or suggestion */}
      <Box fontSize={"sm"} fontStyle={"italic"} color={"gray.500"}>
        {"Pro tip: Following people can't hurt (unless you're a ninja, then be careful with those sharp edges)"}.
      </Box>
    </Container></>
      }
    </Container>
  );
};

export default FeedPosts;
