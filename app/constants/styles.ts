import { Dimensions, StyleSheet } from 'react-native';
import { palette } from './Colors';
const { width, height } = Dimensions.get('window');
const oneThirdHeight = height / 3;

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: palette.primaryDark,
    color: palette.white,
    marginBottom: 40,
  },
  centerView: {
    flex: 1,
    marginTop: 22,
    overflow: 'hidden',
  },
  modalView: {
    margin: 4,
    backgroundColor: palette.white,
    borderRadius: 20,
    padding: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('screen').width,
  },
  buttonClose: {
    position: 'absolute',
    borderRadius: 10,
    elevation: 1,
    top: 10,
    right: 10,
    zIndex: 1,
  },
  bcgImage: {
    width: '100%',
    height: oneThirdHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  img: {
    width: 100,
    height: '100%',
    position: 'absolute',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: palette.primaryDark,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.primaryDark,
  },
  email: {
    fontSize: 16,
    color: palette.primaryDark,
  },
  address: {
    fontSize: 14,
    color: palette.primaryDark,
  },
  contact: {
    fontSize: 14,
    color: palette.primaryDark,
  },
  accountNumber: {
    fontSize: 14,
    color: palette.primaryDark,
  },
  accountBalance: {
    fontSize: 14,
    color: palette.primaryDark,
  },
  split: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 7,
    padding: 5,
  },
});

// grid layout
export const wrapper = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  dropDown: {
    padding: 10,
    borderColor: palette.primaryDark,
    borderWidth: 2,
    marginHorizontal: 10,
    backgroundColor: palette.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 2,
  },
  aside: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    letterSpacing: 0,
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.primaryDark,
  },
  pending: {
    backgroundColor: '#fcefc7',
    color: ' #e9b949',
  },
  interview: {
    backgroundColor: ' #e0e8f9',
    color: ' #647acb',
  },
  declined: {
    color: ' #d66a6a',
    backgroundColor: ' #ffeeee',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
