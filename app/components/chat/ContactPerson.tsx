import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { useSelector } from 'react-redux';
import { palette } from '../../constants/Colors';
import { RootState } from '../../features/auth/types';
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
  const { user: currentUser } = useSelector((store: RootState) => store.auth);
  const role = currentUser.roles === 'admin';

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
              {role ? (
                <Text style={styles.text}>
                  {room && `${room.userId.firstName} ${room.userId.lastName}`}
                </Text>
              ) : (
                <Text style={styles.text}>
                  {(user && user.firstName) || (user && user.username)}
                </Text>
              )}
            </Col>
            {time && (
              <Col style={{ alignItems: 'flex-end' }}>
                <Text style={styles.time}>
                  {type === 'contact'
                    ? `Created on ${formatDate(time)}`
                    : moment().add(time?.createdAt, 'days').calendar()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={styles.desc} numberOfLines={1}>
                {description}
              </Text>
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
  unread: {
    backgroundColor: palette.tintColorLight,
    borderRadius: 10,
    width: 20,
    height: 20,
    color: palette.white,
    textAlign: 'center',
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
    textTransform: 'capitalize',
  },
  time: {
    color: palette.lightGrey,
    fontSize: 12,
    marginTop: 5,
  },
});
