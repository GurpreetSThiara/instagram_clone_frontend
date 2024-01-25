import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import useFollowUser from '../../hooks/useFollowUser';
import { Link } from 'react-router-dom';
import { CalcTime } from '../../utils/CalcTime';
import useAuthStore from '../../store/authStore';
import { useEffect, useState } from 'react';

const PostHeader = ({ post, creatorProfile }) => {
	const user = useAuthStore(s=>s.user);
	const[follow,setFollow]=useState(false);
	const[showFollow,setShowFolllow]=useState(false);

	
	const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);
	useEffect(()=>{
		console.log(creatorProfile);
		console.log("pppppppppppppppppppppppppppppppprrrrrrrrrrrrrrrrrrrrrrrrr");
		// if(user.uid === creatorProfile.id){
		// 	setShowFolllow(false);
		// }else{
		// 	if(user.following.includes(creatorProfile.uid)){
		// 		setFollow('true');
		// 	}
		// }
	
	},[]);

	

	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
			<Flex alignItems={"center"} gap={2}>
				{creatorProfile ? (
					<Link to={`/${creatorProfile.username}`}>
						<Avatar src={creatorProfile.profilePicUrl} alt='user profile pic' size={"sm"} />
					</Link>
				) : (
					<SkeletonCircle size='10' />
				)}

				<Flex fontSize={12} fontWeight={"bold"} gap='2'>
					{creatorProfile ? (
						<Link to={`/${creatorProfile.username}`}>{creatorProfile.username}</Link>
					) : (
						<Skeleton w={"100px"} h={"10px"} />
					)}

					<Box color={"gray.500"}>• {CalcTime(post.createdAt)}</Box>
				</Flex>
			</Flex>
			<Box cursor={"pointer"}>
				<Button
					size={"xs"}
					bg={"transparent"}
					fontSize={12}
					color={"blue.500"}
					fontWeight={"bold"}
					_hover={{
						color: "white",
					}}
					transition={"0.2s ease-in-out"}
					onClick={handleFollowUser}
					isLoading={isUpdating}
				>
					{creatorProfile && (user.uid !== creatorProfile.uid) && (user.following.includes(creatorProfile.uid)) ? "Unfollow" : "Follow"}
					
				</Button>
			</Box>
		</Flex>
	);
};

export default PostHeader;