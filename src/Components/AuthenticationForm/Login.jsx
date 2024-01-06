import { Alert, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin'

const Login = () => {
    const [inputs , setInputs] = useState({
        email:"",
        password:"",
     
      })
      const {loading , error , login}= useLogin();
  return (
    <>
      <Input size={"sm"} placeholder="Email" fontSize={14} type="email"  value={inputs.email} onChange={(e)=>{setInputs({...inputs,email:e.target.value})}} />
          <Input size={"sm"} placeholder="Password" fontSize={14} type="password"  value={inputs.password} onChange={(e)=>{setInputs({...inputs,password:e.target.value})}} />
          {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
            {error.message}
        </Alert>
     )}
          <Button onClick={()=>login(inputs)} w={"full"} colorScheme="blue" size={"sm"} fontSize={14}  >
            {"Log in"}
          </Button>
    </>
  )
}

export default Login
