import { Platform } from 'react-native';
import { Colors } from './Colors';

export const backgroundColor = Colors.light.background;

export const textColor = Colors.light.text;

export default {
  btn: {
    textAlign: 'center',
    textTransform: 'uppercase',
    ...Platform.select({
      ios: {
        fontSize: 20,
        fontFamily: 'Avenir',
      },
      android: {
        fontSize: 18,
        fontFamily: 'Roboto',
      },
    }),
    color: textColor,
    fontWeight: 'bold',
  },
  colors: Colors,
  desc: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: textColor,
  },
  input: {
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: Colors.light.text,
  },
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: textColor,
    fontWeight: 'regular',
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: textColor,
    lineHeight: 36,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
    paddingVertical: 15,
  },
  span: {
    fontSize: 18,
    lineHeight: 22,
    color: textColor,
    fontWeight: '900',
    paddingLeft: 30,
  },
};
