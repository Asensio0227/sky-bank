import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Option } from './acc/SearchContainer';

const AppPicker: React.FC<{
  items: Option[];
  selectedValue: any | unknown;
  onValueChange: (value: any) => void | any;
  placeholder?: any;
  style?: any;
  label?: string;
}> = ({ items, selectedValue, onValueChange, placeholder, style, label }) => {
  return (
    <>
      {label && <Text style={styles.text}>{label} :</Text>}
      <View style={[styles.container, style]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={[styles.input]}
          placeholder={placeholder}
        >
          {items.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
});

export default AppPicker;
