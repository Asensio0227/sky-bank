import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { palette } from '../../constants/Colors';
import ListInfo from '../list/ListInfo';

const ViewTransaction: React.FC<{
  IconComponent?: any;
  onPress?: any;
  title?: string;
  subTitle?: string;
  image?: any;
  description?: string;
  type?: string;
  accountType?: string;
  reference?: string;
  accountNumber?: number;
  accountToNumber?: number;
  branchCode?: number;
  location?: string;
  status?: string;
  transactionCharges?: any;
  transactionType?: string;
  transactionDate?: Date;
  isReversed?: boolean;
  reversal?: string;
}> = ({
  IconComponent,
  onPress,
  title,
  subTitle,
  image,
  description,
  type,
  accountType,
  reference,
  accountNumber,
  accountToNumber,
  branchCode,
  location,
  status,
  transactionCharges,
  transactionType,
  transactionDate,
  isReversed,
  reversal,
}) => {
  const date = moment(transactionDate).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <View style={styles.section}>
      <TouchableHighlight underlayColor={palette.gray} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
              {subTitle}
            </Text>
            {/* {description} */}
          </View>
          <MaterialCommunityIcons
            name='chevron-double-right'
            size={25}
            color={palette.secondary}
          />
        </View>
      </TouchableHighlight>
      <View style={{ marginVertical: 15 }}>
        <ListInfo icon='format-text' title={type} text='Type' />
        <ListInfo
          icon='card-account-details'
          title={accountType}
          text='Account Type'
        />
        {reference && (
          <ListInfo
            icon='arrange-bring-forward'
            title={reference}
            text='Reference'
          />
        )}
        <ListInfo
          icon='format-list-numbered'
          title={accountNumber}
          text='Account Number'
        />
        {accountToNumber && (
          <ListInfo
            icon='bank-transfer'
            title={accountToNumber}
            text='Account To Number'
          />
        )}
        {branchCode && (
          <ListInfo icon='barcode' title={branchCode} text='Branch Code' />
        )}
        {isReversed && (
          <ListInfo
            icon='cash-refund'
            title={reversal}
            text='Reversal Status'
          />
        )}
        {location && (
          <ListInfo icon='google-maps' title={location} text='Location' />
        )}
        <ListInfo icon='list-status' title={status} text='Status' />
        <ListInfo
          icon='cash'
          title={transactionCharges}
          text='Transaction Charges'
        />
        <ListInfo
          icon='transfer'
          title={transactionType}
          text='Transaction Type'
        />
        <ListInfo
          desc
          icon='calendar-today'
          title={date}
          text='Transaction Date'
        />
        <ListInfo desc icon='details' title={description} text='Desc' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: palette.white,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: palette.white,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  subTitle: {
    color: palette.secondary,
  },
  title: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  content: { width: '90%', maxWidth: 200 },
  type: {
    marginVertical: 5,
    fontWeight: 'bold',
    color: palette.primaryDark,
    fontSize: 16,
  },
  desc: {
    fontSize: 14,
    width: 300,
    lineHeight: 20,
    padding: 10,
    letterSpacing: 0.4,
  },
});

export default ViewTransaction;
