import { Box, Button, Container, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Appcontext } from '../ContextProvider/AppcontextProvider';
import { extendTheme } from "@chakra-ui/react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  let [state, setstate] = useState("login");
  let { cart, setCart, isauth, setisauth, user, setuser } = useContext(Appcontext);
  let navigate = useNavigate();

  const theme = extendTheme({
    colors: {
      customColor: "#FF0000", // Replace with your desired color value
    },
  })

  let [signobj, setsignobj] = useState({
    name: "",
    email: "",
    password: ""
  })

  let [loginobj, setloginobj] = useState({
    email: "",
    password: ""
  })

  let handleLogin = (e) => {
    setloginobj({ ...loginobj, [e.target.name]: e.target.value })
  }
  let handleSignup = (e) => {
    setsignobj({ ...signobj, [e.target.name]: e.target.value })
  }
  let doLogin=async()=>{
    let res=await axios.post("http://localhost:3001/login",loginobj);
    console.log(res);
    if(res.data.msg.includes("success")){
      alert(res.data.msg)
    
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("userName",res.data.userName)
      setisauth(true);
      navigate("/")
    }else{
      alert(res.data.msg)
    }
        }
  let doSignup = async () => {
    console.log(signobj)
    let res = await axios.post('http://localhost:3001/signup', signobj);
    console.log(res.data);
  }

  return (
    <Container>
      <Flex m={'40px auto'} justifyContent={'space-around'} >
        <Button onClick={() => { setstate("signup") }}
          colorScheme='green' size='lg'
        >Signup</Button>
        <Button onClick={() => { setstate("login") }}
          colorScheme='green' size='lg'
        >Login</Button>
      </Flex>
      {
        state == "login" && <>
          <Box boxShadow={'0 0 10px black'} p={'15px 15px'} m={'50px auto'} border={'none'} borderRadius={'10px'}>
            <FormControl>
              <FormLabel mt={'15px'} fontSize={'xl'} color={'rgb(8,65,92)'}>Email</FormLabel>
              <Input type='email' name='email' onChange={handleLogin} size='lg' />
              <FormLabel mt={'15px'} fontSize={'xl'} color={'rgb(8,65,92)'}>Password</FormLabel>
              <Input type='password' name='password' onChange={handleLogin} size='lg' />
              <Button onClick={() => { doLogin() }}
                colorScheme="yellow" color={'white'} size='lg' my={'10px'} alignSelf={'center'}>Login</Button>
            </FormControl>
          </Box>

        </>
      }
      {
        state == "signup" && <>
          <Box boxShadow={'0 0 10px black'} p={'15px 15px'} m={'50px auto'} border={'none'} borderRadius={'10px'}>
            <FormControl >
              <FormLabel mt={'15px'} fontSize={'xl'} color={'rgb(14,36,8)'}>Name</FormLabel>
              <Input type='text' name='name' onChange={handleSignup} size='lg' />
              <FormLabel mt={'15px'} fontSize={'xl'} color={'rgb(14,36,8)'}>Email</FormLabel>
              <Input type='email' name='email' onChange={handleSignup} mt={'15px'} size='lg' />
              <FormLabel mt={'15px'} fontSize={'xl'} color={'rgb(14,36,8)'}>Password</FormLabel>
              <Input type='password' name='password' onChange={handleSignup} size='lg' />
              <Button onClick={() => { doSignup() }}
                colorScheme="yellow" color={'white'} size='lg' m={'10px auto'}>Signup</Button>
            </FormControl>
          </Box>
        </>
      }
    </Container>
  )
}

export default Login
