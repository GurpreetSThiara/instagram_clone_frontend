import { Avatar, Box, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import React from 'react'
import searchResultsStore from '../../store/searchResultsStore';
import { useNavigate } from 'react-router-dom';
import useSearchUsers from '../../hooks/useSearchUsers';

const SearchComponent = () => {
    const searchResults = searchResultsStore((state) => state.profiles);
    const { isLoading, searchUsers } = useSearchUsers();

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
    <Box h={40} p={"0px 16px"}>
      <InputGroup>
        <Input
          backgroundColor={"#262626"}
          border={"null"}
          focusBorderColor="null"
          width={364.2}
          placeholder="Search"
          onChange={(e) => {
            handleSearchQuery(e.target.value);
            console.log(e.target.value);
          }}
        />
        <InputRightElement>
          {/*      
 <IconButton
  backgroundColor={"#C8C8C8"}


   
     size={'xs'}
     _hover={'null'}
    
     borderRadius={50}
    aria-label="Clear input"
    icon={<CloseIcon w={2} h={2} color={"black"} />}
    onClick={() => {
      // Handle clearing the input or any other action
    }}
    variant="ghost"
  />
*/}
        </InputRightElement>
      </InputGroup>

      { (
        searchResults ? (
          searchResults.map((item, index) => (
            <Box
              key={index}
              padding={"8px 24px"}
              cursor={"pointer"}
              _hover={{ backgroundColor: "#121212" }}
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
          <Box mt={12}>
            <Text fontSize={"16px"} fontWeight={"bold"}>
              Recent
            </Text>
          </Box>
        )
      ) }
    </Box>
  </Box>
  )
}

export default SearchComponent
