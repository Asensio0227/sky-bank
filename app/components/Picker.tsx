import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Option } from './SearchContainer';

const AppPicker: React.FC<{
  items: Option[];
  selectedValue: any | unknown;
  onValueChange: (value: any) => void | any;
  placeholder?: any;
  style?: any;
}> = ({ items, selectedValue, onValueChange, placeholder, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.input]}
        placeholder={placeholder}
      >
        {items.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },

  input: {
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
});

export default AppPicker;
