import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../constants/Colors';
import { styles } from '../constants/styles';
import { closeModal, deleteAccount } from '../features/accounts/accountsSlice';
import { RootAccountState } from '../features/accounts/types';
import Button from './custom/Button';
import SkeletonContainer from './custom/Skeleton';
import Icon from './Icon';
import ListItems from './list/ListItems';

const ViewModal: React.FC<{ openCreateReport: (item: any) => void }> = ({
  openCreateReport,
}) => {
  const { singleAccount, modalVisible, isLoading } = useSelector(
    (store: RootAccountState) => store.allAccounts
  );
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const handleModal = () => {
    dispatch(closeModal() as any);
  };

  const deleteUserAccount = (id: string) => {
    try {
      Alert.alert('Confirm ', 'Are you sure you want to delete this account?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(deleteAccount(id) as any);
          },
        },
      ]);
    } catch (error: any) {
      console.log('Error deleting user account', error);
    }
  };

  const editUserAccount = (data: any) => {
    try {
      Alert.alert('Confirm ', 'Are you sure you want to edit this account?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('create', data);
            handleModal();
          },
        },
      ]);
    } catch (error: any) {
      console.log('Error deleting user account', error);
    }
  };

  if (isLoading) return <SkeletonContainer />;

  return (
    <View style={[styles.centerView, { overflow: 'hidden' }]}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <View
          style={[
            styles.centerView,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <ScrollView style={styles.modalView}>
            <Pressable style={[styles.buttonClose]} onPress={handleModal}>
              <MaterialCommunityIcons name='window-close' size={20} />
            </Pressable>
            <View>
              <Text style={styles.text}>Account Information:</Text>
              <View style={wrappers.main}>
                <Text style={wrappers.mainIcon}>
                  {singleAccount?.accounts[0].accountHolderName
                    .charAt(0)
                    .toUpperCase()}
                </Text>
                <View style={wrappers.info}>
                  <Text style={wrappers.title}>
                    Account Holder Name:{' '}
                    {singleAccount?.accounts[0].accountHolderName}
                  </Text>
                  <Text style={wrappers.subTitle}>
                    ID Number: {singleAccount?.userId.ideaNumber}
                  </Text>
                  <Text style={wrappers.subTitle}>
                    Contact: +263 {singleAccount?.userId.phoneNumber}
                  </Text>
                </View>
              </View>
              <View style={wrappers.content}>
                {singleAccount?.accounts.map((item: any) => {
                  return (
                    <View
                      key={item._id}
                      style={{
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        position: 'relative',
                      }}
                    >
                      <View style={wrappers.contentCenter}>
                        <Text style={wrappers.text}>
                          Account Number: {item.accountNumber}
                        </Text>
                        <Text style={wrappers.text}>
                          Branch Code: {item.branchCode}
                        </Text>
                        <Text style={wrappers.text}>
                          Account type: {item.accountType}
                        </Text>
                        <Text style={wrappers.text}>
                          Balance: {item.balance}
                        </Text>
                      </View>
                      <Text style={wrappers.text}>transactions history : </Text>
                      <View style={wrappers.btnContainer}>
                        <Button
                          title='Transfer'
                          onPress={() => alert('This is a button!')}
                        />
                        <Button
                          style={wrappers.button}
                          title='Deposit'
                          onPress={() => alert('This is a button!')}
                        />
                        <Button
                          title='withDrawal'
                          onPress={() => alert('This is a button!')}
                        />
                      </View>
                      <TouchableOpacity
                        style={wrappers.editBtn}
                        onPress={() => editUserAccount(item)}
                      >
                        <Icon
                          color='edit'
                          backgroundColor='#9fc5e8'
                          name='account-edit-outline'
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={wrappers.deleteBtn}
                        onPress={() => deleteUserAccount(item._id)}
                      >
                        <Icon
                          name='trash-can'
                          color='trash'
                          backgroundColor='#ec7f7f'
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={wrappers.reportBtn}
                        onPress={() => {
                          handleModal();
                          openCreateReport(item);
                        }}
                      >
                        <Icon
                          name='book-information-variant'
                          color='green'
                          backgroundColor='#10c440'
                        />
                      </TouchableOpacity>
                      <View style={{ marginVertical: 10 }}>
                        <Text style={wrappers.text}>Created By:</Text>
                        <ListItems
                          image={require('../../assets/background/user-icon.png')}
                          title={`${item.createdBy.firstName}, ${item.createdBy.lastName}, `}
                          subTitle={`+263 ${item.createdBy.phoneNumber}`}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const wrappers = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    width: '90%',
    marginVertical: 15,
  },
  deleteBtn: {
    position: 'absolute',
    top: 10,
    right: 20,
    marginHorizontal: 15,
    paddingHorizontal: 5,
  },
  editBtn: { position: 'absolute', top: 10, right: -10, paddingHorizontal: 5 },
  reportBtn: {
    position: 'absolute',
    top: 10,
    right: 55,
    marginHorizontal: 25,
    paddingHorizontal: 5,
  },
  mainIcon: {
    backgroundColor: palette.primaryDark,
    padding: 20,
    borderRadius: 5,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    marginHorizontal: 10,
    padding: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
  },
  content: {
    paddingVertical: 10,
  },
  contentCenter: {
    marginHorizontal: 5,
    paddingVertical: 35,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  btnContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    width: '90%',
    paddingHorizontal: 10,
  },
  button: {
    marginHorizontal: 4,
  },
});

export default ViewModal;
