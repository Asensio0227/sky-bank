import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { palette } from '../constants/Colors';

const Icon: React.FC<{
  name: any;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: any;
  transform?: any;
  width?: string | number;
}> = ({
  name,
  size = 40,
  color = 'secondary',
  backgroundColor = 'lightgrey',
  style,
  transform,
  width,
}) => {
  return (
    <View
      style={[
        {
          width: width || size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name={name}
        size={size * 0.5}
        color={palette[color]}
        style={transform}
      />
    </View>
  );
};

export default Icon;
