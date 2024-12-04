import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../constants/styles';
import {
  getAllAccounts,
  openModal,
} from '../../features/accounts/accountsSlice';
import { RootAccountState } from '../../features/accounts/types';
import Loading from '../custom/Loading';
import ListItems from '../list/ListItems';
import ListSeparator from '../list/ListSeparator';
import ViewModal from '../ViewModal';
import PageBtnContainer from './PageBtnContainer';

const Account = () => {
  const {
    accounts,
    isLoading,
    page,
    sort,
    accountType,
    search,
    totalAccount,
    numbOfPages,
  } = useSelector((store: RootAccountState) => store.allAccounts);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await dispatch(getAllAccounts() as any);
      })();
    }, [page, sort, accountType, search])
  );

  if (isLoading) return <Loading />;

  if (accounts.length === 0) {
    return (
      <View style={[styles.container, { marginTop: 25 }]}>
        <Text style={{ textTransform: 'none' }}>No accounts to display...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ flex: 1, overflow: 'scroll' }}>
        <View
          style={{
            flex: 1,
            marginTop: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontWeight: '700' }}>
            {totalAccount} account{accounts.length > 1 && 's'} found
          </Text>
          <View
            style={{
              flex: 1,
              width: '90%',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              marginVertical: 20,
              padding: 15,
            }}
          >
            <FlatList
              data={accounts}
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    borderRadius: 5,
                    padding: 5,
                    marginBottom: 15,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <ListItems
                    title={`${item.userId.firstName},${item.userId.lastName}`}
                    subTitle={`${item.accounts.length} accounts`}
                    image={
                      item.userId && item.userId.avatar
                        ? { uri: item.userId.avatar }
                        : require('../../../assets/background/user-icon.png')
                    }
                    onPress={() => {
                      // setModalVisible(true);
                      dispatch(openModal(item) as any);
                      console.log(`===modal==`);
                      console.log(item);
                      console.log(`===modal==`);
                    }}
                  />
                  <ListSeparator />
                  <ViewModal
                  // items={item}
                  // modalVisible={modalVisible}
                  // handleModal={() => setModalVisible(!modalVisible)}
                  />
                </View>
              )}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            />
          </View>
          {numbOfPages > 1 && <PageBtnContainer />}
        </View>
      </View>
    </>
  );
};

export default Account;
