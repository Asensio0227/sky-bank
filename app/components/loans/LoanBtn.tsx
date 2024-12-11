import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/auth/types';
import { loanType } from '../../features/loans/types';
import Icon from '../Icon';

interface btnsProp {
  name: string;
  icon: string;
  path: string;
}

const btns: btnsProp[] = [
  { name: 'loan payments', icon: 'contactless-payment', path: 'transfer' },
  { name: 'loan details', icon: 'information', path: 'info' },
  { name: 'loan balance', icon: 'scale-balance', path: 'balance' },
  {
    name: 'calculate monthly payments ',
    icon: 'calculator-variant',
    path: 'calculate',
  },
  { name: 'approve', icon: 'thumb-up', path: 'approve' },
  { name: 'reject', icon: 'close', path: 'approve' },
];

const LoanBtn: React.FC<{ item: loanType }> = ({ item }) => {
  const navigation: any = useNavigation();
  const { user } = useSelector((store: RootState) => store.auth);
  const filteredBtns =
    user.roles === 'user'
      ? btns.filter((btn) => {
          return btn.name === 'loan details' || btn.name === 'loan payments';
        })
      : btns;

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
          onPress={() => navigation.navigate(btn.path, item)}
        >
          <Icon name={btn.icon} size={40} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LoanBtn;
