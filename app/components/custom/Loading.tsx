import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../../constants/Colors';

const Loading = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <ActivityIndicator size='large' color={Colors.colors.red} />
    </View>
  );
};

export default Loading;
