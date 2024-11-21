import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export type userType = {
  _id?: string;
  fName?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  roles?: string;
  token?: string;
  ideaNumber?: string;
  physicalAddress?: string;
  banned?: boolean;
  password?: string;
  isVerified?: boolean;
  verificationToken?: number | string | null;
  dob?: string;
  verified?: Date;
  createdAt?: Date;
  passwordToken?: number | string | null;
  passwordTokenExpirationDate?: Date | number | string | null;
};

const Form: React.FC<{
  initialValues: userType;
  onSubmit: (props: userType) => Promise<void>;
  validationSchema: any;
  children: React.ReactNode;
  style?: any;
  title?: string;
}> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  style,
  title,
}) => {
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}> Welcome to Sky Bank</Text>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => <>{children}</>}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 25,
    overflow: 'scroll',
  },
  title: {
    color: Colors.light.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: Colors.light.background,
    borderRadius: 10,
    shadowColor: Colors.dark.tabIconDefault,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default Form;
