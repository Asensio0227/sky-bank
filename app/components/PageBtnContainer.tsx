import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { palette } from '../constants/Colors';

import { handlePage } from '../features/accounts/accountsSlice';
import Icon from './Icon';

const PageBtnContainer: React.FC<{
  page: number | any;
  numbOfPages: number;
  handlePress: any;
}> = ({ page, numbOfPages, handlePress }) => {
  const dispatch = useDispatch();

  const pages = Array.from({ length: numbOfPages }, (_, index) => {
    return index + 1;
  });

  const prevBtn = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numbOfPages;
    }
    dispatch(handlePress(newPage));
  };

  const nextBtn = () => {
    let newPage = page + 1;
    if (newPage > numbOfPages) {
      newPage = 1;
    }
    dispatch(handlePress(newPage));
  };

  return (
    <View style={styles.container}>
      <Pressable style={[styles.btn, styles.prevBtn]} onPress={prevBtn}>
        <Icon name='chevron-double-left' />
        <Text>Prev</Text>
      </Pressable>

      <View style={styles.btns}>
        {pages.map((pageNumber) => {
          return (
            <Pressable
              key={pageNumber}
              style={
                pageNumber === page ? [styles.btn, styles.active] : styles.btn
              }
              onPress={() => dispatch(handlePage(pageNumber))}
            >
              <Text>{pageNumber}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={[styles.btn, styles.nextBtn]} onPress={nextBtn}>
        <Text>Next</Text>
        <Icon name='chevron-double-right' />
      </Pressable>
    </View>
  );
};

export default PageBtnContainer;

const styles = StyleSheet.create({
  active: {
    backgroundColor: palette.primary,
    shadowColor: palette.secondary,
  },
  btns: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  container: { marginBottom: 20, height: 30, flexDirection: 'row' },
  nextBtn: {
    marginLeft: 10,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  prevBtn: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
});
