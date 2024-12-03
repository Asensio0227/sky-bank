import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../constants/Colors';
import { wrapper } from '../constants/styles';
import { RootUserState } from '../features/user/types';
import { handlePage } from '../features/user/userSlice';
import Icon from './Icon';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector(
    (store: RootUserState) => store.allUser
  );
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevBtn = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(handlePage(newPage));
  };

  const nextBtn = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(handlePage(newPage));
  };

  return (
    <View style={[wrapper.row, { marginBottom: 20 }]}>
      <Pressable style={[styles.btn, styles.prevBtn]} onPress={prevBtn}>
        <Icon name='chevron-double-left' />
        <Text>Prev</Text>
      </Pressable>

      <View>
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
  btn: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
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
