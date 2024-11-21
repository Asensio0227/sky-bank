import Picker from '@ouroboros/react-native-picker';
import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { backgroundColor, textColor } from '../../constants/defaultStyle';

const items = [
  {
    value: 'skyxl',
    text: 'SkyXL',
  },
];

const FormSelector: React.FC<{ name: string; label: string }> = ({
  name,
  label,
}) => {
  const { setFieldValue, values } = useFormikContext();
  return (
    <>
      <Text style={styles.label}>{label} : </Text>
      <Picker
        value={values[name]}
        onChanged={(value) => setFieldValue(name, value)}
        options={items}
        style={{
          borderWidth: 1,
          borderColor: '#a7a7a7',
          borderRadius: 5,
          marginBottom: 5,
          padding: 5,
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: textColor,
    transform: 'capitalize',
  },
});

export default FormSelector;
