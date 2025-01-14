import React from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { transactionType } from '../../features/transaction/types';
import { formatValue } from '../../utils/format';

const MyTable: React.FC<{ transaction: transactionType[] | any }> = ({
  transaction,
}) => {
  const newTableArray = transaction.map((item: transactionType) => ({
    id: item._id,
    date: item.createdAt,
    description: item.description,
    amount: item.amount,
    bankCharges: item.transactionCharges,
  }));

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title>Amount</DataTable.Title>
          <DataTable.Title>BankCharges</DataTable.Title>
        </DataTable.Header>
        {newTableArray.map((item: any) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.date}</DataTable.Cell>
            <DataTable.Cell>{item.description}</DataTable.Cell>
            <DataTable.Cell>{`$${formatValue(item.amount)}`}</DataTable.Cell>
            <DataTable.Cell>{`$${formatValue(
              item.bankCharges
            )}`}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default MyTable;
