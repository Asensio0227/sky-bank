import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/Title';
import { palette } from '../../constants/Colors';
import { wrapper } from '../../constants/styles';
import { getAllUserAcc } from '../../features/accounts/accountsSlice';
import { RootAccountState } from '../../features/accounts/types';
import { hideLoading } from '../../features/user/userSlice';

export default function HomeScreen() {
  const navigation: any = useNavigation();
  const { userAccounts, userAccountsTotal } = useSelector(
    (store: RootAccountState) => store.allAccounts
  );
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await dispatch(getAllUserAcc() as any);
        } catch (error: any) {
          console.log('Error while fetching user accounts : ', error);
        }
      })();
    }, [dispatch])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(hideLoading());
    }, [])
  );

  if (userAccounts.length < 1) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>
          No bank account linked with your user account.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('add')}
          style={styles.createButton}
        >
          <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>
            add account
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 15, paddingVertical: 5 }}>
        <Text style={styles.title}>Your Bank Accounts</Text>
        <View style={wrapper.between}>
          <Text>
            {userAccountsTotal} bank{userAccounts.length > 1 && 's'} found
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('add')}
            style={[styles.create]}
          >
            <Text
              style={[
                wrapper.header,
                {
                  color: palette.primary,
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'double',
                  letterSpacing: 3,
                },
              ]}
            >
              Add Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={userAccounts}
        keyExtractor={(item) => item && item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('details', item);
            }}
          >
            <View style={styles.section}>
              <View style={styles.sectionCenter}>
                <Title style={styles.char} title={item.accountType} />
              </View>
              <View
                style={{
                  padding: 2,
                  width: '90%',
                  marginLeft: 20,
                }}
              >
                <Text style={{ textTransform: 'capitalize' }}>
                  Acc Type:{' '}
                  <Text style={{ color: palette.red }}>{item.accountType}</Text>
                </Text>
                <Text>
                  Account :{' '}
                  <Text style={[styles.title, { padding: 5 }]}>
                    {item.accountNumber}
                  </Text>
                </Text>
                <Text>
                  Balance: $
                  <Text
                    style={{
                      color:
                        item.balance === 0 ? palette.red : palette.primaryDark,
                    }}
                  >
                    {(item.balance / 100).toFixed(2)}
                  </Text>
                </Text>
                <Text>----------------------------------------</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  create: {
    left: 18,
  },
  createButton: {
    backgroundColor: palette.secondaryLight,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    boxShadow: '0 0 5px 0 rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 620,
    overflow: 'hidden',
  },
  char: {
    textAlign: 'center',
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: palette.white,
  },
  section: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 5,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    elevation: 2,
    overflow: 'hidden',
  },
  sectionCenter: {
    marginRight: 5,
    backgroundColor: palette.primaryDark,
    width: '90%',
    maxWidth: 60,
    height: 80,
    overflow: 'hidden',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: palette.secondaryDark,
  },
});
