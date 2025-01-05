import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/auth/types';
import {
  adminRetrieveMessages,
  createConversation,
  retrieveMessages,
  retrieveUpdateConversation,
  sendMessage,
  updateMessage,
} from '../features/room/roomSlice';

export const useChat = () => {
  const route: any = useRoute();
  const { user: userB, room } = route.params;
  const _id = room?._id;
  const dispatch: any = useDispatch();
  const { user: senderUser } = useSelector((store: RootState) => store.auth);
  const roomId = useRef('');
  const role = senderUser.roles === 'admin';

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (!room) {
          const currentUser: any = senderUser
            ? {
                username:
                  senderUser.fName ||
                  `${senderUser.firstName} ${senderUser.lastName}`,
                _id: senderUser.userId || senderUser._id,
                email: senderUser.email,
                expoToken: senderUser.expoToken,
                role: senderUser.roles,
              }
            : null;
          if (senderUser?.avatar) {
            currentUser.avatar = senderUser?.avatar;
          }
          const userBData: {
            _id?: string;
            username?: string;
            email?: string;
            expoToken?: string;
            avatar?: string;
            role?: string;
          } = {
            _id: userB._id,
            username: `${userB.firstName} ${userB.lastName}`,
            email: userB.email,
            expoToken: userB.expoToken,
            role: userB.roles,
          };
          if (userB.avatar) {
            userBData.avatar = userB.avatar;
          }
          const roomData = {
            participants: [currentUser, userBData],
            participantsArray: [senderUser?.email, userB.email],
          };
          try {
            const resp = await dispatch(createConversation(roomData));
            roomId.current = resp.payload.room._id;
          } catch (error: any) {
            console.log(error || 'Error occurred!');
          }
        }
      })();
    }, [senderUser, userB])
  );

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          if (room && room.user && role) {
            const user: any = { userId: room?.user._id };
            await dispatch(adminRetrieveMessages(user));
            console.log('admin');
          }
        } catch (error: any) {
          console.log(`Error occurred,${error} role`);
        }
      };
      fetchData();

      const intervalId = setInterval(fetchData, 5000);

      return () => clearInterval(intervalId);
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const id = _id || roomId.current;
          const resp = await dispatch(retrieveMessages(id));
          const messages = resp.payload.messages;
          let lastMessage = messages.length > 0 && messages.slice(0)[0];
          const data = { id, lastMessage };
          id &&
            messages.length > 0 &&
            (await dispatch(retrieveUpdateConversation(data)));
          id && (await dispatch(updateMessage(id)));
        } catch (error) {
          console.error('Failed to retrieve messages:', error);
        }
      };
      fetchData();

      const intervalId = setInterval(fetchData, 5000);

      return () => clearInterval(intervalId);
    }, [dispatch, roomId, _id])
  );

  const onSend = async (messages: any = []) => {
    try {
      const id = _id || roomId.current;
      const writes = messages.map((msg: any) =>
        dispatch(sendMessage({ msg, id }))
      );
      let lastMessage = messages.length > 0 && messages.slice(0)[0];
      const data: any = { id, lastMessage };
      writes.push(dispatch(retrieveUpdateConversation(data)));
      writes.push(dispatch(retrieveMessages(id)));
      await Promise.all(writes);
    } catch (error) {
      console.error('Failed to retrieve messages:', error);
    }
  };

  return { onSend, senderUser, role };
};
