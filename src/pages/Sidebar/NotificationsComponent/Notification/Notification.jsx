import { Box } from "@chakra-ui/react"
import useGetUserProfileById from "../../../../hooks/useGetUserProfileById"

const Notification = ({id,postId}) => {
    const {userProfile} = useGetUserProfileById(id);
    const {}
    
  return (
    <Box>
      This is Notification
    </Box>
  )
}

export default Notification
