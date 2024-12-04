import React from 'react';
import { StyleSheet, View } from 'react-native';

const ListSeparator = () => {
  return <View style={styles.separator} />;
};

export default ListSeparator;

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 5,
    backgroundColor: 'lightgrey',
  },
});
