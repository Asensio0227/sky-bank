import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import ErrorMessage from './ErrorMessage';

const FormField: React.FC<{
  names?: string | any;
  label?: string;
  placeholder?: string | any;
  width?: string | any;
  name?: string | any;
  [key: string]: any;
}> = ({ name, names, label, placeholder, width, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, values, touched, errors } =
    useFormikContext();
  return (
    <>
      {label && <Text style={styles.label}>{label} : </Text>}
      <View style={[styles.containerCenter, styles.container]}>
        <MaterialCommunityIcons
          name={name}
          size={20}
          color={Colors.colors.Primary}
          {...otherProps}
        />
        <TextInput
          autoCapitalize='none'
          onChangeText={(text) => setFieldValue(names, text)}
          onBlur={() => setFieldTouched(names)}
          placeholder={placeholder}
          style={[styles.input, width]}
          value={values[names]}
          {...otherProps}
        />
      </View>
      <ErrorMessage visible={touched[names]} error={errors[names]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#f1f5f8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.colors.primaryLight,
  },
  containerCenter: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 2,
    marginVertical: 8,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  icon: {
    margin: 10,
  },
  input: {
    width: '90%',
    padding: 10,
    fontSize: 16,
  },
});

export default FormField;
