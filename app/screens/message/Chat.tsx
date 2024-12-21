import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  renderBubble,
  renderInputToolbar,
  renderSend,
} from '../../components/chat/GiftedChat';
import { palette } from '../../constants/Colors';
import { useChat } from '../../hooks/useChat';

const Chat = () => {
  const { onSend, senderUser, messages, isLoading } = useChat();
  const user = {
    username: senderUser.fName,
    _id: senderUser.userId,
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={user}
        renderAvatar={null}
        alwaysShowSend={isLoading}
        timeTextStyle={{ right: { color: palette.iconGray } }}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
      />
      {Platform.OS === 'android' && (
        <KeyboardAvoidingView
          behavior={Platform.OS !== 'android' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS !== 'android' ? -64 : 0}
        />
      )}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
