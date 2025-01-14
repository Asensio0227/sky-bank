import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactPerson from '../../components/chat/ContactPerson';
import FloatingIcon from '../../components/chat/FloatingIcon';
import PageBtnContainer from '../../components/PageBtnContainer';
import SearchConversation from '../../components/rooms/SearchConversation';
import { palette } from '../../constants/Colors';
import { RootState } from '../../features/auth/types';
import {
  adminRetrieveRoom,
  retrieveUserConversation,
  setRoomPage,
} from '../../features/room/roomSlice';
import { RootRoomState } from '../../features/room/types';

const Help = () => {
  const { conversations, adminRoom, numbOfPages, page } = useSelector(
    (store: RootRoomState) => store.Room
  );
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch: any = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const rooms = user.roles === 'admin' ? adminRoom : conversations;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          user.roles === 'admin'
            ? await dispatch(adminRetrieveRoom())
            : await dispatch(retrieveUserConversation());
        } catch (error: any) {
          console.log(error || 'Error occurred!');
        }
      };

      fetchData();

      const intervalId = setInterval(fetchData, 5000);

      return () => clearInterval(intervalId);
    }, [dispatch, user])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      user.roles === 'admin'
        ? await dispatch(adminRetrieveRoom())
        : await dispatch(retrieveUserConversation());
      setRefreshing(false);
    } catch (error: any) {
      console.log(error || 'Error occurred!');
    }
  };

  if (rooms.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No conversation found.</Text>
        <FloatingIcon />
      </View>
    );
  }

  return (
    <>
      {user.roles === 'admin' && (
        <>
          <SearchConversation />
          {numbOfPages > 1 && (
            <PageBtnContainer
              page={page}
              numbOfPages={1089}
              handlePress={setRoomPage}
            />
          )}
        </>
      )}
      <View style={styles.section}>
        <FlatList
          data={rooms}
          keyExtractor={(item) => item && item._id}
          renderItem={({ item }) => (
            <ContactPerson
              type='chats'
              description={item.lastMessage?.text}
              style={{ marginTop: 7 }}
              room={item}
              time={item.lastMessage}
              user={item.userB}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          scrollEnabled
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FloatingIcon />
    </>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flex: 1,
    padding: 5,
    paddingRight: 10,
  },
  text: {
    fontSize: 25,
    textDecorationLine: 'underline',
    color: palette.gray,
  },
});
