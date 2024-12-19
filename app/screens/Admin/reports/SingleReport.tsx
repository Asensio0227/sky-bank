import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/custom/Loading';
import Icon from '../../../components/Icon';
import Title from '../../../components/Title';
import { palette } from '../../../constants/Colors';
import { wrapper } from '../../../constants/styles';
import {
  hideLoading,
  retrieveSingleAudit,
  showLoading,
} from '../../../features/reports/reportSlice';
import { RootReportState } from '../../../features/reports/types';
import { formatValue } from '../../../utils/format';

const SingleReport = () => {
  const route: any = useRoute();
  const id = route.params._id;
  const navigation: any = useNavigation();
  const reports = route.params.reports;
  const dispatch: any = useDispatch();
  const { isLoading, report } = useSelector(
    (store: RootReportState) => store.Reports
  );

  useFocusEffect(
    useCallback(() => {
      if (route.params.reports && route.params.reports.length > 0) {
        return;
      }
      (async () => {
        await dispatch(retrieveSingleAudit(id));
      })();
    }, [id])
  );

  useEffect(() => {
    const openModalWithLoading = () => {
      dispatch(showLoading());
      setTimeout(() => {
        dispatch(hideLoading());
        // showModal();
      }, 2000);
    };
    openModalWithLoading();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      {route.params.reports && route.params.reports.length > 0 ? (
        <FlatList
          data={reports}
          keyExtractor={({ _id, index }) => _id || index}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('editReport', item)}
            >
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => navigation.navigate('editReport', item)}
                >
                  <Icon
                    color='edit'
                    backgroundColor='#9fc5e8'
                    name='account-edit-outline'
                    size={60}
                  />
                </TouchableOpacity>
                <View style={styles.section}>
                  <View style={styles.header}>
                    <Title title={item.accountId.accountHolderName} />
                    <View style={styles.main}>
                      <Text style={styles.headerTitle} numberOfLines={1}>
                        Name : {item.accountId.accountHolderName}
                      </Text>
                      <Text style={styles.subTitle} numberOfLines={1}>
                        Account : {item.accountId.accountNumber}
                      </Text>
                      <Text style={styles.subTitle} numberOfLines={1}>
                        branch Code : {item.accountId.branchCode}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={wrapper.title}>Created By : </Text>
                    <View>
                      <Text style={styles.subTitle}>
                        {item.generatedByUserId.firstName}{' '}
                        {item.generatedByUserId.lastName}
                      </Text>
                      <Text style={styles.subTitle}>
                        ID number : {item.generatedByUserId.ideaNumber}
                      </Text>
                      <Text style={styles.subTitle}>
                        Phone number : +263{item.generatedByUserId.phoneNumber}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={wrapper.title}>
                      Total credits : ${formatValue(item.totalCredits)}
                    </Text>
                    <Text style={wrapper.title}>
                      Total debits : ${formatValue(item.totalDebit)}
                    </Text>
                    <Text style={wrapper.title}>
                      total transactions : {item.totalTransactions}
                    </Text>
                    <Text style={wrapper.title}>
                      Net Balance : ${formatValue(item.netBalance)}
                    </Text>
                    <Text style={wrapper.title}>
                      Status : {item.reportStatus}
                    </Text>

                    <Text style={wrapper.title}>
                      Start date :{' '}
                      {moment(item.startDate).format('MMMM Do YYYY')}
                    </Text>
                    <Text style={wrapper.title}>
                      End date : {moment(item.endDate).format('MMMM Do YYYY')}
                    </Text>
                    {item.desc && (
                      <Text style={[wrapper.title, styles.desc]}>
                        Reason : {item.desc}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      ) : (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('editReport', report)}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate('editReport', report)}
            >
              <Icon
                color='edit'
                backgroundColor='#9fc5e8'
                name='account-edit-outline'
              />
            </TouchableOpacity>
            <View style={styles.section}>
              <View style={styles.header}>
                <Title title={report.accountId.accountHolderName} />
                <View style={styles.main}>
                  <Text style={styles.headerTitle} numberOfLines={1}>
                    Name : {report.accountId.accountHolderName}
                  </Text>
                  <Text style={styles.subTitle} numberOfLines={1}>
                    Account : {report.accountId.accountNumber}
                  </Text>
                  <Text style={styles.subTitle} numberOfLines={1}>
                    branch Code : {report.accountId.branchCode}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={wrapper.title}>Created By : </Text>
                <View>
                  <Text style={styles.subTitle}>
                    {report.generatedByUserId.firstName}{' '}
                    {report.generatedByUserId.lastName}
                  </Text>
                  <Text style={styles.subTitle}>
                    ID number : {report.generatedByUserId.ideaNumber}
                  </Text>
                  <Text style={styles.subTitle}>
                    Phone number : +263{report.generatedByUserId.phoneNumber}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={wrapper.title}>
                  Total credits : ${formatValue(report.totalCredits)}
                </Text>
                <Text style={wrapper.title}>
                  Total debits : ${formatValue(report.totalDebit)}
                </Text>
                <Text style={wrapper.title}>
                  total transactions : {report.totalTransactions}
                </Text>
                <Text style={wrapper.title}>
                  Net Balance : ${formatValue(report.netBalance)}
                </Text>
                <Text style={wrapper.title}>
                  Status : {report.reportStatus}
                </Text>
                <Text style={wrapper.title}>
                  Start date : {moment(report.startDate).format('MMMM Do YYYY')}
                </Text>
                <Text style={wrapper.title}>
                  End date : {moment(report.endDate).format('MMMM Do YYYY')}
                </Text>
                {report.desc && (
                  <Text style={[wrapper.title, styles.desc]}>
                    Reason : {report.desc}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default SingleReport;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  editBtn: { position: 'absolute', top: 0, right: 15, paddingHorizontal: 5 },
  section: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '2px 5px 2px 5px rgba(0,0,0,0.7)',
  },
  main: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  subTitle: {
    color: palette.secondary,
  },
  headerTitle: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  desc: {
    fontSize: 16,
  },
});
