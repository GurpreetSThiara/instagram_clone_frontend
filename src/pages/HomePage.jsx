import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FeedPosts from "../Components/FeedPosts/FeedPosts";
import SuggestedUsers from "../Components/SuggestedUsers/SuggestedUsers";

import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { InstagramMobileLogo } from "../assets/constants";
import useSearchUsers from "../hooks/useSearchUsers";
import searchResultsStore from "../store/searchResultsStore";
import { useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import useAuthStore from "../store/authStore";
import useNotificationStore from "../store/notificationsStore";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isFocused, setIsFocused] = useState(false);
  const { isLoading, searchUsers } = useSearchUsers();
  const [userInput, setUserInput] = useState("");
  const searchResults = searchResultsStore((state) => state.profiles);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const user = useAuthStore(s=>s.user)
  const addNotification = useNotificationStore((state) => state.addNotification);
  const removeNotifications = useNotificationStore((state) => state.removeNotifications);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchQuery = (e) => {
    if (e !== null && e !== undefined && e !== "") {
      searchUsers(e);
    }
  };

  useEffect(() => {
    // Function to start listening for notifications
    const startNotificationsListener = () => {
      removeNotifications();
      const notificationsRef = collection(firestore, 'users', user.uid, 'notifications');
      const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const newNotification = change.doc.data();
            
            console.log(newNotification);
            console.log("nnnnnnnnnnnnnnnnnnnnnnnn");

            addNotification(newNotification);
          }
        });
      });

      return unsubscribe; // Cleanup on component unmount
    };

    // Start listening for notifications
    const unsubscribe = startNotificationsListener();

    // Cleanup function (unsubscribe) when the component unmounts
    return () => unsubscribe();
  }, [addNotification]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          {isMobile ? (
            <Flex
              gap={3.5}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <Box>
                <InstagramMobileLogo size={24} />
              </Box>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  {isFocused ? null : <SearchIcon color="gray.300" />}
                </InputLeftElement>

                <Input
                  backgroundColor={"#262626"}
                  border={"null"}
                  focusBorderColor="null"
                  w={"full"}
                  placeholder="Search"
                  onChange={(e) => {
                    handleSearchQuery(e.target.value);
                    console.log(e.target.value);
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </InputGroup>

              <Box onTouchEnd={()=>{
                navigate(`/${user.username}/notifications`)
              }}>
              <BsHeart size={24} />
              </Box>
            </Flex>
          ) : null}

          <Box>
            {isFocused ? (
              <Box
                backgroundColor={"#262626"}
                position={"absolute"}
                zIndex={2}
                w={"91%"}
                mt={4}
                height={"40vh"}
                overflow={"auto"}
              >
                {searchResults.length !== 0 ? (
                  searchResults.map((item, index) => (
                    <Box
                      key={index}
                      padding={"8px 24px"}
                      cursor={"pointer"}
                      _hover={{ backgroundColor: "#121212" }}
                      onTouchEnd={() => {
                        navigate(`/${item.username}`);
                      }}
                      onClick={() => {
                        navigate(`/${item.username}`);
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
                            <Text color={"#A8A8A8"} fontWeight={400}>
                              {item.followers.length} Followers
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  ))
                ) : (
                  <Box p={4}>
                    <Text>Recent</Text>
                    <Box
                      width={"100%"}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box mt={4} alignItems={"center"}>
                        <Text color={"#A8A8A8"}>No recent searches</Text>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            ) : null}

            <FeedPosts />
          </Box>
        </Box>

        <Box
          flex={3}
          mr={20}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
