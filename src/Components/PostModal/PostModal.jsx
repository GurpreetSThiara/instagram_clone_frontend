import { Avatar, Box, Divider, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Comment from "../Comment/Comment"
import PostFooter from "../FeedPosts/PostFooter"


const PostModal = ({post , comments ,userProfile , isOpen ,onClose , user}) => {
    
  return (
    <Box>
           <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "4xl" }}
   
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(4px) hue-rotate(90deg)"
        />
        <ModalContent p={0}>
          <ModalBody
            bg={"black"}
            p={0}
           
            pb={5}
            border={"1px solid"}
            borderColor={"whiteAlpha.300"}
          >
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
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </Box>
  )
}

export default PostModal
