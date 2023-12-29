import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { DB } from "../../constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async () => {
    console.log("hello");
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      if (token) {
        const { data } = await axios.post(`${DB}/user/login`, {
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          navigate("/chats");
          console.log(data);
        } else {
          console.log("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              value={password}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button onClick={() => setShow(!show)} h="1.7rem" size="sm">
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Login
        </Button>
        <Button
          colorScheme="red"
          width="100%"
          style={{ marginTop: 5 }}
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </>
  );
};

export default Login;
