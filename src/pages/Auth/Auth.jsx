import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react"
import AuthenticationForm from "./Components/AuthenticationForm/AuthenticationForm"


const Auth = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
        <Container maxW={"container.md"}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={1}>
            <Box display={{base:"none", md:"block"}}>
                <Image src='src/public/auth.png'  alt="image"/>

            </Box>

            <VStack spacing={4} align={"stretch"}>
                <AuthenticationForm/>
                <Box textAlign={"center"}>Get the app</Box>
                <Flex gap={5} justifyContent={"center"}>
                    <Image src="src/public/playstore.png"  h={"10"} alt="playstore"/>
                    <Image src="src/public/microsoft.png"  h={"10"} alt="microsoft"/>

                </Flex>
            </VStack>
            </Flex>
    

          
        </Container>
      
    </Flex>
  )
}

export default Auth
