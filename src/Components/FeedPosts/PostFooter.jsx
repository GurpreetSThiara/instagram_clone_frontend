import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import useSavedPost from "../../hooks/useSavedPost";
import PostModal from "../PostModal/PostModal";
import { GoChevronLeft } from "react-icons/go";
import Comment from "../Comment/Comment";

const PostFooter = ({ post, isProfilePage, creatorProfile ,isFromFeedPosts ,comments , isMobile }) => {
  const [reply, setReply] = useState(null);


  const { isCommenting, handlePostComment ,handleCommentReply } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { savePost, getSavedPosts, isLoading } = useSavedPost();
  const [isSaved , setIsSaved] = useState(false);
  const [isCommentModalOpen ,setIsCommentModalOpen] = useState(false);
  const onCommentModalOpen = () => setIsCommentModalOpen(true);
  const onCommentModalClose = () => setIsCommentModalOpen(false);
  

  const replyingTo = usePostStore((s) => s.replyingTo); 
  const setReplyingTo = usePostStore((s) => s.setReplyingTo);
  const selectedComment = usePostStore(s=>s.comment);
  const savedPosts = usePostStore(s=>s.savedPosts);

  const handleSavePost = () => {
    console.log("saved posts")
    savePost(authUser.uid,post.id, !isSaved);
    setIsSaved(!isSaved);

  }

  useEffect(()=>{
    if(savedPosts.includes(post.id)){
      isSaved(true);
      console.log('fffffffffffffffffffffffffffffffffffffffffffff')
    }
  },[])

  useEffect(() => {
  
    // getSavedPosts(authUser.uid,false);
    if (replyingTo) {
      console.log("useeffffffffffffeeeeeeeeeeettttttttttttttt")
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
      await handlePostComment(post.id, comment,creatorProfile.uid);
    
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
          onClick={() =>{ 
            if(isFromFeedPosts){
                onOpen()
            }else{
            commentRef.current.focus()}}}
        >
          <CommentLogo />
        </Box>
        </Flex>
        
        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={handleSavePost}
        >
         {!isSaved && <BiBookmark />} 
         {isSaved && <BsFillBookmarkFill />} 
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

      {(
        <>
          <Text fontSize="sm" fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {isMobile && comments?.length>0?<Box onClick={onCommentModalOpen}><Text fontSize={'12px'} color={"gray"}>View all {comments?.length} comments</Text> </Box>:null}
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

      <PostModal comments={comments} isOpen={isOpen} onClose={onClose} post={post} user={authUser} userProfile={creatorProfile} />
      
      <Modal isOpen={isCommentModalOpen} onClose={onCommentModalClose} size={'full'}>
        <ModalOverlay />
        <ModalContent backgroundColor={'black'}>
          <ModalHeader
        h={'24px'}
             backgroundColor={'black'}
              alignItems={"center"}
              display={"flex"}
              justifyContent={"space-between"}
              borderBottom={"1px solid #363636"}
            >
              <Box onClick={onClose}>
                <GoChevronLeft  />
              </Box>
              <Text alignSelf={"center"}>Post</Text>
              <Box></Box>
            </ModalHeader>
     
          <ModalBody>
          {comments?.map((item , index)=>{
            
            return <Box key={index}>
              <Comment comment={item.comment} replies={item}/>
            </Box>
          })}
          </ModalBody>

          <ModalFooter>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PostFooter;
