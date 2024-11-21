import { useNavigation, useRoute } from '@react-navigation/native';
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

const bankingServices = [
  {
    name: 'Money Transfers',
    icon: 'bank-transfer',
    path: '/Transfer',
  },
  {
    name: 'Refunds',
    icon: 'cash-refund',
    path: '/Refund',
  },
  {
    name: 'Loans',
    icon: 'cash-remove',
    path: '/(auth)/Loans',
  },
  {
    name: 'Account Management',
    icon: 'card-account-details-outline',
    path: '/Management',
  },
  {
    name: 'Bill Payments',
    icon: 'billiards',
    path: '/Transfers',
  },
  {
    name: 'Alerts and Notifications',
    icon: 'alert',
    path: '/(auth)/Notifications',
  },
  {
    name: 'Customer Support',
    icon: 'help',
    path: '/(auth)/Help',
  },
];

const Details = () => {
  const route = useRoute();
  const params = route.params;
  const router = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <FlatList
          data={bankingServices}
          keyExtractor={(_, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.navigate(item.path, params)}
            >
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

export default Details;
