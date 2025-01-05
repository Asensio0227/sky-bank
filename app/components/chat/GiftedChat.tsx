import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import {
  Avatar,
  Bubble,
  InputToolbar,
  Message,
} from 'react-native-gifted-chat';
import { palette } from '../../constants/Colors';
import Icon from '../Icon';

export const renderBubble = (props: any) => (
  <Bubble
    {...props}
    textStyle={{ right: { color: palette.text } }}
    wrapperStyle={{
      left: { backgroundColor: palette.white },
      right: { backgroundColor: palette.medium },
    }}
    renderCustomView={renderCustomView}
  />
);

export const renderAvatar = (props: any) => <Avatar {...props} />;

// export const renderCustomView = (props: any) => console.log(props.user);

export const renderCustomView = (props: any) => (
  <>
    {props.currentMessage.isRead ? (
      <Icon name='eye' size={30} color={'primary'} backgroundColor='' />
    ) : (
      <Icon name='eye-off' size={30} color={'iconGray'} backgroundColor='' />
    )}
    {props.user.role === 'admin' && (
      <Text>
        from :
        {` ${props.currentMessage?.user.firstName} ${props.currentMessage?.user.lastName}` ||
          props.currentMessage?.user.username}
      </Text>
    )}
  </>
);

export const renderMessage = (props: any) => (
  <Message
    {...props}
    textStyle={{ right: { color: palette.text } }}
    wrapperStyle={{
      left: { backgroundColor: palette.white },
      right: { backgroundColor: palette.medium },
    }}
    renderUser={{
      _id: props.currentMessage.user._id,
      name:
        `${props.currentMessage?.user.firstName} ${props.currentMessage?.user.lastName}` ||
        props.currentMessage?.user.username,
    }}
    user={props.user}
  />
);

export const renderSend = (props: any) => {
  const { text, user, onSend } = props;
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        if (text && onSend) {
          onSend({ text: text.trim(), user, _id: user._Id }, true);
        }
      }}
    >
      <Ionicons
        name='send'
        size={20}
        color={text ? palette.text : palette.iconGray}
      />
    </TouchableOpacity>
  );
};

export const renderInputToolbar = (props: any) =>
  props.user.role !== 'admin' ? (
    <InputToolbar
      {...props}
      containerStyle={{
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 2,
        borderRadius: 20,
        paddingTop: 5,
      }}
    />
  ) : null;
