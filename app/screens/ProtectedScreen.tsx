import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../features/auth/types';

const ProtectedScreen: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useSelector((store: RootState) => store.auth);
  const navigation: any = useNavigation();
  if (user.roles === 'user') {
    return navigation.navigate('Home');
  }
  return children;
};

export default ProtectedScreen;
