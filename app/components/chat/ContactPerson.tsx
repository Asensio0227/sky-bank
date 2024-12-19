import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { palette } from '../../constants/Colors';
import { formatDate } from '../../utils/format';
import Avatar from './Avatar';

const ContactPerson: React.FC<{
  type?: string;
  description?: string;
  user?: any;
  style?: any;
  time?: Date | any;
  room?: any;
  image?: any;
}> = ({ type, description, user, style, time, room, image }) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('chat', { user, image, room })}
      style={[style, styles.container]}
    >
      <Grid>
        <Col
          style={{ alignItems: 'center', justifyContent: 'center', width: 80 }}
        >
          <Avatar
            userProfile={user?.avatar}
            size={type === 'contact' ? 70 : 65}
          />
        </Col>
        <Col style={{ marginRight: 10 }}>
          <Row style={{ alignItems: 'center' }}>
            <Col>
              <Text style={styles.text}>{user.firstName}</Text>
            </Col>
            {time && (
              <Col style={{ alignItems: 'flex-end' }}>
                <Text style={styles.time}>
                  {type === 'contact' ? `Created on ${formatDate(time)}` : ''}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={styles.desc}>{description}</Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
};

export default ContactPerson;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4ecdc5',
    height: 80,
    padding: 5,
  },
  desc: {
    color: palette.gray,
    fontSize: 15,
    marginLeft: 10,
  },
  text: {
    color: palette.text,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  time: {
    color: palette.lightGrey,
    fontSize: 12,
    marginTop: 5,
  },
});
