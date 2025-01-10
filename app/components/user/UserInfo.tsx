import React from 'react';
import { Text, View } from 'react-native';
import Icon from '../Icon';

const UserInfo: React.FC<{ name: any; title: string | any }> = ({
  name,
  title,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        // backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 2,
      }}
    >
      <Icon
        name={name}
        size={40}
        // color="" backgroundColor=''
      />
      <Text
        style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, padding: 3 }}
      >
        : {title}
      </Text>
    </View>
  );
};

export default UserInfo;
