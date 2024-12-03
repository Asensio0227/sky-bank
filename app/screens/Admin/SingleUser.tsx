import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback } from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../../components/DropDown';
import UserInfo from '../../components/UserInfo';
import Button from '../../components/custom/Button';
import Loading from '../../components/custom/Loading';
import { userType } from '../../components/form/Form';
import { styles, wrapper } from '../../constants/styles';
import { RootUserState } from '../../features/user/types';
import {
  deleteUser,
  getSingleUser,
  updateUserStatus,
} from '../../features/user/userSlice';

const SingleUser = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user: userType | any = route.params;
  const { _id } = user;
  const dispatch = useDispatch();
  const { userLoading, singleUser } = useSelector(
    (store: RootUserState) => store.allUser
  );
  const date = moment(singleUser.createdAt).format('MM Do, YYYY');
  const { roles, banned, firstName } = singleUser;

  useFocusEffect(
    useCallback(() => {
      const id = _id as string;
      dispatch(getSingleUser(id) as any);
    }, [_id])
  );

  if (userLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      style={[styles.centerView, { overflow: 'scroll', marginBottom: 15 }]}
    >
      <View style={[styles.centerView]}>
        <ScrollView>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}
            >
              <Image
                source={
                  singleUser.avatar
                    ? { uri: singleUser.avatar }
                    : require('../../../assets/background/user-icon.png')
                }
                width={100}
                height={100}
                style={{ borderRadius: 100, width: 200, height: 200 }}
              />
              <View
                style={[
                  wrapper.row,
                  {
                    marginVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <Button
                  title={!singleUser.banned ? 'Ban' : 'unBan'}
                  onPress={() => {
                    Alert.alert(
                      'Confirm Change',
                      `Are you sure you want to ${
                        banned ? 'activate' : 'ban'
                      } user?`,
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () =>
                            dispatch(
                              updateUserStatus({
                                user: {
                                  _id,
                                  newRole: roles,
                                  banned,
                                },
                                actionType: 'ban',
                              }) as any
                            ),
                        },
                      ]
                    );
                  }}
                />
                <DropDown />
                <Button
                  title='delete user'
                  onPress={() => {
                    Alert.alert(
                      'Confirm Change',
                      `Are you sure you want to delete ${firstName}, `,
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            dispatch(deleteUser(_id) as any);
                            navigation.goBack();
                          },
                        },
                      ]
                    );
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: 'baseline' }}>
              <UserInfo name='account' title={singleUser.firstName} />
              <UserInfo name='account' title={singleUser.lastName} />
              <UserInfo name='phone' title={`+263 ${singleUser.phoneNumber}`} />
              <UserInfo name='email' title={singleUser.email} />
              <UserInfo name='account-clock-outline' title={singleUser.dob} />
              <UserInfo name='update' title={date} />
              <UserInfo
                name='format-list-numbered-rtl'
                title={singleUser.ideaNumber}
              />
              <UserInfo
                name='map-marker-alert-outline'
                title={singleUser.physicalAddress}
              />
            </View>
            <Button title='user bank accounts' style={{ margin: 15 }} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default SingleUser;
