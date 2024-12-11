import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../../constants/Colors';
import { wrapper } from '../../constants/styles';
import Icon from '../Icon';

const ListInfo: React.FC<{
  title: any;
  icon?: any;
  text?: any;
  desc?: boolean;
}> = ({ title, icon, text, desc }) => {
  return (
    <View style={desc ? styles.content : [wrapper.between, styles.content]}>
      {text && (
        <View style={[{ flexDirection: 'row' }]}>
          <Icon name={icon} />
          <Text style={styles.type}>{text}: </Text>
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
    fontSize: 14,
    width: 300,
    lineHeight: 20,
    padding: 10,
    letterSpacing: 0.4,
  },
  title: {
    fontWeight: '700',
    textTransform: 'capitalize',
    width: '90%',
  },
  content: {
    maxWidth: 150,
    padding: 10,
  },
  type: {
    marginVertical: 5,
    fontWeight: 'bold',
    color: palette.primaryDark,
    fontSize: 16,
  },
});
