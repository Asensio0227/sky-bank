import Picker from '@ouroboros/react-native-picker';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../constants/Colors';
import { wrapper } from '../constants/styles';
import { RootUserState } from '../features/user/types';
import { updateUserStatus } from '../features/user/userSlice';

const items = [
  {
    value: 'user',
    text: 'User',
  },
  {
    value: 'admin',
    text: 'Admin',
  },
  {
    value: 'assistant',
    text: 'Assistant',
  },
  {
    value: 'member',
    text: 'Member',
  },
];

function PickerDisplay(props: { text: string }) {
  return (
    <View style={wrapper.dropDown}>
      <Text>{'Role ' + props.text}</Text>
    </View>
  );
}

const DropDown = () => {
  const { singleUser } = useSelector(
    (store: RootUserState) => store.AllUserState
  );
  const dispatch = useDispatch();
  const { _id, roles } = singleUser;
  const [text, setText] = useState(roles);

  const handleChange = (newText: { newText: string }) => {
    Alert.alert(
      'Confirm Change',
      'Are you sure you want to change user role?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(
              updateUserStatus({
                user: {
                  _id,
                  newRole: newText,
                },
                actionType: 'changeRole',
              }) as any
            ),
              setText(newText);
          },
        },
      ]
    );
  };

  return (
    <>
      <Picker
        component={PickerDisplay}
        value={text}
        onChanged={handleChange}
        options={items}
        style={{
          borderWidth: 1,
          borderColor: '#a7a7a7',
          borderRadius: 5,
          marginBottom: 5,
          padding: 5,
          backgroundColor: palette.primaryDark,
          color: palette.white,
        }}
      />
    </>
  );
};

export default DropDown;
