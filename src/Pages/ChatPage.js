import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const { token } = useAppContext();

  return (
    <>
      <div style={{ width: "100%" }}>
        {token && <SideDrawer />}
        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          {token && <MyChats />}
          {token && <ChatBox />}
        </Box>
      </div>
    </>
  );
};

export default ChatPage;
