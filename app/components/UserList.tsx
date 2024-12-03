import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../constants/Colors';
import { styles } from '../constants/styles';
import { RootUserState } from '../features/user/types';
import { getAllUsers } from '../features/user/userSlice';
import PageBtnContainer from './PageBtnContainer';
import User from './User';
import Loading from './custom/Loading';

const UserList = () => {
  const {
    totalUsers,
    users,
    numOfPages,
    isLoading,
    page,
    search,
    sort,
    roles,
    banned,
  } = useSelector((store: RootUserState) => store.allUser);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await dispatch(getAllUsers() as any);
      })();
    }, [page, search, sort, roles, banned])
  );

  if (isLoading) return <Loading />;

  if (users.length === 0) {
    return (
      <View style={[styles.container, { marginTop: 25 }]}>
        <Text style={{ textTransform: 'none' }}>No users to display...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={[styles.container, { marginTop: 25 }]}>
          <Text style={{ fontWeight: '700' }}>
            {totalUsers} user{users.length > 1 && 's'} found
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginVertical: 20,
              padding: 15,
            }}
          >
            <FlatList
              data={users}
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    boxShadow: '0 0 0 5px rgba(0, 0, 0, 0.1)',
                    borderRadius: 5,
                    padding: 5,
                    marginBottom: 15,
                    marginLeft: 10,
                    marginRight: 10,
                    backgroundColor: palette.secondaryLight,
                    overflow: 'scroll',
                  }}
                >
                  <User user={item} />
                </View>
              )}
              scrollEnabled={true}
            />
          </View>
          {numOfPages > 1 && <PageBtnContainer />}
        </View>
      </ScrollView>
    </>
  );
};

export default UserList;
