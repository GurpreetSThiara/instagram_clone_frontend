import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import usePostComment from "../../hooks/usePostComment";
import { CalcTime } from "../../utils/CalcTime";
import usePostStore from "../../store/postStore";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const [reply, setReply] = useState(null);


  const { isCommenting, handlePostComment ,handleCommentReply } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  const replyingTo = usePostStore((s) => s.replyingTo);
  const setReplyingTo = usePostStore((s) => s.setReplyingTo);
  const selectedComment = usePostStore(s=>s.comment);

  

  useEffect(() => {
    console.log(replyingTo);
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    if (replyingTo) {
      setReply(replyingTo);
      commentRef.current.focus();
    }
  }, [replyingTo]);

  const handleSubmitComment = async () => {
    if(replyingTo){
      handleCommentReply( post.id,

        comment,
        selectedComment)
        setReplyingTo(null);

    }else{
      await handlePostComment(post.id, comment);
    
      setComment("");
    }
   
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} justifyContent={'space-between'} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Flex alignItems={"center"} gap={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
        </Flex>
        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <BiBookmark />
          {/* <BsFillBookmarkFill /> */}
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize="12" color={"gray"}>
          Posted {CalcTime(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize="sm" fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {/* {post.comments.length > 0 && (
						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
							View all {post.comments.length} comments
						</Text>
					)} */}
          {/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
          {/* {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null} */}
        </>
      )}

      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              onChange={(e) => {
                if (reply) {
                  setReply(null);
                  setComment(e.target.value);
                } else {
                  setComment(e.target.value);
                }
              }}
              value={reply ? reply + " " + comment : comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
