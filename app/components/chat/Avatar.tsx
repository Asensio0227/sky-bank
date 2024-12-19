import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Avatar: React.FC<{ size: any; userProfile: any }> = ({
  size,
  userProfile,
}) => {
  return (
    <Image
      source={
        userProfile
          ? { uri: userProfile }
          : require('../../../assets/background/user-icon.png')
      }
      resizeMode='cover'
      style={{ borderRadius: size / 2, height: size, width: size }}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({});
