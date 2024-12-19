import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../../constants/Colors';
import {
  hideLoading,
  retrieveAudits,
  setReportPage,
} from '../../features/reports/reportSlice';
import { RootReportState } from '../../features/reports/types';
import Loading from '../custom/Loading';
import ListItems from '../list/ListItems';
import ListSeparator from '../list/ListSeparator';
import PageBtnContainer from '../PageBtnContainer';

const ReportContainer = () => {
  const {
    isLoading,
    reports,
    search,
    sort,
    reportStatus,
    totalReports,
    numbOfPages,
    page,
  } = useSelector((store: RootReportState) => store.Reports);
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => await dispatch(retrieveAudits()))();
    }, [search, sort, reportStatus, page])
  );

  useEffect(() => {
    dispatch(hideLoading());
  }, []);

  if (isLoading) return <Loading />;

  if (reports.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title}>No reports found....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          marginTop: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontWeight: '700' }}>
          {totalReports} report
          {reports.length > 1 ? 's' : ''} found
        </Text>
        <View
          style={{
            width: '90%',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            marginVertical: 20,
            padding: 15,
          }}
        >
          <FlatList
            data={reports}
            keyExtractor={(_id, index) => _id || index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  width: '90%',
                  boxShadow: '1px 2px 5px 2px rgba(0,0,0,0.7)',
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                <ListItems
                  image={
                    item.avatar
                      ? { uri: item.avatar }
                      : require('../../../assets/background/user-icon.png')
                  }
                  title={`${item.userId.firstName} ${item.userId.lastName}`}
                  subTitle={`+263 ${item.userId.phoneNumber}`}
                  accountNumber={`${item.reports.length} report${
                    item.reports.length > 1 ? 's' : ''
                  }`}
                  onPress={() => navigation.navigate('single-report', item)}
                />
                <ListSeparator />
              </View>
            )}
            scrollEnabled
            showsVerticalScrollIndicator={false}
          />
        </View>
        {numbOfPages > 1 && (
          <PageBtnContainer
            page={page}
            numbOfPages={numbOfPages}
            handlePress={setReportPage}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  title: {
    fontSize: 20,
    color: palette.primary,
  },
});

export default ReportContainer;
