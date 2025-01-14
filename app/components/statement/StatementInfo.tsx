import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Text as Title } from 'react-native-paper';
import { palette } from '../../constants/Colors';
import { transactionType } from '../../features/transaction/types';
import { formatValue } from '../../utils/format';
import { userType } from '../form/Form';
import MyTable from './Table';

interface stateProps {
  accountNumber?: number;
  transaction?: transactionType[];
  user?: userType;
  location?: string;
  createdAt?: Date | string;
  startDate?: Date | string;
  endDate?: Date | string;
  balance?: number | string;
  id?: string | number;
}

const StatementInfo: React.FC<stateProps> = ({
  accountNumber,
  transaction,
  user,
  location,
  createdAt,
  startDate,
  endDate,
  balance,
  id,
}) => {
  return (
    <View style={wrappers.between}>
      <View style={wrappers.mainIcon}>
        <Text style={wrappers.text}>{'skybank'.charAt(0).toUpperCase()}</Text>
        <Text style={wrappers.textCenter}>Skybank</Text>
      </View>
      <View style={wrappers.userContainer}>
        <Title variant='bodyLarge' style={wrappers.username}>
          {user && user.firstName} {user && user.lastName}
        </Title>
        <Title variant='bodyLarge' style={wrappers.username}>
          {user && user.physicalAddress}
        </Title>
        <Title variant='bodyLarge' style={[wrappers.username]}>
          {user && user.ideaNumber}
        </Title>
        <Title variant='bodyLarge' style={wrappers.username}>
          +263 {user && user.phoneNumber}
        </Title>
        <Title variant='bodyLarge' style={wrappers.username}>
          {user && user.email}
        </Title>
      </View>
      <View style={{ marginVertical: 7 }}>
        <Text style={{ fontSize: 12 }}>Reference Number : {id}</Text>
        <Text style={{ fontSize: 10 }}>
          To verify this statement please keep above reference number.
        </Text>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Title variant='labelMedium'>location : {location}</Title>
        <Title variant='labelMedium'>
          Statement Period : {moment(startDate).format('MMM Do YY')} -
          {moment(endDate).format('MMM Do YY')}
        </Title>
        <Title>Statement Date : {moment(createdAt).format('MMM Do YY')}</Title>
      </View>
      <Title>Acc : {accountNumber}</Title>
      <Text style={{ textTransform: 'capitalize' }}>
        balance :{' '}
        <Title
          variant='titleSmall'
          style={{ color: palette.primaryDark }}
        >{`$${formatValue(balance)}`}</Title>
      </Text>
      {transaction && transaction.length > 0 && (
        <MyTable transaction={transaction} />
      )}
    </View>
  );
};

export default StatementInfo;

const wrappers = StyleSheet.create({
  mainIcon: {
    backgroundColor: palette.primaryDark,
    padding: 5,
    borderRadius: 5,
    width: 60,
    margin: 10,
  },
  text: {
    color: palette.white,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
    color: palette.white,
    fontSize: 13,
    marginBottom: 2,
  },
  between: {
    padding: 10,
    backgroundColor: palette.white,
    marginTop: 10,
    boxShadow: `4px 1px 2px rgba(0,0,0,0.6)`,
  },
  userContainer: {
    marginVertical: 15,
  },
  username: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});
