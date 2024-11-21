import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';
import ErrorMessage from './ErrorMessage';

const PhoneNumberInput: React.FC<{ name: string }> = ({ name }) => {
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const { setFieldValue, touched, values, errors } = useFormikContext();

  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
  };

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput
        value={values[name]}
        onChangePhoneNumber={(text) => setFieldValue(name, text)}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default PhoneNumberInput;
