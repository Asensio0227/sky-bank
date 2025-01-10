import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../../constants/Colors';
import Icon from '../Icon';

const ListInfo: React.FC<{
  title: any;
  icon?: any;
  text?: any;
  desc?: boolean;
}> = ({ title, icon, text, desc }) => {
  return (
    <View style={styles.content}>
      {text && (
        <View style={[{ flexDirection: 'row' }]}>
          <Icon name={icon} />
          <Text style={[styles.type]}>{text}: </Text>
        </View>
      )}
      <Text
        adjustsFontSizeToFit={true}
        style={desc ? styles.desc : styles.title}
      >
        {title}
      </Text>
    </View>
  );
};

export default ListInfo;

const styles = StyleSheet.create({
  desc: {
    fontSize: 13,
    width: 300,
    lineHeight: 20,
    padding: 10,
    letterSpacing: 0.4,
  },
  title: {
    textTransform: 'capitalize',
    width: '100%',
    fontSize: 14,
    left: 50,
    textAlign: 'right',
  },
  content: {
    maxWidth: 150,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  type: {
    marginVertical: 2,
    fontWeight: 'bold',
    color: palette.primaryDark,
    fontSize: 13,
    paddingVertical: 5,
  },
});
