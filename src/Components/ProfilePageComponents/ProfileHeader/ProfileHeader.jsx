import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import useUserProfileStore from "../../../store/userProfileStore";
import useAuthStore from "./../../../store/authStore";
import EditProfile from "../EditProfile/EditProfile";
import useFollowUser from "../../../hooks/useFollowUser";
import useGetUserProfileById from "./../../../hooks/useGetUserProfileById";
import useFindAllFollowersOrFollowing from "../../../hooks/useGetAllFollowersOrFollowing";
import useAllFollowers from "../../../store/userFollowers";
import useAllFollowings from "../../../store/useFollowings";

import { GoChevronLeft } from "react-icons/go";

const ProfileImage = ({ image }) => (
  <AvatarGroup
    justifyContent={{ base: "flex-end", sm: "center" }}
    alignSelf="flex-end"
    marginRight="16px"
  >
    <Avatar
      height={{ base: 77, sm: 166 }}
      width={{ base: 77, sm: 166 }}
      src={image}
    />
  </AvatarGroup>
);

const ProfileUpperPart = ({
  username,
  vistingOwnProfile,
  vistingAnotherProfile,
  onOpen,
  uid,
}) => {
  const { isFollowing, handleFollowUser, isUpdating } = useFollowUser(uid);

  return (
    <VStack alignItems="flex-start" gap={2} flex={1}>
      <Flex
        gap={4}
        direction={{ base: "column", sm: "row" }}
        justifyContent={{ base: "flex-start", sm: "flex-start" }}
        alignItems={{ base: "flex-start", sm: "center" }}
        w="full"
      >
        <Text fontSize={25}>{username}</Text>
        {vistingOwnProfile && (
          <Flex gap={4} alignItems="center" justifyContent="center">
            <Button
              width={{ base: 250, sm: 101.45 }}
              height={32}
              bg="#4A4A4A"
              color="#E9F5F5"
              _hover={{ bg: "#363636" }}
              size={{ base: "sm", md: "sm" }}
              justifyContent="center"
              onClick={onOpen}
            >
              Edit Profile
            </Button>
          </Flex>
        )}
        {vistingAnotherProfile && (
          <Flex gap={4} alignItems="center" justifyContent="center">
            <Button
              width={{ base: 250, sm: 101.45 }}
              height={32}
              bg="#4A4A4A"
              color="#E9F5F5"
              _hover={{ bg: "#363636" }}
              size={{ base: "sm", md: "sm" }}
              justifyContent="center"
              onClick={() => {
                handleFollowUser(uid);
              }}
              isLoading={isUpdating}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
        )}
      </Flex>
    </VStack>
  );
};

