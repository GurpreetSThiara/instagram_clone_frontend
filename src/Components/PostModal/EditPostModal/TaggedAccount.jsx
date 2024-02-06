import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import useGetUserProfileById from "../../../hooks/useGetUserProfileById";
import useEditpostStore from "../../../store/EditPostStore";
import { BsXLg } from "react-icons/bs";

const TaggedAccount = ({userId}) => {
    const {userProfile} = useGetUserProfileById(userId);
    const removeTag = useEditpostStore(s=>s.removeTag);

    if(!userProfile) return <></>
  return (
    <Box

    padding={"8px 24px"}
    cursor={"pointer"}
    _hover={{ backgroundColor: "#121212" }}
    onClick={() => {}}
  >
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex gap={4}>
        <Avatar src={userProfile.profilePicUrl} />
        <Box>
          <Text color={"#F5F5F5"} fontWeight={"bold"}>
            {userProfile.username}
          </Text>
          <Flex gap={2}>
            <Text color={"#A8A8A8"} fontWeight={400}>
              {userProfile.fullName}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box
        onClick={() => {
            removeTag(userProfile);
        }}
      >
        <BsXLg />
      </Box>
    </Flex>
  </Box>
  )
}

export default TaggedAccount
