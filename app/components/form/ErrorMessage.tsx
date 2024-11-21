import React from 'react';
import { Text } from 'react-native';

const ErrorMessage: React.FC<{ visible: boolean; error: string }> = ({
  visible,
  error,
}) => {
  if (!visible || !error) return null;

  return <Text style={{ color: 'red' }}>{error}</Text>;
};

export default ErrorMessage;
