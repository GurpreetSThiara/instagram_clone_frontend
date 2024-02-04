import { Avatar, Box, Divider, Flex, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Comment from "../Comment/Comment"
import PostFooter from "../FeedPosts/PostFooter"
import PostHeader from "../FeedPosts/PostHeader"
import { useEffect, useState } from "react"
import { GoChevronLeft } from "react-icons/go"


const PostModal = ({post , comments ,userProfile , isOpen ,onClose , user}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


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
    <Box>
           <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "full", md: "4xl" }}
        bg={"black"}
   
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(4px) hue-rotate(90deg)"
        />
     
        <ModalContent p={0}
           backgroundColor={'black'}
        >
        <ModalHeader
        h={'44px'}
             backgroundColor={'black'}
              alignItems={"center"}
              display={"flex"}
              justifyContent={"space-between"}
              borderBottom={"1px solid #363636"}
            >
              <Box onClick={onClose}>
                <GoChevronLeft  />
              </Box>
              <Text alignSelf={"center"}>Post</Text>
              <Box></Box>
            </ModalHeader>
          <ModalBody
            bg={"black"}
            p={{base:4,md:0}}
        
           
            pb={5}
            border={{base:'none',md:"1px solid"}}
            borderColor={"whiteAlpha.300"}
          >
           {isMobile && <Box ><PostHeader display={{base:'flex',md:'none',lg:'none'}} creatorProfile={userProfile} post={post} /></Box> } 
            <Flex  mx={"auto"} alignItems={'center'}>
              <Box borderRadius={4}   overflow={"hidden"}  >
                <Image w={'auto'}  src={post.imageURL} alt="post" />
              </Box>
            
              <Flex
               w={'full'}
             
                borderLeft={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1}
                flexDirection={"column"}
                display={{ base: "none", md: "flex" }}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  border={"1px solid"}
                  borderColor={"whiteAlpha.300"}
                  p={4}
                >
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile.profilePicUrl}
                      size={"sm"}
                      name="User"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  <Box >
                    <BsThreeDots
                      color="white"
                      size={20}
                      cursor={"pointer"}
                      _hover={{ color: "#A8A8A8" }}
                    />
                  </Box>
                </Flex>

                <VStack
                  w={"full"}
                  alignItems={"center"}
                  h={"350px"}
                  overflowY={"auto"}
                  WebkitOverflowScrolling={"touch"}
                >
                  {comments &&
                    comments.map((item, index) => (
                      <Box w={"full"} pl={4} pr={4} key={index}>
                        <Comment comment={item.comment} replies={item} />
                        
                      </Box>
                    ))}
                </VStack>
                <Divider my={4} bg={"gray.8000"} />
                <Box p={4}>
                  <PostFooter isProfilePage={true} post={post} user={user} creatorProfile={userProfile} />
                </Box>
              </Flex>
            </Flex>
            {isMobile && <Box>
                <PostFooter comments={comments} isProfilePage={true} post={post} user={user} creatorProfile={userProfile} isMobile={isMobile} />

                </Box>}
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </Box>
  )
}

export default PostModal
