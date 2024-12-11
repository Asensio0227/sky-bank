import { useFocusEffect, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/custom/Loading';
import { palette } from '../../constants/Colors';
import { RootState } from '../../features/auth/types';
import { retrieveLoanDetails } from '../../features/loans/loanSlice';
import { RootLoansState } from '../../features/loans/types';
import { formatValue } from '../../utils/format';

const Information = () => {
  const route: any = useRoute();
  const { params } = route;
  const id = params._id;
  const { singleLoan, isLoading } = useSelector(
    (store: RootLoansState) => store.Loans
  );
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch: any = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await dispatch(retrieveLoanDetails(id));
        } catch (error) {
          console.log(`Error while fetching loan: ${error}`);
        }
      })();
    }, [id])
  );

  if (isLoading) return <Loading />;

  return (
    <ScrollView>
      {singleLoan === null ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Information</Text>
          <View style={styles.card}>
            {user.roles !== 'user' && (
              <>
                <View style={[styles.header]}>
                  <Text style={styles.headerTitle}>{singleLoan.name}</Text>
                  <Text style={styles.headerText}>{singleLoan.dob}</Text>
                  <Text style={styles.headerText}>
                    +263 {singleLoan.phoneNumber}
                  </Text>
                  <Text style={styles.headerText}>{singleLoan.email}</Text>
                  <Text style={styles.headerText}>
                    {singleLoan.physicalAddress}
                  </Text>
                </View>
              </>
            )}
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Application Status : </Text>
              <Text
                style={[
                  styles.infoText,
                  {
                    color:
                      singleLoan.applicationStatus === 'accepted'
                        ? palette.green
                        : singleLoan.applicationStatus === 'rejected'
                        ? palette.red
                        : palette.primary,
                  },
                ]}
              >
                {singleLoan.applicationStatus}
              </Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Loan Type: </Text>
              <Text style={styles.infoText}>{singleLoan.loanType}</Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Collateral Type : </Text>
              <Text style={styles.infoText}>{singleLoan.collateralType}</Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Collateral value : </Text>
              <Text style={styles.infoText}>
                ${formatValue(singleLoan.collateralValue)}
              </Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Employment Status : </Text>
              <Text style={styles.infoText}>{singleLoan.employmentStatus}</Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Income : </Text>
              <Text style={styles.infoText}>
                ${formatValue(singleLoan.income)}
              </Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Interest Rate : </Text>
              <Text style={styles.infoText}>{singleLoan.interestRate}%</Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Loan Amount : </Text>
              <Text style={styles.infoText}>
                ${formatValue(singleLoan.loanAmount)}
              </Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>loan Term : </Text>
              <Text style={styles.infoText}>{singleLoan.loanTerm} months</Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Monthly payment : </Text>
              <Text style={styles.infoText}>
                ${formatValue(singleLoan.monthlyPayment)}
              </Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Remaining balance : </Text>
              <Text style={styles.infoText}>
                ${formatValue(singleLoan.remainingBalance)}
              </Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={[styles.infoTitle]}>Status : </Text>
              <Text
                style={[
                  styles.infoTitle,
                  {
                    color:
                      singleLoan.status === 'active'
                        ? palette.green
                        : singleLoan.status === 'defaulted'
                        ? palette.red
                        : singleLoan.status === 'paid'
                        ? palette.edit
                        : palette.primary,
                  },
                ]}
              >
                {singleLoan.status}
              </Text>
            </View>
            <View style={styles.infoCenter}>
              <Text style={styles.infoTitle}>Total Amount : </Text>
              <Text style={styles.infoTitle}>
                ${formatValue(singleLoan.totalAmount)}
              </Text>
            </View>
            {singleLoan && singleLoan?.payments?.length > 0 && (
              <>
                <Text style={styles.title}>Previous payments</Text>
                {singleLoan?.payments.map((item: any, index: any) => {
                  const date = moment(item.datePaid).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  );
                  return (
                    <View key={index}>
                      <Text>{date}</Text>
                      <View style={styles.infoCenter}>
                        <Text style={styles.payment}>
                          Payment number {item.month}
                        </Text>
                        <Text style={styles.payment}>
                          ${Number(item.paymentAmount / 100)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Information;

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.gray,
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
    boxShadow: '10px 15px 10px 15px rgba(42, 38, 38, 0.5)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
    fontSize: 20,
    fontWeight: '700',
    color: palette.primaryDark,
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 14,
    marginBottom: 2,
  },
  infoCenter: {
    flexDirection: 'row',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
  },
  payment: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    textTransform: 'capitalize',
  },
});
