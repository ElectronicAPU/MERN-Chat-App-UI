import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  FormControl,
  Input,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import { DB } from "../../constant";
import { toast } from "react-toastify";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
//   console.log(renameLoading);

  const { user, token, selectedChat, setSelectedChat } = useAppContext();

  const handleRemove = async (user2) => {
    if (selectedChat.groupAdmin._id !== user._id && user2._id !== user._id) {
      toast.error("Only Admin can remove someone");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${DB}/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user2._id,
        },
        config
      );

      if (data) {
        user2._id === user._id ? setSelectedChat() : setSelectedChat(data);
        toast.success("User removed successfully");
        fetchMessages()
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
        onClose();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.find((u) => u._id === user1._id)) {
      toast.success("User already added in this group");
      return;
    }
    // Looged in user id ⬇️
    if (selectedChat.groupAdmin._id !== user._id) {
      toast.success("Only Admin can add someone ");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${DB}/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      if (data) {
        toast.success("User added successfully");
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false)
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setLoading(false)
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }
    try {
        setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${DB}/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      if (data) {
        setSelectedChat(data);
        setRenameLoading(false);
        setFetchAgain(!fetchAgain);
        toast.success("Successfully renamed");
        onClose();
      }
    } catch (error) {
      setRenameLoading(false);
      toast.error("Error while updating chat name");
      console.log(error);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${DB}/user?search=${search}`, config);

      if (data) {
        setLoading(false);
        setSearchResult(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <IconButton
        disabled={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                //   admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={() => handleRename()}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              <>
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
