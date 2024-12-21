import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ChatHeader = (props) => {
  const route: any = useRoute();
  console.log(route);
  console.log(props);
  return (
    <View style={styles.container}>
      <View>{/* <Avatar/> */}</View>
      <View style={styles.section}>
        {/* <Text style={styles.text}>{}</Text> */}
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    right: 35,
  },
  section: {
    alignItems: 'center',
    marginRight: 25,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  text: {
    fontSize: 18,
  },
});
