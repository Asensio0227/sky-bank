import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../../constants/Colors';
import { logout } from '../../features/auth/authSlice';
import { RootState } from '../../features/auth/types';

const CustomDrawer: React.FC = (props) => {
  const navigation: any = useNavigation();
  const { user, isLoading } = useSelector((store: RootState) => store.auth);
  const dispatch: any = useDispatch();

  async function logoutUser() {
    await dispatch(logout());
    navigation.navigate('login');
  }

  if (isLoading) {
    return <ActivityIndicator size={'large'} animating={isLoading} />;
  }

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View>
        <View style={{ backgroundColor: palette.secondaryDark, padding: 15 }}>
          {/* User Row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={{
                backgroundColor: palette.secondaryLight,
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
              source={
                user && user.avatar
                  ? { uri: user.avatar }
                  : require('../../../assets/background/user-icon.png')
              }
            />
            <View>
              <Text style={{ color: 'white', fontSize: 24 }}>
                {user?.fName ? user.fName?.toUpperCase() : user.firstName}
              </Text>
            </View>
          </View>

          {/* Messages Row */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: palette.gray,
              borderTopWidth: 1,
              borderTopColor: palette.gray,
              paddingVertical: 5,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate('help');
              }}
            >
              <Text style={{ color: '#dddddd', paddingVertical: 5 }}>
                Messages
              </Text>
            </Pressable>
          </View>

          {/* Do more */}
          <Pressable
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
            <Text style={{ color: '#dddddd', paddingVertical: 5 }}>
              Profile
            </Text>
          </Pressable>
        </View>

        <DrawerItemList {...props} />

        <Pressable onPress={logoutUser}>
          <Text
            style={{
              padding: 5,
              paddingLeft: 20,
              color: palette.primaryDark,
              fontWeight: '900',
            }}
          >
            Logout
          </Text>
        </Pressable>
      </Animated.View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
