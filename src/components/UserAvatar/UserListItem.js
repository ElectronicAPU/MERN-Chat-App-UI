import React from "react";
import { useAppContext } from "../../Context/AppContext";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {


  return (
    <>
      <Box onClick={handleFunction} cursor="pointer" display="flex" py="10px" gap="10px">
        <Avatar src={user.pic} name={user.name} />
        <Box>
          <Text fontWeight={700}>{user.name}</Text>
          <Text fontSize={12} display="flex" gap="10px">
            <Text style={{ fontWeight: 600 }}>Email:</Text> {user.email}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;
