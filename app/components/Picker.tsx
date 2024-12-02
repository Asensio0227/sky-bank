import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const AppPicker: React.FC = ({ list }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(false);
  console.log(list);

  return (
    <View>
      <Text>user's roles</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label='Java' value='java' />
        <Picker.Item label='JavaScript' value='js' />
      </Picker>
    </View>
  );
};

export default AppPicker;
