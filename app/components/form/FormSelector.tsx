import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { textColor } from '../../constants/defaultStyle';
import AppPicker from '../Picker';
import { Option } from '../SearchContainer';

const FormSelector: React.FC<{
  name?: string | any;
  label?: string;
  items: Option[];
  placeholder: any;
}> = ({ name, label, items, placeholder }) => {
  const { setFieldValue, values } = useFormikContext();
  const selectedValue = values[name];

  return (
    <>
      {label && <Text style={styles.label}>{label} : </Text>}
      <AppPicker
        items={items}
        selectedValue={selectedValue}
        onValueChange={(value) => setFieldValue(name, value)}
        style={styles.input}
        placeholder={placeholder}
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
  input: {
    backgroundColor: 'none',
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 16,
    color: textColor,
  },
});

export default FormSelector;
