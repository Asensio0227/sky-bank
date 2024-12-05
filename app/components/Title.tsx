import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { palette } from '../constants/Colors';

const Title: React.FC<{ title: string; style?: any }> = ({ title, style }) => {
  return (
    <Text style={[styles.mainIcon, style]}>
      {title.charAt(0).toUpperCase()}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({
  mainIcon: {
    backgroundColor: palette.primaryDark,
    padding: 20,
    borderRadius: 5,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
