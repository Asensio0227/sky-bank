import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/auth/types';
import {
  handleModal,
  rejectLoanApplication,
} from '../../features/loans/loanSlice';
import { loanType, RootLoansState } from '../../features/loans/types';
import Icon from '../Icon';
import SkeletonContainer from '../custom/Skeleton';

interface btnsProp {
  name: string;
  icon: string;
  path: string;
}

const btns: btnsProp[] = [
  { name: 'loan payments', icon: 'contactless-payment', path: 'transfer' },
  { name: 'loan details', icon: 'information', path: 'info' },
  {
    name: 'calculate monthly payments ',
    icon: 'calculator-variant',
    path: 'calculate',
  },
  { name: 'approve', icon: 'thumb-up', path: 'approve' },
  { name: 'reject', icon: 'close', path: '' },
];

const LoanBtn: React.FC<{ item: loanType }> = ({ item }) => {
  const navigation: any = useNavigation();
  const { user } = useSelector((store: RootState) => store.auth);
  const { isLoading, modalVisible } = useSelector(
    (store: RootLoansState) => store.Loans
  );

  const dispatch: any = useDispatch();
  const filteredBtns =
    user.roles === 'user'
      ? btns.filter(
          (btn) => btn.name === 'loan details' || btn.name === 'loan payments'
        )
      : btns.filter(
          (btn) => btn.name !== 'loan details' && btn.name !== 'loan payments'
        );

  const handleChange = () => {
    Alert.alert(
      'Confirm Change',
      'Are you sure you want to reject loan application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => await dispatch(rejectLoanApplication(item._id)),
        },
      ]
    );
  };

  const closeModal = (path: any, arr: loanType) => {
    navigation.navigate(path, arr), dispatch(handleModal());
  };

  if (isLoading) return <SkeletonContainer />;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        marginBottom: 10,
      }}
    >
      {filteredBtns.map((btn: btnsProp, index) => (
        <TouchableOpacity
          key={index}
          style={{ marginRight: 5 }}
          onPress={() => {
            console.log(btn.path);
            btn.name === 'reject' ? handleChange() : closeModal(btn.path, item);
            // : navigation.(btn.path, item);
          }}
        >
          <Icon name={btn.icon} size={40} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LoanBtn;
