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
  const pages = [];

  // Always show first page
  pages.push(1);

  // Show dots if needed
  if (page > 3) {
    pages.push('...');
  }

  // Show previous two pages around current page
  for (
    let i = Math.max(2, page - 1);
    i <= Math.min(numbOfPages - 1, page + 1);
    i++
  ) {
    pages.push(i);
  }

  // Always show active page
  if (!pages.includes(page)) {
    pages.push(page);
  }

  // Show dots if needed
  if (page < numbOfPages - 2) {
    pages.push('...');
  }

  // Always show last page
  if (numbOfPages > 1) {
    pages.push(numbOfPages);
  }

  // show pages without wrapping or showing dots
  // const pages = Array.from({ length: numbOfPages }, (_, index) => {
  //   return index + 1;
  // });

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
    flexWrap: 'wrap',
  },
  btn: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  container: {
    marginBottom: 20,
    height: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