const ProfileHeader = ({ username, numberOfPosts, followers, following }) => {
  const { userProfile } = useUserProfileStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const authUser = useAuthStore((state) => state.user);
  const vistingOwnProfile =
    authUser && authUser.username === userProfile.username;
  const vistingAnotherProfile =
    authUser && authUser.username !== userProfile.username;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isFollowersModelMenuOpen, setIsFollowersModelMenuOpen] =
    useState(false);
  const onFollowersModelMenuOpen = () => setIsFollowersModelMenuOpen(true);
  const onFollowersModelMenuClose = () => setIsFollowersModelMenuOpen(false);

  const [isFollowingModalMenuOpen, setIsFollowingModalMenuOpen] =
    useState(false);
  const onFollowingModalMenuOpen = () => setIsFollowingModalMenuOpen(true);
  const onFollowingModalMenuClose = () => setIsFollowingModalMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLargeScreen = windowWidth > 600;

  const ProfileLowerPart = ({
    username,
    numberOfPosts,
    followers,
    following,
    fullName,
    bio,
  }) => {
    // const [AllFollowers,setAllFollowers] = useState(null);
    const [profilesLoading, SetProfilesLoading] = useState(true);
    const { findAllFollowers, findAllFollowings } =
      useFindAllFollowersOrFollowing();
    const AllFollowers = useAllFollowers((s) => s.followers);
    const AllFollowings = useAllFollowings((s) => s.followings);
    const findFollowers = async () => {
      await findAllFollowers(followers);
    };

    const findFollowings = () => {
      findAllFollowings(following);
    };

    const ProfileStatistics = () => {
      return (
        <Container
          my={{ base: 2, md: 0 }}
          borderTop={!isLargeScreen ? "1px solid" : ""}
          borderBottom={!isLargeScreen ? "1px solid" : ""}
          borderColor={"whiteAlpha.300"}
        >
          <Flex
            alignItems="center"
            justify={isLargeScreen ? "" : "space-around"}
            gap={{ base: 2, sm: 10 }}
            my={8}
          >
            <Text
              fontSize={{ base: "xs", md: 18 }}
              textAlign={!isLargeScreen ? "center" : ""}
            >
              <Text as={isLargeScreen ? "span" : ""} fontWeight="bold" mr={1}>
                {numberOfPosts}
              </Text>
              <Text
                as={isLargeScreen ? "span" : ""}
                color={"#A8A8A8"}
                fontSize={{ base: 15 }}
              >
                posts
              </Text>
            </Text>
            <Box
              fontSize={{ base: "xs", md: 18 }}
              textAlign="center"
              cursor={"pointer"}
              onClick={() => {
                onFollowersModelMenuOpen(true);
                findFollowers();
              }}
            >
              <Text as={isLargeScreen ? "span" : ""} fontWeight="bold" mr={1}>
                {followers.length}
              </Text>
              <Text
                as={isLargeScreen ? "span" : ""}
                color={"#A8A8A8"}
                fontSize={{ base: 15 }}
              >
                followers
              </Text>
            </Box>
            <Box
              fontSize={{ base: "xs", md: 18 }}
              textAlign="center"
              cursor={"pointer"}
              onClick={() => {
                setIsFollowingModalMenuOpen(true);
                findFollowings();
              }}
            >
              <Text as={isLargeScreen ? "span" : ""} fontWeight="bold" mr={1}>
                {following.length}
              </Text>
              <Text
                as={isLargeScreen ? "span" : ""}
                color={"#A8A8A8"}
                fontSize={{ base: 15 }}
              >
                following
              </Text>
            </Box>
          </Flex>
        </Container>
      );
    };
    return (
      <Box>
        {isLargeScreen ? <ProfileStatistics /> : null}

        <Flex alignItems="center" gap={4}>
          <Text fontSize="sm" fontWeight="bold">
            {fullName}
          </Text>
        </Flex>
        <Button
          color="#E9F5F5"
          _hover={{ bg: "#363636" }}
          borderRadius={15}
          height={26}
          display="flex"
          alignItems="center"
        >
          @<Text fontSize={13}>{username}</Text>
        </Button>
        <Text fontSize="sm">{bio}</Text>
        {!isLargeScreen ? <ProfileStatistics /> : null}
        <Modal
          isOpen={isFollowersModelMenuOpen}
          onClose={onFollowersModelMenuClose}
          size={{ base: "full", md: "sm" }}
        >
          <ModalOverlay />
          <ModalContent h={400} w={400} backgroundColor={"#262626"}>
            <ModalHeader
              h={42.2}
              alignItems={"center"}
              display={"flex"}
              justifyContent={"space-between"}
              borderBottom={"1px solid #363636"}
            >
              <Box onClick={onFollowersModelMenuClose}>
                <GoChevronLeft  />
              </Box>
              <Text alignSelf={"center"}>Folllowers</Text>
              <Box></Box>
            </ModalHeader>
            {isLargeScreen && <ModalCloseButton />}
            <ModalBody>
              {AllFollowers && (
                <>
                  {AllFollowers.map((item, index) => (
                    <Flex
                      overflow={"auto"}
                      p={2}
                      alignItems={"space-between"}
                      justifyContent={"space-between"}
                      display={"flex"}
                      key={index}
                      padding={"8px 24px"}
                      cursor={"pointer"}
                      // _hover={{ backgroundColor: "#121212" }}
                    >
                      <Box
                        key={index}
                        onClick={() => {
                          // navigate(`/${item.username}`);
                        }}
                      >
                        <Flex gap={4}>
                          <Avatar src={item.profilePicUrl} />
                          <Box>
                            <Text color={"#F5F5F5"} fontWeight={"bold"}>
                              {item.username}
                            </Text>
                            <Flex gap={2}>
                              <Text color={"#A8A8A8"} fontWeight={400}>
                                {item.fullName}
                              </Text>
                              {/* <Text color={"#A8A8A8"} fontWeight={400}>
                      {item.followers.length} Followers
                    </Text> */}
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                      <Button>Remove</Button>
                    </Flex>
                  ))}
                </>
              )}
              {!AllFollowers && <Spinner isLoading={!AllFollowers} />}
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isFollowingModalMenuOpen}
          onClose={onFollowingModalMenuClose}
          size={{ base: "full", md: "sm" }}
        >
          <ModalOverlay />
          <ModalContent h={400} w={400} backgroundColor={"#262626"}>
            <ModalHeader
              h={42.2}
              alignItems={"center"}
              display={"flex"}
              justifyContent={"space-between"}
              borderBottom={"1px solid #363636"}
            >
                 <Box onClick={onFollowingModalMenuClose}>
                <GoChevronLeft  />
              </Box>
              <Text alignSelf={"center"} fontSize={17}>
                Following
              </Text>
              <Box></Box>
            </ModalHeader>
            {isLargeScreen && <ModalCloseButton />}
            <ModalBody>
              {AllFollowings && (
                <Box mt={8}>
                  {AllFollowings.map((item, index) => (
                    <Flex
                      overflow={"auto"}
                      alignItems={"space-between"}
                      justifyContent={"space-between"}
                      display={"flex"}
                      key={index}
                      padding={"2px 2px 8px 8px"}
                      cursor={"pointer"}
                      // _hover={{ backgroundColor: "#121212" }}
                    >
                      <Box
                        key={index}
                        onClick={() => {
                          // navigate(`/${item.username}`);
                        }}
                      >
                        <Flex gap={4}>
                          <Avatar src={item.profilePicUrl} />
                          <Box>
                            <Text color={"#F5F5F5"} fontWeight={"bold"}>
                              {item.username}
                            </Text>
                            <Flex gap={2}>
                              <Text color={"#A8A8A8"} fontWeight={400}>
                                {item.fullName}
                              </Text>
                              {/* <Text color={"#A8A8A8"} fontWeight={400}>
                      {item.followers.length} Followers
                    </Text> */}
                            </Flex>
                          </Box>
                        </Flex>
                      </Box>
                      <Button>Unfollow</Button>
                    </Flex>
                  ))}
                </Box>
              )}
              {!AllFollowings && <CircularProgress />}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    );
  };

  return (
    <Box gap={{ base: 4, sm: 20 }} alignSelf={{ base: "center", sm: "auto" }}>
      {isLargeScreen ? (
        <Flex
          gap={{ base: 4, sm: 20 }}
          py={8}
          direction={{ base: "column", sm: "row" }}
          alignSelf="auto"
        >
          <ProfileImage image={userProfile.profilePicUrl} />
          <Box>
            <ProfileUpperPart
              username={userProfile.username}
              vistingOwnProfile={vistingOwnProfile}
              vistingAnotherProfile={vistingAnotherProfile}
              onOpen={onOpen}
              uid={userProfile.uid}
            />
            <ProfileLowerPart
              username={userProfile.username}
              numberOfPosts={userProfile.posts.length}
              followers={userProfile.followers}
              following={userProfile.following}
              fullName={userProfile.fullName}
              bio={userProfile.bio}
            />
          </Box>
        </Flex>
      ) : (
        <>
          <Flex>
            <ProfileImage />
            <ProfileUpperPart
              username={userProfile.username}
              vistingOwnProfile={vistingOwnProfile}
              vistingAnotherProfile={vistingAnotherProfile}
              onOpen={onOpen}
              uid={userProfile.uid}
            />
          </Flex>
          <ProfileLowerPart
            username={userProfile.username}
            numberOfPosts={userProfile.posts.length}
            followers={userProfile.followers}
            following={userProfile.following}
            fullName={userProfile.fullName}
            bio={userProfile.bio}
          />
        </>
      )}

      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default ProfileHeader;
