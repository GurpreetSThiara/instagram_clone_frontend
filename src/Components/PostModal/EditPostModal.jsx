import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TagPopUpMenu from "./TagPopUpMenu";
import useSearchUsers from "../../hooks/useSearchUsers";
import searchResultsStore from "../../store/searchResultsStore";
import { BsX, BsXLg } from "react-icons/bs";

const EditPostModal = ({ isOpen, onClose, post, user }) => {
    const [isTagMenuOpened ,setIsTagMenuOpened] = useState(false);
    const onTagMenuOpen =()=> setIsTagMenuOpened(true);
    const onTagMenuClose =()=> setIsTagMenuOpened(false);
    const [addTagTapped , setAddTagTapped] = useState(false);
    const { isLoading, searchUsers } = useSearchUsers();
    const searchResults = searchResultsStore((state) => state.profiles);
    const [tagged , setTagged] = useState([]);
    const [caption , setCaption] = useState(post.caption);




    const handleAddTag = () => {
        setAddTagTapped(true);
    };
    const handleSearchQuery = (e) => {
        if (e !== null && e !== undefined && e !== "") {
          searchUsers(e);
        }
      };

      useEffect(()=>{
        if(post.taggedPeople){
            setTagged(post.taggedPeople);
        }
      },[post])


  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent backgroundColor={"#262626"}>
          <ModalHeader borderBottom={"1px solid #383838 "} h={20}>
            <Flex justifyContent={"space-between"} alignItems={"center"} h={4}>
              <Button
                backgroundColor={"transparent"}
                _hover={{ backgroundColor: "transparent" }}
              >
                cancel
              </Button>
              <Button
                backgroundColor={"transparent"}
                _hover={{ backgroundColor: "transparent" }}
                cursor={"inherit"}
              >
                Edit info
              </Button>
              <Button
                backgroundColor={"transparent"}
                color={"blue.500"}
                _hover={{ backgroundColor: "transparent", color: "white" }}
              >
                done
              </Button>
            </Flex>
          </ModalHeader>

          <ModalBody p={0}>
            <Flex>
              <Box
                w={500}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                backgroundColor={"black"}
              >
                <Image zIndex={5} h={400} src={post.imageURL} />
                <Popover  placement="top" strategy="fixed">
                <PopoverContent backgroundColor={'#262626'}>
            
              {/* <PopoverCloseButton /> */}
              <PopoverHeader  border={'none'}>
         {!addTagTapped &&     <Flex  alignItems={'center'} justifyContent={'space-between'}>
             <Text>Tagged people</Text>
              <Button
                backgroundColor={"transparent"}
                color={"blue.500"}
                _hover={{ backgroundColor: "transparent", color: "blue.600" }}
                onClick={handleAddTag}
              >
                Add Tag
              </Button>
             </Flex>}
             {addTagTapped && <Flex>
                <Text fontWeight={'bold'}>Tag:</Text>
                <Input size={'sm'} ml={2.5} borderRadius={5} backgroundColor={'black'}   onChange={(e) => {
                            handleSearchQuery(e.target.value);
                            console.log(e.target.value);
                          }}
                      />
                </Flex>}
              
              </PopoverHeader>
              <PopoverBody h={40}>
                {!addTagTapped && post.taggedPeople && post.taggedPeople.map((item)=>{
                    return <>{JSON.stringify(item)}</>
                })}
                {!addTagTapped && !post.taggedPeople && tagged.map((item,index)=>(
                     <Box
                     key={index}
                     padding={"8px 24px"}
                     cursor={"pointer"}
                     _hover={{ backgroundColor: "#121212" }}
                     onClick={() => {
                     
                     }}
                   >
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
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
                       
                         </Flex>
                         
                       </Box>
                       </Flex>
                      <Box onClick={()=>{
                         const newTagged = tagged.filter((_, i) => i !== index);
                         setTagged(newTagged);
                     
                      }}>
                      <BsXLg/>
                      </Box>

                     </Flex>
                   </Box>
                ))}
                {addTagTapped && searchResults &&      searchResults.map((item, index) => (
            <Box
              key={index}
              padding={"8px 24px"}
              cursor={"pointer"}
              _hover={{ backgroundColor: "#121212" }}
              onClick={() => {
              setTagged([...tagged,item]);
              setAddTagTapped(false);
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
          )) }
               
              </PopoverBody>
              <PopoverArrow />
            </PopoverContent>
            <PopoverTrigger>
              <Button position={"absolute"} zIndex={10} left={9} bottom={12}>
                Add Tag
              </Button>
            </PopoverTrigger>
         
          </Popover>
                {/* <Button position={"absolute"} zIndex={10} left={9} bottom={12} onClick={onTagMenuOpen} >
                  Add Tag
                </Button>{" "} */}

              </Box>
              <Box
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                minW={"300px"}
              >
                <Flex
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  gap={3}
                  m={2}
                >
                  <Avatar src={user.profilePicUrl} alt={user.username} />
                  <Text fontWeight={"bold"}>{user.username}</Text>
                </Flex>
                <Box>
                  <Textarea
                       
                    value={post.caption}
                    placeholder="Write a caption.."
                    maxLength={200}
                    border={"null"}
                  />
                </Box>
              </Box>
            </Flex>

          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditPostModal;
