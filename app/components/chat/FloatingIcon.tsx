import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon';

const FloatingIcon = () => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('contact')}
    >
      <Icon
        name='android-messages'
        size={40}
        color='white'
        backgroundColor='#4ecdc4'
      />
    </TouchableOpacity>
  );
};

export default FloatingIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#4ecdc4',
    bottom: 20,
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 40,
  },
});
