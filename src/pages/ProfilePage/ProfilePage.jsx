import { Container, Flex, Text, Link, SkeletonCircle, VStack, Skeleton } from "@chakra-ui/react";
import ProfileHeader from "../../Components/ProfilePageComponents/ProfileHeader/ProfileHeader";
import ProfileTabs from "../../Components/ProfilePageComponents/ProfileTabs/ProfileTabs";
import ProfilePosts from "../../Components/ProfilePageComponents/ProfilePosts/ProfilePosts";
import { useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { Link as RouterLink } from "react-router-dom";
import ProfileFeedPosts from "../../Components/ProfilePageComponents/ProfileFeedPosts/ProfileFeedPosts";

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const userNotFound = !isLoading && !userProfile;

  if (userNotFound) return <UserNotFound />;

  return (
    <Container
      maxW={"container.lg"}
      py={5}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        {!isLoading && userProfile && (
          <ProfileHeader
            username={"usename"}
            numberOfPosts={120}
            followers={333}
            following={56}
          />
        )}
      </Flex>

      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts userProfile={userProfile} />
        <ProfileFeedPosts/>
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const UserNotFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color="blue.500"
        w={"max-content"}
        mx={"auto"}
      >
        Go Home
      </Link>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return(
    <Flex
    direction={{base:"column",sm:"row"}}
    py={10}
    gap={{base:4,sm:10}}
    justifyContent={"center"}
    alignItems={"center"}
    >
      <SkeletonCircle size={'24'}/>
      <VStack alignItems={{base:"center",sm:"flex-start"}} gap={2} mx={"auto"} flex={1}>
        <Skeleton height={'12px'} width={'150px'}/>
        <Skeleton height={'12px'} width={'150px'}/>

      </VStack>
    </Flex>
  );
};
