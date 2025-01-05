import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import {
  renderAvatar,
  renderBubble,
  renderCustomView,
  renderInputToolbar,
  renderMessage,
  renderSend,
} from '../../components/chat/GiftedChat';
import { palette } from '../../constants/Colors';
import { RootRoomState } from '../../features/room/types';
import { useChat } from '../../hooks/useChat';
const Chat = () => {
  const { onSend, senderUser, role } = useChat();
  const { messages } = useSelector((store: RootRoomState) => store.Room);
  const user = senderUser && {
    username:
      senderUser.fName || `${senderUser.firstName} ${senderUser.lastName}`,
    _id: senderUser.userId || senderUser._id,
    role: senderUser.roles,
  };
  const giftedChatListRef: any = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const firstUnreadIndex = messages.findIndex(
        (message: any) => message.unread
      );
      if (firstUnreadIndex !== -1 && giftedChatListRef.current) {
        giftedChatListRef.current.scrollToIndex({
          index: firstUnreadIndex,
          animated: true,
        });
      }
    }, [messages])
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={user}
        alwaysShowSend={!role ? true : false}
        showUserAvatar
        timeTextStyle={{ right: { color: palette.iconGray } }}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderMessage={renderMessage}
        renderAvatarOnTop
        renderUsernameOnMessage
        renderAvatar={renderAvatar}
        renderCustomView={renderCustomView}
        isCustomViewBottom
        listViewProps={{
          ref: giftedChatListRef,
          onScrollToIndexFailed: (info: any) => {
            const offset = info.averageItemLength * info.index;
            giftedChatListRef.current.scrollToOffset({ offset });
            setTimeout(() => {
              giftedChatListRef.current.scrollToIndex({ index: info.index });
            }, 100);
          },
        }}
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
