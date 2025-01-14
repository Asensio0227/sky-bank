import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../../constants/Colors';
import { styles, wrapper } from '../../constants/styles';
import { handleModal } from '../../features/loans/loanSlice';
import { RootLoansState } from '../../features/loans/types';
import { formatValue } from '../../utils/format';
import SkeletonContainer from '../custom/Skeleton';
import ListItems from '../list/ListItems';
import LoanBtn from './LoanBtn';

const ViewLoans: React.FC = () => {
  const { modalVisible, singleLoan, isLoading } = useSelector(
    (store: RootLoansState) => store.Loans
  );
  const dispatch = useDispatch();

  if (isLoading) return <SkeletonContainer />;

  return (
    <View style={[styles.centerView, { overflow: 'hidden' }]}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => dispatch(handleModal())}
      >
        <View
          style={[
            styles.centerView,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <ScrollView style={styles.modalView}>
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => dispatch(handleModal())}
            >
              <MaterialCommunityIcons name='window-close' size={20} />
            </Pressable>
            <View>
              <Text
                style={[
                  wrapper.title,
                  { textAlign: 'center', marginVertical: 10 },
                ]}
              >
                Loans Information:
              </Text>
            </View>
            <FlatList
              data={singleLoan?.loans}
              keyExtractor={(item) => item && item._id}
              renderItem={({ item }) => (
                <View style={wrappers.container}>
                  <LoanBtn item={item} />
                  <ListItems
                    title={`Name : ${item.name!}`}
                    subTitle={`Contact : +263 ${item.phoneNumber} `}
                  />
                  <Text style={[wrapper.title, wrappers.text]}>
                    Interest Rate : {item.interestRate}%
                  </Text>
                  <Text style={[wrapper.title, wrappers.text]}>
                    Loan Status :
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
                  <Text style={[wrapper.title, wrappers.text]}>
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
                  <Text style={[wrapper.title, wrappers.text]}>
                    Collateral Type : {item.collateralType}
                  </Text>
                  <Text style={[wrapper.title, wrappers.text]}>
                    Collateral Value : ${formatValue(item.collateralValue)}
                  </Text>
                  <Text style={[wrapper.title, wrappers.text]}>
                    Employment Status : {item.employmentStatus}
                  </Text>
                  <Text style={[wrapper.title, wrappers.text]}>
                    Income : ${formatValue(item.income)}
                  </Text>
                  <Text style={[wrapper.title, wrappers.text]}>
                    Loan Amount : ${formatValue(item.loanAmount)}
                  </Text>
                  <Text style={[wrapper.title, wrappers.text]}>
                    Loan Term : {item.loanTerm}
                  </Text>
                  <Text style={[wrapper.title, wrappers.text]}>
                    Loan Type : {item.loanType}
                  </Text>
                  {item.monthlyPayment && (
                    <Text style={[wrapper.title, wrappers.text]}>
                      MonthLy payment : ${formatValue(item.monthlyPayment)}
                    </Text>
                  )}
                  {item.physicalAddress && (
                    <Text style={[wrapper.title, wrappers.text]}>
                      Physical Address : {item.physicalAddress}
                    </Text>
                  )}
                  {item.startDate && (
                    <Text style={[wrapper.title, wrappers.text]}>
                      Start Date :
                      {moment(item.startDate).format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
                  )}
                  {item.endDate && (
                    <Text style={[wrapper.title, wrappers.text]}>
                      End Date :
                      {moment(item.endDate).format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
                  )}
                  <Text style={[wrapper.title, wrappers.text]}>
                    Applied Date :
                    {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </Text>
                  <Text style={[wrapper.title, wrappers.text]}>
                    Status : {item.status}
                  </Text>
                  {item.totalAmount && (
                    <Text style={[wrapper.title, wrappers.text]}>
                      Total : ${formatValue(item.totalAmount)}
                    </Text>
                  )}
                  {item.remainingBalance && (
                    <Text style={[wrapper.title, wrappers.text]}>
                      Remaining Balance : ${formatValue(item.remainingBalance)}
                    </Text>
                  )}
                  {item.description && (
                    <Text style={wrappers.desc}>{item.description}</Text>
                  )}
                  {item.payments.length > 0 &&
                    item.payments.map((pay: any) => (
                      <View key={pay._id} style={{ marginVertical: 5 }}>
                        <Text style={wrappers.text}>
                          Payment ID : {pay._id}
                        </Text>
                        <Text style={wrappers.text}>
                          Payment Date :
                          {moment(pay.datePaid).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </Text>
                        <Text style={wrappers.text}>
                          Payment Amount : ${formatValue(pay.paymentAmount)}
                        </Text>
                        <Text style={wrappers.text}>
                          Payment number : {pay.month} of {item.loanTerm}
                        </Text>
                      </View>
                    ))}
                </View>
              )}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const wrappers = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: palette.secondary,
    padding: 5,
    marginVertical: 10,
    width: 350,
    justifyContent: 'center',
  },
  text: {
    color: palette.white,
    textTransform: 'capitalize',
    fontSize: 15,
  },
  desc: {
    fontSize: 15,
    padding: 1,
    color: palette.gray,
  },
});

export default ViewLoans;
