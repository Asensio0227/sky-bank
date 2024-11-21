import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import ErrorMessage from './ErrorMessage';

const ResetField: React.FC<{
  name: string;
  placeholder: string;
  icon: any;
}> = ({ name, placeholder, icon }) => {
  const { setFieldTouched, setFieldValue, values, touched, errors } =
    useFormikContext();
  return (
    <>
      <View style={[styles.containerCenter, styles.input]}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={Colors.colors.Primary}
          style={styles.icon}
        />
        <TextInput
          autoCapitalize='none'
          placeholder={placeholder}
          value={values[name]}
          onChangeText={(text) => setFieldValue(name, text)}
          onBlur={() => setFieldTouched(name)}
          style={styles.input}
        />
      </View>
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </>
  );
};

export default ResetField;

const styles = StyleSheet.create({
  containerCenter: {
    padding: 2,
    marginVertical: 8,
    flexDirection: 'row',
    borderRadius: 15,
    width: '100%',
    borderColor: Colors.colors.primaryDark,
    borderWidth: 1,
  },
  icon: {
    margin: 10,
  },

  input: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    overflow: 'hidden',
  },
});
