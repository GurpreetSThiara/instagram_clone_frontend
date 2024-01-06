import { Box, Button, Flex, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleAuth from "./GoogleAuth";


const AuthenticationForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [inputs , setInputs] = useState({
    email:"",
    password:"",
    confirmPassword:""
  })

  return (
    <div>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          

           {isLogin?<Login/>:<SignUp/>}

          <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"}/>
            <Text mx={1} color={"white"}>OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"}/>
          </Flex>
       <GoogleAuth prefix={isLogin?"Log in":"Sign up"}/>
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
