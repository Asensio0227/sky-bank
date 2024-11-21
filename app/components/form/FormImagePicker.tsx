import { useFormikContext } from 'formik';
import React from 'react';
import ImageInput from '../ImageInput';
import ErrorMessage from './ErrorMessage';

const FormImagePicker: React.FC<{ name: string }> = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <ImageInput
        imageUri={values[name]}
        onChangeImage={(uri) => setFieldValue(name, uri)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormImagePicker;
