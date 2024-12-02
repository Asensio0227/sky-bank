import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { wrapper } from '../constants/styles';
import { userType } from './form/Form';

const User: React.FC<{ user: userType }> = ({ user }) => {
  const { lastName, firstName, phoneNumber, dob, avatar } = user;
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('user', user);
        }}
        style={[wrapper.container, wrapper.content]}
      >
        <View
          style={[
            wrapper.aside,
            wrapper.row,
            { justifyContent: 'space-between', padding: 5 },
          ]}
        >
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require('../../assets/background/user-icon.png')
            }
            resizeMode='cover'
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <View style={[wrapper.aside]}>
            <Text style={wrapper.title}>{`${firstName}, ${lastName}`}</Text>
            <Text> +263{phoneNumber}</Text>
            <Text> {dob}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default User;

const styles = StyleSheet.create({});
