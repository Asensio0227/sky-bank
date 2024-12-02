import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { Platform, Pressable } from 'react-native';
import { palette } from '../../constants/Colors';
import defaultStyle from '../../constants/defaultStyle';
import { formatDate } from '../../utils/format';
import AppTextInput from '../custom/TextInput';
import ErrorMessage from './ErrorMessage';

const DatePicker: React.FC<{ name: string; [key: string]: any }> = ({
  name,
  ...otherProps
}) => {
  const { setFieldValue, setFieldTouched, values, errors, touched } =
    useFormikContext();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const onChange = ({ type }, selectDate: Date) => {
    if (type == 'set') {
      const currentDate = selectDate;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
        setFieldValue(name, formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <>
      {show && (
        <>
          <DateTimePicker
            mode='date'
            value={date}
            display='spinner'
            onChange={onChange}
            minimumDate={new Date('1900-01-01')}
            {...otherProps}
            style={{ backgroundColor: palette.gray }}
          />
        </>
      )}
      {!show && (
        <Pressable onPress={toggleDatePicker}>
          <AppTextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text: string) => setFieldValue(name, text)}
            value={values[name]}
            {...otherProps}
            editable={false}
            style={defaultStyle.input}
          />
          <ErrorMessage error={errors[name]} visible={touched[name]} />
        </Pressable>
      )}
    </>
  );
};

export default DatePicker;
