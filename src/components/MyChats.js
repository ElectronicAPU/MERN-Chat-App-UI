import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DB } from "../constant";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";

const MyChats = () => {
  const {
    token,
    setToken,
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = useAppContext();
  console.log("chats", chats);

  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${DB}/chat`, config);

      setChats(data);
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, []);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          fontSize={{ base: "28px", md: "12px", lg: "15px" }}
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          fontWeight={600}
        >
          My Chats
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "12px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {chats ? (
            <Stack overflowY="scroll">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && chat.latestMessage.sender && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
