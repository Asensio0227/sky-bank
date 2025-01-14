import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import SkeletonLoader from './SkeletonLoader';

const backgroundColor = 'lightgrey';
const highlightColor = 'purple';

const SkeletonContainer = () => {
  return (
    <SkeletonLoader
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
    >
      <View style={styles.container}>
        {new Array(10).fill(null).map((_, index) => (
          <SkeletonItem key={index} />
        ))}
      </View>
    </SkeletonLoader>
  );
};

const SkeletonItem = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.row}>
      <View style={styles.image}></View>
      <View>
        <View style={[styles.line, { width: width * 0.6 }]}></View>
        <View style={[styles.line, { width: width * 0.4 }]}></View>
        <View style={[styles.line, { width: width * 0.2 }]}></View>
      </View>
    </View>
  );
};

export default SkeletonContainer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    backgroundColor,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  line: {
    height: 20,
    marginBottom: 10,
    backgroundColor,
  },
});
