import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const GoogleAuth = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
    <Image src="src/public/google.png" w={5} alt="Google" cursor={"pointer"}/>
    <Text mx="2" color={"blue.500"}>
      Log in with Google
    </Text>
  </Flex>
  )
}

export default GoogleAuth
