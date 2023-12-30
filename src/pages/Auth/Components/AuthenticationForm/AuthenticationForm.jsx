import { Box, Button, Flex, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()
  const [inputs , setInputs] = useState({
    email:"",
    password:"",
    confirmPassword:""
  })

  const handleAuth = ()=>{
    if(inputs.email || inputs.password){
      return;

    }
    navigate('/')
  }
  return (
    <div>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="src/public/logo.png" h={24} cursor={"pointer"} alt="instagram" />
          <Input placeholder="Email" fontSize={14} type="email"  value={inputs.email} onChange={(e)=>{setInputs({...inputs,email:e.target.value})}} />
          <Input placeholder="Password" fontSize={14} type="password"  value={inputs.password} onChange={(e)=>{setInputs({...inputs,password:e.target.value})}} />
          {!isLogin ? (
            <Input placeholder="Confirm Password" fontSize={14} type="password" value={inputs.confirmPassword} onChange={(e)=>{setInputs({...inputs,confirmPassword:e.target.value})}} />
          ) : null}

          <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} onClick={handleAuth} >
            {isLogin?"Log in":"Sign Up"}
          </Button>

          <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"}/>
            <Text mx={1} color={"white"}>OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"}/>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Image src="src/public/google.png" w={5} alt="Google" cursor={"pointer"}/>
            <Text mx="2" color={"blue.500"}>
              Log in with Google
            </Text>
          </Flex>
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box>
            {isLogin?"Don't have an account":"Already have an account"}

          </Box>
          <Box onClick={()=>{setIsLogin(!isLogin)}} color={"blue.500"} cursor={"pointer"}>
            {isLogin?"Sign Up":"Log in"}
          </Box>

        </Flex>
      </Box>
    </div>
  );
};

export default AuthenticationForm;
