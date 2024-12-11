import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../../constants/Colors';
import { wrapper } from '../../constants/styles';
import { loanType } from '../../features/loans/types';
import Screen from '../custom/Screen';
import ListItems from '../list/ListItems';
import LoanBtn from './LoanBtn';

const LoanInfo: React.FC<{ item: loanType }> = ({ item }) => {
  return (
    <Screen style={wrappers.container}>
      <View
        style={{
          width: '90%',
          marginVertical: 10,
          justifyContent: 'space-evenly',
        }}
      >
        <LoanBtn item={item} />
        <ListItems
          title={`Loan Amount : $${item.loanAmount! / 100}`}
          subTitle={`Duration : ${item.loanTerm} months`}
        />

        <Text
          style={[
            wrapper.title,
            {
              color: 'white',
              textTransform: 'capitalize',
              fontSize: 15,
            },
          ]}
        >
          Interest Rate : {item.interestRate}%
        </Text>
        <Text
          style={[
            wrapper.title,
            {
              color: 'white',
              textTransform: 'capitalize',
              fontSize: 15,
            },
          ]}
        >
          Loan Status:
          <Text
            style={
              item.status === 'defaulted'
                ? { color: palette.red, marginLeft: 10 }
                : { color: palette.green, marginLeft: 10 }
            }
          >
            {item.status}
          </Text>
        </Text>
        <Text
          style={[
            wrapper.title,
            {
              color: 'white',
              textTransform: 'capitalize',
              fontSize: 15,
            },
          ]}
        >
          Application Status :
          <Text
            style={
              item.applicationStatus === 'rejected'
                ? { color: palette.red, marginLeft: 10 }
                : { color: palette.green, marginLeft: 10 }
            }
          >
            {item.applicationStatus}
          </Text>
        </Text>
        <Text style={wrappers.desc}>{item.description}</Text>
      </View>
    </Screen>
  );
};

export default LoanInfo;

const wrappers = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: palette.secondary,
    padding: 5,
    marginVertical: 10,
    width: 350,
    justifyContent: 'center',
  },
  desc: {
    fontSize: 15,
    padding: 1,
    color: palette.gray,
  },
});
