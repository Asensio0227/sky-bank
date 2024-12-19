import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useChat } from '../../hooks/useChat';
// import { GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {
  const { conversation } = useChat();
  return <View style={styles.container}>{/* <GiftedChat /> */}</View>;
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
