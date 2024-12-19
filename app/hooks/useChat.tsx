import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userType } from '../components/form/Form';
import { createConversation } from '../features/room/roomSlice';
import { RootRoomState } from '../features/room/types';
import { getToken } from '../utils/storage';
// import 'react-native-get-random-values';
// import {V4 as uuidV4} from "uuid"

export const useChat = () => {
  const { conversation } = useSelector((store: RootRoomState) => store.Room);
  const [senderUser, setSenderUser] = useState<userType | null>(null);
  const route: any = useRoute();
  const { user: userB, image, room } = route.params;
  const dispatch: any = useDispatch();

  console.log(`======{ userB, senderUser }====={ userB, senderUser }`);
  console.log({ userB });
  console.log(`======{ userB, senderUser }====={ userB, senderUser }`);

  useEffect(() => {
    (async () => {
      const user: any = await getToken();
      setSenderUser(user);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (!room) {
          const currentUser: any = senderUser
            ? {
                _id: senderUser._id,
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
            console.log(`=====resp===`);
            console.log(resp);
            console.log(`=====resp===`);
          } catch (error: any) {
            console.log(error || 'Error occurred!');
          }
        }
      })();
    }, [senderUser])
  );

  return { conversation };
};
