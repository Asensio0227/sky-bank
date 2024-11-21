import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Screen: React.FC<{
  children: React.ReactNode;
  onLayout?: () => void;
  style?: any;
}> = ({ children, onLayout, style }) => {
  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: palette.secondary,
  },
});

export default Screen;
