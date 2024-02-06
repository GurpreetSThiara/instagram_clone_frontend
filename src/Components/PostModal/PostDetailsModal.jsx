import { Box, Button, Modal, ModalBody, ModalContent } from '@chakra-ui/react'
import EditPostModal from './EditPostModal/EditPostModal';
import EditPost from './PostDetialsModalItems/EditPost';
import DeletePost from './PostDetialsModalItems/DeletePost';
import HideLikesCount from './PostDetialsModalItems/HideLikesCount';
import TurnCommentsOnOrOff from './PostDetialsModalItems/TurnCommentsOnOrOff';

const PostDetailsModal = ({isModelMenuOpen ,onModelMenuClose , post,user}) => {
    
  const modalMenuItems = [

   
    
    // {
    //   title: "Turn off commenting",
    //   color: "#F5F5F5",
    //   onClick: () => {},
    // },
    // {
    //   title: "Share to...",
    //   color: "#F5F5F5",
    //   onClick: () => {},
    // },
    // {
    //   title: "Copy link",
    //   color: "#F5F5F5",
    //   onClick: () => {},
    // },
    {
      title: "About this account",
      color: "#F5F5F5",
      onClick: () => {},
    },
    {
      title: "cancel",
      color: "#F5F5F5",
      onClick:()=>{onModelMenuClose()},
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
          <ModalBody p={0} bg={"#262626"} borderRadius={20} overflow={"hidden"} py={2}>
            <Box m={0} p={0}>
            {post.createdBy === user.uid &&   <DeletePost post={post} user={user}/>} 

            {post.createdBy === user.uid &&   <EditPost post={post} user={user}/>} 
            {post.createdBy === user.uid &&   <Box onClick={onModelMenuClose}>
              <HideLikesCount post={post} user={user}/>
              </Box>} 
              {post.createdBy === user.uid &&   <Box onClick={onModelMenuClose}>
              <TurnCommentsOnOrOff post={post} user={user}/>
              </Box>}
              {modalMenuItems.map((item, index) => (
                <Box
                  key={index}
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={"flex"}
                  p={0}
                  borderBottom={'1px Solid #363636'}
                  cursor={"pointer"}
                  onClick={item.onClick}
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
