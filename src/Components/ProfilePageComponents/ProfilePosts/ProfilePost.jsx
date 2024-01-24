import { Avatar, Box, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import {AiFillHeart} from 'react-icons/ai'
import {FaComment} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import { BsThreeDots } from "react-icons/bs"
import Comment from '../../Comment/Comment'
import PostFooter from './../../FeedPosts/PostFooter';
import { useState } from 'react'
import { color } from 'framer-motion'
import useAuthStore from '../../../store/authStore'

const ProfilePost = ({post}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
    const onModelMenuOpen = () => setIsModelMenuOpen(true);
  const onModelMenuClose = () => setIsModelMenuOpen(false);
  const user = useAuthStore(s=>s.user);

  const modalMenuItems=[
    {
        title:"Delete",
        color:"red",
        onClick:()=>{}
    },
    {
        title:"Edit",
        color:"#F5F5F5",
        onClick:()=>{}
    },
    {
        title:"Hide likes count to others",
        color:"#F5F5F5",
        onClick:()=>{}
    },
    {
        title:"Turn off commenting",
        color:"#F5F5F5",
        onClick:()=>{}
    },
    {
        title:"Share to...",
        color:"#F5F5F5",
        onClick:()=>{}
    },
    {
        title:"Copy link",
        color:"#F5F5F5",
        onClick:()=>{}
    },
    {
        title:"About this account",
        color:"#F5F5F5",
        onClick:()=>{}
    },
    {
        title:"cancel",
        color:"#F5F5F5",
        onClick:()=>{}
    }

  ];


  return (
<Box>
    <GridItem
    cursor={"pointer"}
    borderRadius={4}
    overflow={"hidden"}
    border={"1px solid whiteAlpha.300"}
    position={"relative"}
    aspectRatio={1/1}
    onClick={onOpen}

    >
        <Flex
        opacity={0}
        _hover={{opacity:1}}
        position={"absolute"}
        top={0}
        bottom={0}
        right={0}
        left={0}
        bg={"blackAlpha.700"}
        transition={"all 0.3s ease"}
        zIndex={1}
        justifyContent={"center"}
        >

            <Flex alignItems={"center"}
             justifyContent={"center"}
             gap={50}
            >
                <Flex>
                    <AiFillHeart size={20} />
                    <Text fontWeight={"bold"} ml={2} >7</Text>
                </Flex>
                <Flex>
                    <FaComment/>
                    <Text fontWeight={"bold"} ml={2}>
                        5
                    </Text>
                </Flex>

            </Flex>

        </Flex>

        <Image src={post.imageURL} alt='profile post' h={"100%"} w={"100%"}  objectFit={"cover"}/>
      
    </GridItem>

    <Modal  isOpen={isOpen} onClose={onClose} isCentered={true} size={{base:"3xl",md:"3xl"}} h={500}>
    <ModalOverlay
    bg='blackAlpha.300'
    backdropFilter='blur(4px) hue-rotate(90deg)'
    />
        <ModalContent p={0}>
      
            <ModalBody bg={"black"} p={0
            } h={600} pb={5}  border={"1px solid"} borderColor={"whiteAlpha.300"}>
                <Flex gap={4} w={'full'} mx={"auto"}>
                    <Box  borderRadius={4} overflow={"hidden"} flex={1.5}>
                        <Image h={500}   src={post.imageURL} alt='post' fit={'contain'}/>

                    </Box>
                    <Flex  borderLeft={"1px solid"} borderColor={"whiteAlpha.300"} flex={1} flexDirection={"column"}  display={{base:"none",md:"flex"}}>
                        <Flex alignItems={"center"} justifyContent={"space-between"} border={"1px solid"} borderColor={"whiteAlpha.300"} p={4}>
                        <Flex alignItems={"center"} gap={4} >
                            <Avatar src={user.profilePicUrl} size={"sm"} name="User"/>
                            <Text fontWeight={"bold"} fontSize={12}>
                                {user.username}
                            </Text>
                        </Flex>
                        <Box onClick={onModelMenuOpen}>
                            <BsThreeDots color='white' size={20} cursor={"pointer"}  _hover={{ color:"#A8A8A8"}}  />
                        </Box>
                        </Flex>
                   
                        <VStack w={"full"} alignItems={"center"} h={"350px"}  overflowY={"auto"} WebkitOverflowScrolling={"touch"} >
                            {post.comments && post.comments.map((item,index)=><Box w={'full'} pl={4} pr={4} key={index}><Comment comment={item}/></Box>)}
                            


                        </VStack>
                        <Divider my={4} bg={"gray.8000"} />
                        <Box p={4}>
                        <PostFooter isProfilePage={true} post={post} user={user}/>
                        </Box>

                    </Flex>
                </Flex>

            </ModalBody>
        </ModalContent>

    </Modal>

    <Modal isOpen={isModelMenuOpen} onClose={onModelMenuClose} isCentered size={"sm"} borderRadius={20} overflow={"hidden"} >
        <ModalContent borderRadius={20} overflow={"hidden"}>
            <ModalBody bg={"#262626"} borderRadius={20} overflow={"hidden"} >
               <Box>
               {modalMenuItems.map((item , index)=>  <Box key={index} alignItems={"center"} justifyContent={"center"} display={"flex"}  m={1}  >
                    <Button bg={"transparent"} _hover={{bg:"transparent"}} cursor={"pointer"} color={item.color}>
                        {item.title}
                    </Button>
                </Box>)}
               </Box>
              
            </ModalBody>
        </ModalContent>
    </Modal>

    </Box>
  )
}

export default ProfilePost
