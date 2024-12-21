import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactPerson from '../../components/chat/ContactPerson';
import FloatingIcon from '../../components/chat/FloatingIcon';
import Loading from '../../components/custom/Loading';
import { palette } from '../../constants/Colors';
import { retrieveUserConversation } from '../../features/room/roomSlice';
import { RootRoomState } from '../../features/room/types';

const Help = () => {
  const { isLoading, conversations } = useSelector(
    (store: RootRoomState) => store.Room
  );
  const dispatch: any = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await dispatch(retrieveUserConversation());
        } catch (error: any) {
          console.log(error || 'Error occurred!');
        }
      })();
    }, [])
  );

  if (isLoading) return <Loading />;

  if (conversations.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No conversation found.</Text>
        <FloatingIcon />
      </View>
    );
  }

  return (
    <>
      <View style={styles.section}>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item && item._id.toString()}
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
