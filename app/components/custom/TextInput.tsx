import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import defaultStyle from '../../constants/defaultStyle';

const AppTextInput: React.FC<{
  width: any;
  style: any;
  icon: any;
  [key: string]: any;
}> = ({ width = '100%', style, icon, ...otherProps }) => {
  return (
    <View style={[styles.container, { width }, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={Colors.light.icon}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[defaultStyle.input, { color: Colors.light.text }]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 25,
    marginVertical: 10,
    overflow: 'hidden',
  },
  icon: {
    margin: 5,
  },
});

export default AppTextInput;
