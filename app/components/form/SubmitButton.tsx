import { useFormikContext } from 'formik';
import React from 'react';
import { Button } from 'react-native';

const SubmitButton: React.FC<{ title: string }> = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return <Button title={title} onPress={() => handleSubmit()} />;
};

export default SubmitButton;
