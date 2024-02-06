import { Box, Button, useDisclosure } from '@chakra-ui/react'
import EditPostModal from '../EditPostModal/EditPostModal';

const EditPost = ({post , user}) => {
    const {isOpen , onOpen , onClose} = useDisclosure();

 
 
  return (

         <Box
                 
                  alignItems={"center"}
                  justifyContent={"center"}
                  display={"flex"}
                  p={0}
                  borderBottom={'1px Solid #212121'}
                  cursor={"pointer"}
                  onClick={onOpen}
                >
                  <Button
                  m={0}
                  p={0}
                    bg={"transparent"}
                    _hover={{ bg: "transparent" }}
                    cursor={"pointer"}
                   
                  >
                    Edit
                  </Button>
                  <EditPostModal isOpen={isOpen} onClose={onClose} post={post} user={user}/>
                </Box>
      

  )
}

export default EditPost
