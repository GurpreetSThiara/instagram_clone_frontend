import { Avatar, Box, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';


const MessagingComponent = () => {
   


    const navigate = useNavigate()

    const handleSearchQuery = (e) => {
        if (e !== null && e !== undefined && e !== "") {
          searchUsers(e);
        }
      };

  return (
    <Box
    mx={"16px"}
    zIndex={2}
    w={397}
    h={"100vh"}
    backgroundColor={"#000000"}
    borderRight={"1px solid #262626"}
    borderRightRadius={10}
    overflowY="auto"
  >
    <Box p={"12px 14px 36px 24px"}>
      <Text fontWeight={"bold"} fontSize={"24px"}>
        Search
      </Text>
    </Box>
   
  </Box>
  )
}

export default MessagingComponent
