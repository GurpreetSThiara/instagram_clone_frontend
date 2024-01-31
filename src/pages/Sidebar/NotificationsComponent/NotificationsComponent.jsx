import { Avatar, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useSearchUsers from '../../../hooks/useSearchUsers';
import useNotificationStore from '../../../store/notificationsStore';
import Notification from './Notification/Notification';

const NotificationsComponent = () => {
    const { isLoading, searchUsers } = useSearchUsers();
    const notifications = useNotificationStore(s=>s.notifications)

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
        Notifications
      </Text>
    </Box>
    <Box h={40} p={"0px 16px"}>
        {notifications.length !== 0 && notifications.map((notification , index)=>{
            return <Box key={index}>
              <Notification id={notification.likedBy} postId={notification.postId}/>
                
            </Box>
        })}
       
    </Box>
  </Box>
  )
}

export default NotificationsComponent
