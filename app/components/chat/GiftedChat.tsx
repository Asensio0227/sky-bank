import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Bubble, InputToolbar } from 'react-native-gifted-chat';
import { palette } from '../../constants/Colors';

export const renderBubble = (props: any) => (
  <Bubble
    {...props}
    textStyle={{ right: { color: palette.text } }}
    wrapperStyle={{
      left: { backgroundColor: palette.white },
      right: { backgroundColor: palette.medium },
    }}
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
          onSend({ text: text.trim(), user, _id: user._Id });
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

export const renderInputToolbar = (props: any) => (
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
);
