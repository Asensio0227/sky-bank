import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const TextLink: React.FC<{ text: string; linkText: string; link: any }> = ({
  text,
  linkText,
  link,
}) => {
  const navigation = useNavigation();
  // const router=useRouter()

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formText}>{text}</Text>
      <Pressable
        onPress={() => {
          navigation.navigate(link);
        }}
      >
        <Text style={styles.link}>{linkText}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  formText: {
    marginRight: 5,
    textAlign: 'center',
  },
  link: {
    color: Colors.colors.primaryDark,
    textDecorationLine: 'underline',
  },
});

export default TextLink;
