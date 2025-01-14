import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../constants/styles';
import {
  getAllAccounts,
  handlePage,
  openModal,
} from '../../features/accounts/accountsSlice';
import { RootAccountState } from '../../features/accounts/types';
import SkeletonContainer from '../custom/Skeleton';
import ListItems from '../list/ListItems';
import ListSeparator from '../list/ListSeparator';
import PageBtnContainer from '../PageBtnContainer';
import ViewModal from '../ViewModal';

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
    Loader,
  } = useSelector((store: RootAccountState) => store.allAccounts);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const openCreateReport = (item: any) => {
    navigation.navigate('reports', { screen: 'createReport', params: item });
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await dispatch(getAllAccounts() as any);
      })();
    }, [page, sort, accountType, search, Loader])
  );

  if (isLoading) return <SkeletonContainer />;

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
              keyExtractor={(item) => item._id}
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
                      dispatch(openModal(item) as any);
                    }}
                  />
                  <ListSeparator />
                  <ViewModal openCreateReport={openCreateReport} />
                </View>
              )}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            />
          </View>
          {numbOfPages > 1 && (
            <PageBtnContainer
              page={page}
              numbOfPages={numbOfPages}
              handlePress={handlePage}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default Account;
