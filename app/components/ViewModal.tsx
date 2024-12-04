import React from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../constants/Colors';
import { styles } from '../constants/styles';
import { closeModal } from '../features/accounts/accountsSlice';
import { RootAccountState } from '../features/accounts/types';

const ViewModal: React.FC = () => {
  const { singleAccount, modalVisible } = useSelector(
    (store: RootAccountState) => store.allAccounts
  );
  const dispatch = useDispatch();
  console.log(`===singleAccount==`);
  console.log(singleAccount);
  console.log(`===singleAccount==`);
  const handleModal = () => {
    dispatch(closeModal() as any);
  };
  return (
    <View style={styles.centerView}>
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
            <View style={styles.view}>
              <Text style={styles.text}>Account Information:</Text>
              <View style={wrappers.main}>
                <Text style={wrappers.mainIcon}>
                  {singleAccount.accounts[0].accountHolderName
                    .charAt(0)
                    .toUpperCase()}
                </Text>
                <View style={wrappers.info}>
                  <Text style={wrappers.title}>
                    Account Holder Name:{' '}
                    {singleAccount.accounts[0].accountHolderName}
                  </Text>
                  <Text style={wrappers.subTitle}>
                    ID Number: {singleAccount.userId.IdeaNumber}
                  </Text>
                  <Text style={wrappers.subTitle}>
                    Contact: +263 {singleAccount.userId.phoneNumber}
                  </Text>
                </View>
              </View>
              <View style={wrappers.content}>
                {singleAccount.accounts.map((item) => {
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
                        onPress={() => alert('This is a button!')}
                      >
                        <Icon
                          color='edit'
                          backgroundColor='#9fc5e8'
                          name='account-edit-outline'
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={wrappers.deleteBtn}
                        onPress={() => alert('This is a button!')}
                      >
                        <Icon
                          name='trash-can'
                          color='trash'
                          backgroundColor='#ec7f7f'
                        />
                      </TouchableOpacity>
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
    // borderBottomWidth: 1,
    marginHorizontal: 5,
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
