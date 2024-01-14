import React, { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import useUserProfileStore from '../../../store/userProfileStore';
import useAuthStore from './../../../store/authStore';
import EditProfile from '../EditProfile/EditProfile';

const ProfileImage = ({image}) => (
  <AvatarGroup justifyContent={{base:"flex-end",sm:"center"}} alignSelf="flex-end" marginRight="16px">
    <Avatar height={{ base: 77, sm: 166 }} width={{ base: 77, sm: 166 }} src={image} />
  </AvatarGroup>
);


const ProfileUpperPart = ({ username , vistingOwnProfile,vistingAnotherProfile,onOpen }) => (
  <VStack alignItems="flex-start" gap={2}  flex={1}>
    <Flex gap={4} direction={{ base: 'column', sm: 'row' }} justifyContent={{ base: 'flex-start', sm: 'flex-start' }} alignItems={{ base: 'flex-start', sm: 'center' }} w="full">
      <Text fontSize={25}>{username}</Text>
        { vistingOwnProfile && (
                <Flex gap={4} alignItems="center" justifyContent="center">
                <Button
                  width={{base:250,sm:101.45}}
                  height={32}
                  bg="#4A4A4A"
                  color="#E9F5F5"
                  _hover={{ bg: '#363636' }}
                  size={{ base: 'sm', md: 'sm' }}
                  justifyContent="center"
                  onClick={onOpen}
                >
                  Edit Profile
                </Button>
               
              </Flex>
             
        )}
        {vistingAnotherProfile &&   <Flex gap={4} alignItems="center" justifyContent="center">
                <Button
                  width={{base:250,sm:101.45}}
                  height={32}
                  bg="#4A4A4A"
                  color="#E9F5F5"
                  _hover={{ bg: '#363636' }}
                  size={{ base: 'sm', md: 'sm' }}
                  justifyContent="center"
                >
                  Follow
                </Button>
               
              </Flex>}
    </Flex>

  </VStack>
);

const ProfileHeader = ({ username, numberOfPosts, followers, following }) => {
  const {userProfile} = useUserProfileStore()
  const [isLargerThanSm] = useMediaQuery('(min-width: 48em)');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const authUser = useAuthStore(state =>state.user);
  const vistingOwnProfile = authUser && authUser.username === userProfile.username;
  const vistingAnotherProfile = authUser && authUser.username !== userProfile.username;

  const {isOpen , onOpen , onClose} = useDisclosure();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isLargeScreen = windowWidth > 700;

  const ProfileLowerPart=({username, numberOfPosts, followers, following , fullName,bio})=>{
    const ProfileStatistics =()=>{
      return <Container my={{base:2,md:0}} borderTop={!isLargeScreen?"1px solid":""} borderBottom={!isLargeScreen?"1px solid":""} borderColor={"whiteAlpha.300"}  >

<Flex alignItems="center" justify={isLargeScreen?"":"space-around"} gap={{ base: 2, sm: 10 }} my={8} >
      <Text fontSize={{ base: 'xs', md: 18 }}  textAlign={!isLargeScreen?"center":""}  >
        <Text as={isLargeScreen?"span":""} fontWeight="bold" mr={1}>
          {numberOfPosts}
        </Text>
       <Text as={isLargeScreen?"span":""} color={"#A8A8A8"}  fontSize={{base:15}}>
       posts
       </Text>
      </Text>
      <Text fontSize={{ base: 'xs', md: 18 }}  textAlign="center">
        <Text as={isLargeScreen?"span":""} fontWeight="bold" mr={1}>
          {followers}
        </Text>
        <Text  as={isLargeScreen?"span":""}color={"#A8A8A8"} fontSize={{base:15}}>
        followers
       </Text>
      </Text>
      <Text fontSize={{ base: 'xs', md: 18 }}  textAlign="center">
        <Text as={isLargeScreen?"span":""} fontWeight="bold" mr={1}>
          {following}
        </Text>
        <Text as={isLargeScreen?"span":""} color={"#A8A8A8"}  fontSize={{base:15}}>
        following
       </Text>
      </Text>
    </Flex>
      </Container>
    }
    return <Box>
     {isLargeScreen? <ProfileStatistics/>:null}
        
      <Flex alignItems="center" gap={4}>
        <Text fontSize="sm" fontWeight="bold">
          {fullName}
        </Text>
      </Flex>
      <Button color="#E9F5F5" _hover={{ bg: '#363636' }} borderRadius={15} height={26} display="flex" alignItems="center">
        @<Text fontSize={13}>{username}</Text>
      </Button>
      <Text fontSize="sm">{bio}</Text>
      {!isLargeScreen? <ProfileStatistics/>:null}
    </Box>
  }
  

  return (
    <Box gap={{ base: 4, sm: 20 }}  alignSelf={{base:"center",sm:"auto"}}>
      {isLargeScreen ? (
        <Flex gap={{ base: 4, sm: 20 }} py={8} direction={{ base: 'column', sm: 'row' }} alignSelf="auto">
          <ProfileImage image={userProfile.profilePicUrl} />
           <Box>
           <ProfileUpperPart username={userProfile.username} vistingOwnProfile={vistingOwnProfile}   vistingAnotherProfile={vistingAnotherProfile} onOpen={onOpen} />
          <ProfileLowerPart username={userProfile.username}  numberOfPosts={userProfile.posts.length} followers={userProfile.followers.length} following={userProfile.following.length} fullName={userProfile.fullName} bio={userProfile.bio}/>
           </Box>
        </Flex>
      ) : (
       <>
        <Flex>
          <ProfileImage />
          <ProfileUpperPart username={userProfile.username} vistingOwnProfile={vistingOwnProfile} vistingAnotherProfile={vistingAnotherProfile} onOpen={onOpen} />
        </Flex>
        <ProfileLowerPart username={userProfile.username} numberOfPosts={userProfile.posts.length} followers={userProfile.followers.length} following={userProfile.following.length} fullName={userProfile.fullName} bio={userProfile.bio}/>

       </>
      )}

      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
    </Box>
  );
};

export default ProfileHeader;
