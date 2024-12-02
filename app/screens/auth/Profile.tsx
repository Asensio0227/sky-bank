import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/custom/Button';
import ModalScreen from '../../components/ModalScreen';
import { styles } from '../../constants/styles';
import {
  loadUser,
  toggleModal,
  togglePasswordModal,
} from '../../features/auth/authSlice';
import { RootState } from '../../features/auth/types';
const { height } = Dimensions.get('window');
const oneThirdHeight = height / 3;

const Profile = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const fullName = user.firstName && `${user.firstName}, ${user.lastName}`;

  useEffect(() => {
    (async () => {
      await dispatch(loadUser() as any);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          user.avatar
            ? {
                uri: user.avatar,
              }
            : require('../../../assets/background/bckg.jpg')
        }
        blurRadius={5}
        resizeMode='cover'
        style={styles.bcgImage}
        height={oneThirdHeight}
      >
        <Image
          source={
            user.avatar
              ? { uri: user.avatar }
              : require('../../../assets/background/user-icon.png')
          }
          style={styles.img}
        />
        <Button
          title='edit profile'
          style={{ position: 'absolute', bottom: 5, right: 2 }}
          onPress={() => dispatch(toggleModal())}
        />
        <ModalScreen />
      </ImageBackground>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 20 }}
      >
        <View style={styles.split}>
          <Text style={styles.text}>Name : </Text>
          <Text style={styles.name}>
            {fullName ? fullName : user.fName?.toUpperCase()}
          </Text>
        </View>
        {user.email && (
          <View style={styles.split}>
            <Text style={styles.text}>Email : </Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        )}
        {user.dob && (
          <View style={styles.split}>
            <Text style={styles.text}>Date of birth : </Text>
            <Text style={styles.email}>{user.dob}</Text>
          </View>
        )}
        {user.gender && (
          <View style={styles.split}>
            <Text style={styles.text}>Gender: </Text>
            <Text style={styles.email}>{user.gender}</Text>
          </View>
        )}
        {user.phoneNumber && (
          <View style={styles.split}>
            <Text style={styles.text}>Contact : </Text>
            <Text style={styles.contact}>+263 {user.phoneNumber}</Text>
          </View>
        )}
        {user.physicalAddress && (
          <View style={[styles.split, { flexWrap: 'wrap' }]}>
            <Text style={styles.text}>Address : </Text>
            <Text style={[styles.address]}>
              {user.physicalAddress} johannesburg south africa
            </Text>
          </View>
        )}
        <Button
          title='change password'
          onPress={() => dispatch(togglePasswordModal())}
          style={{ marginVertical: 10, width: '90%', borderWidth: 0 }}
        />
      </ScrollView>
    </View>
  );
};

export default Profile;
