import { Box, Button, Container, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Appcontext } from '../ContextProvider/AppcontextProvider';


const Login = () => {
 
  let [state,setstate] = useState("login");
  let {cart,setCart,isauth,setisauth,user,setuser}=useContext(Appcontext);

  let [signobj,setsignobj]=useState({
    name:"",
    email:"",
    password:""
  })

  let [loginobj,setloginobj]=useState({
    email:"",
    password:""
  })

  let handleLogin=(e)=>{
    setloginobj({...loginobj,[e.target.name]:e.target.value})
  }
  let handleSignup=(e)=>{
    setsignobj({...signobj,[e.target.name]:e.target.value})
  }
  let doLogin=()=>{
    console.log(loginobj)
  }
  let doSignup=()=>{
    console.log(signobj)
  }

  return (
    <Container>
      <Button onClick={()=>{setstate("signup")}}
       colorScheme='teal' size='xs'
      >Signup</Button>
      <Button onClick={()=>{setstate("login")}}
         colorScheme='teal' size='xs'
      >Login</Button>
      {
        state=="login" && <>
            <Box>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='email' name='email' onChange={handleLogin}/>
              <FormLabel>Password</FormLabel>
              <Input type='password' name='password' onChange={handleLogin}/>
              <Button onClick={()=>{doLogin()}}>Login</Button>
            </FormControl>
            </Box>

        </>
      }
      {
        state=="signup" && <>
          <Box>
          <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type='text' name='name'  onChange={handleSignup}/>
              <FormLabel>Email</FormLabel>
              <Input type='email' name='email' onChange={handleSignup}/>
              <FormLabel>Password</FormLabel>
              <Input type='password' name='password' onChange={handleSignup}/>
              <Button onClick={()=>{doSignup()}}>Signup</Button>
            </FormControl>
          </Box>
        </>
      }
    </Container>
  )
}

export default Login
