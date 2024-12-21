import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/auth/types';
import {
  createConversation,
  retrieveMessages,
  retrieveUpdateConversation,
  sendMessage,
} from '../features/room/roomSlice';
import { RootRoomState } from '../features/room/types';
// import 'react-native-get-random-values';
// import {V4 as uuidV4} from "uuid"

export const useChat = () => {
  const route: any = useRoute();
  const { user: userB, image, room } = route.params;
  const dispatch: any = useDispatch();
  const { user: senderUser } = useSelector((store: RootState) => store.auth);
  const roomId = useRef('');
  const { messages } = useSelector((store: RootRoomState) => store.Room);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (!room) {
          const currentUser: any = senderUser
            ? {
                _id: senderUser.userId,
                username: `${senderUser.firstName} ${senderUser.lastName}`,
                email: senderUser.email,
                expoToken: senderUser.expoToken,
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
          } = {
            _id: userB._id,
            username: `${userB.firstName} ${userB.lastName}`,
            email: userB.email,
            expoToken: userB.expoToken,
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
    }, [senderUser])
  );

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          await dispatch(retrieveMessages());
        } catch (error) {
          console.error('Failed to retrieve messages:', error);
        }
      };

      fetchData();
    }, [dispatch])
  );

  const onSend = async (messages: any = []) => {
    const id = room._id || roomId.current;
    const writes = messages.map((msg: any) =>
      dispatch(sendMessage({ msg, Id: id }))
    );
    const lastMessage = messages[messages.length - 1];
    const data: any = { id: id, lastMessage };
    writes.push(dispatch(retrieveUpdateConversation(data)));
    writes.push(dispatch(retrieveMessages()));
    await Promise.all(writes);
  };

  return { onSend, senderUser, messages };
};
