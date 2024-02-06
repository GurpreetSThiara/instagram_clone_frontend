import { Box, Button, Modal, ModalBody, ModalContent } from '@chakra-ui/react'
import EditPostModal from './EditPostModal/EditPostModal';
import EditPost from './PostDeialsModalItems/EditPost';
import DeletePost from './PostDeialsModalItems/DeletePost';

const PostDetailsModal = ({isModelMenuOpen ,onModelMenuClose , post,user}) => {
    
  const modalMenuItems = [

    {
      title: "Hide likes count to others",
      color: "#F5F5F5",
      onClick: () => {},
    },
    {
      title: "Turn off commenting",
      color: "#F5F5F5",
      onClick: () => {},
    },
    {
      title: "Share to...",
      color: "#F5F5F5",
      onClick: () => {},
    },
    {
      title: "Copy link",
      color: "#F5F5F5",
      onClick: () => {},
    },
    {
      title: "About this account",
      color: "#F5F5F5",
      onClick: () => {},
    },
    {
      title: "cancel",
      color: "#F5F5F5",
      onClick: () => {},
    },
  ];
  return (
    <Box>
       <Modal
        isOpen={isModelMenuOpen}
        onClose={onModelMenuClose}
        isCentered
      
        borderRadius={20}
        overflow={"hidden"}
      >
        <ModalContent borderRadius={20} >
          <ModalBody bg={"#262626"} borderRadius={20} overflow={"hidden"}>
            <Box m={0} p={0}>
            {post.createdBy === user.uid &&   <DeletePost post={post} user={user}/>} 

            {post.createdBy === user.uid &&   <EditPost post={post} user={user}/>} 
              {modalMenuItems.map((item, index) => (
                <Box
                  key={index}
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={"flex"}
                  p={0}
                  borderBottom={'1px Solid #363636'}
                  cursor={"pointer"}
                >
                  <Button
                  m={0}
                  p={0}
                    bg={"transparent"}
                    _hover={{ bg: "transparent" }}
                    cursor={"pointer"}
                    color={item.color}
                  >
                    {item.title}
                  </Button>
                </Box>
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default PostDetailsModal
