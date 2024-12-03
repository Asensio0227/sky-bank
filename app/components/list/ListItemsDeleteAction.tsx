import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { palette } from '../../constants/Colors';
import Icon from '../Icon';

const ListItemsDeleteAction: React.FC<{ onPress: any }> = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon name='trash-can' size={30} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ListItemsDeleteAction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.red,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
