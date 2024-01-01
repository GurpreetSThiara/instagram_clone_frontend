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

const FeedPosts = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
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
      {!isLoading && (
    <>
        <FeedPost
          username={"userName"}
          avatar={"src/public/img1.png"}
          image={"src/public/img1.png"}
        />
            <FeedPost
          username={"userName"}
          avatar={"src/public/img1.png"}
          image={"src/public/img1.png"}
        />
            <FeedPost
          username={"userName"}
          avatar={"src/public/img1.png"}
          image={"src/public/img1.png"}
        />
    </>
        
      )}
    </Container>
  );
};

export default FeedPosts;
