/* eslint-disable react/prop-types */
import { Avatar, Box, Button, CircularProgress, Divider, Flex, Progress, Skeleton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { CalcTime } from "../../utils/CalcTime";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";

const Comment = ({ comment , replies }) => {
  const { isLoading, userProfile, setUserProfile } = useGetUserProfileById(
    comment.createdBy
  );
  const [like , setLike] = useState(false);
  const { handleUpdateComment , handleGetReplies } = usePostComment();
  const user = useAuthStore(s=>s.user);
  const setIsReplyingComment = usePostStore(s=>s.setIsReplyingComment);
  const setReplyingTo = usePostStore(s=>s.setReplyingTo);
  const setComment = usePostStore(s=>s.setComment);
  const [replyTapped, setReplyTapped] = useState(false); 
  

  

  const handleLikeComment = ()=>{
    if(!like){
    console.log(user)
    console.log("uuuuuuuuuuuuu")
    setLike(!like);
    if(!comment.likes){
    const newComment ={
        ...comment,
        "likes":1,
        "likedBy": [user.uid],
    }
    console.log('ifffffffffff');
    console.log(newComment);
    handleUpdateComment(comment.createdBy,comment.postId,comment.id,newComment,comment);
}
    else{
        const newComment ={
            ...comment,
            "likes":comment.likes+1,
            "likedBy": [...(comment.likedBy || []), user.uid],
        }
        console.log(newComment)
         handleUpdateComment(comment.createdBy,comment.postId,comment.id,newComment,comment);

     //   handleUpdateComment(comment.postId,newComment);
  
    }}else{
        setLike(!like);
        if(comment.likedBy){

            if(comment.likedBy.includes(user.uid)){
               
                const newComment ={
                    ...comment,
                    "likes":comment.likes-1,
                    "likedBy":  comment.likedBy.filter((id) => id !== user.uid),
                } 
                handleUpdateComment(comment.createdBy,comment.postId,comment.id,newComment,comment);

            }
        }


    }
  }

  const handleFetchReplies =()=>{
    setReplyTapped(true);
    handleGetReplies(comment.postId,comment.id);
  }
  useEffect(() => {
    if (comment.likedBy && comment.likedBy.includes(user.uid)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  if (isLoading) {
    return (
      // Display loading skeleton while data is being fetched
      <Flex gap={4} alignSelf={"start"} py={1.5}>
        <Skeleton circle size={"sm"} />
        <Flex direction={"column"} gap={1.5}>
          <Skeleton width="200px" height="16px" />
          <Skeleton width="160px" height="12px" />
        </Flex>
      </Flex>
    );
  }

  return (
  <Box>
      <Flex
      w={"full"}
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      py={1.5}
    >
      <Box display={"flex"} gap={2}>
        <Avatar
          src={userProfile.profilePicUrl}
          name={userProfile.username}
          size={"sm"}
        />
        <Flex direction={"column"}>
          <Flex gap={2}>
            <Text fontWeight={"bold"} fontSize={14}>
              {userProfile.username}
            </Text>
            <Text fontSize={14}>{comment.comment}</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontSize={12} color={"gray"}>
              {CalcTime(comment.createdAt)}
            </Text>
            <Box backgroundColor={"transparent"} cursor={'pointer'}>
              {" "}
              <Text fontSize={12} color={"gray"}>
               {comment.likes} Like
              </Text>
            </Box>
            <Box backgroundColor={"transparent"}  cursor={'pointer'} onClick={()=>{
                setComment(comment); 
                setReplyingTo('@'+userProfile.username);
                setIsReplyingComment(true);

            }}>
              {" "}
              <Text fontSize={12} color={"gray"} >
                Reply
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box onClick={handleLikeComment}>
        {like?<BsHeartFill color="red" />:<BsHeart/>}
      </Box>
    </Flex>
    <Box pl={4}>
 {!replyTapped?  comment.numberOfReplies != 0 ?

      <Flex alignItems={'center'} gap={3} cursor={'pointer'} onClick={handleFetchReplies}>
           <Divider w={30}  color={'white'}/>
           <Text fontSize={12}>
       view replies( {comment.numberOfReplies})
      </Text>
      </Flex>:null
      :
      replies.length<1?<CircularProgress/>:<Text>{replies.repliedComment}</Text>}
    </Box>
  </Box>
  );
};

export default Comment;
