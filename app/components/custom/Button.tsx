import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { palette } from '../../constants/Colors';

const Button: React.FC<{
  onPress?: () => void;
  title: string;
  style?: any;
}> = ({ onPress, style, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: palette.primaryDark,
    padding: 10,
    color: palette.primary,
    fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: palette.primary,
  },
  title: {
    color: '#222',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: '600',
  },
});
