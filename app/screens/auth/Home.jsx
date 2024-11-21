import { Link, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { palette } from '../../constants/Colors';

const accData = [
  {
    id: 'ibgx74oy',
    accType: 'savings',
    accNumber: 6774179487,
    balance: 0,
  },
  {
    id: '258y3tgh',
    accType: 'checking',
    accNumber: 6774179487,
    balance: 669437369,
  },
  {
    id: 'q345to78xy34nr',
    accType: 'loan',
    accNumber: 6774179487,
    balance: 6437,
  },
  {
    id: 'q345to78xy34gnr',
    accType: 'checking',
    accNumber: 6774179487,
    balance: 6437,
  },
  {
    id: 'q345to78vxy34nr',
    accType: 'savings',
    accNumber: 6774179487,
    balance: 0,
  },
];

export default function HomeScreen() {
  const router = useNavigation();
  const [account, setAccount] = useState(accData);

  if (account.length < 1) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>
          No bank account linked with your user account.
        </Text>
        <Link href='/add' style={styles.createButton}>
          <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>
            add account
          </Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={account}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.navigate({
                name: '/Details',
                params: item,
              });
            }}
          >
            <View style={styles.section}>
              <View style={styles.sectionCenter}>
                <Text style={styles.char}>{item.accType.charAt(0)}</Text>
              </View>
              <View style={{ padding: 2 }}>
                <Text style={{ textTransform: 'capitalize' }}>
                  Acc Type:{' '}
                  <Text style={{ color: palette.red }}>{item.accType}</Text>
                </Text>
                <Text>
                  Account : <Text>{item.accNumber}</Text>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: palette.secondaryLight,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
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
    marginRight: 10,
    backgroundColor: palette.primaryDark,
    width: 100,
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
