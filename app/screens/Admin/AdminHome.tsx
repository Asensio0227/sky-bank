import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../../components/Icon';
import { palette } from '../../constants/Colors';

const adminServices = [
  { name: 'all users', icon: 'account', path: 'all' },
  {
    name: 'Loans',
    icon: 'cash-remove',
    path: 'loans',
  },
  {
    name: 'create bank account',
    icon: 'bank',
    path: 'create',
  },
];

const AdminHome = () => {
  const router = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <FlatList
          data={adminServices}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.navigate(item.path)}>
              <View style={styles.infoContainer}>
                <Icon
                  name={item.icon}
                  backgroundColor={palette.primary}
                  width='30%'
                  size={60}
                  style={styles.icon}
                />
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '90%',
    backgroundColor: '#f1f5f8',
    borderRadius: 20,
  },
  icon: {
    padding: 20,
  },
  infoContainer: {
    padding: 10,
    backgroundColor: palette.secondaryLight,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
