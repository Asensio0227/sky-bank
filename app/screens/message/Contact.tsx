import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactPreview from '../../components/chat/ContactPreview';
import SkeletonContainer from '../../components/custom/Skeleton';
import PageBtnContainer from '../../components/PageBtnContainer';
import {
  retrieveAllAssistant,
  setRoomPage,
} from '../../features/room/roomSlice';
import { RootRoomState } from '../../features/room/types';

const Contact = () => {
  const { isLoading, contact, page, numbOfPages } = useSelector(
    (store: RootRoomState) => store.Room
  );
  const dispatch: any = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await dispatch(retrieveAllAssistant());
      })();
    }, [])
  );

  if (isLoading) return <SkeletonContainer />;

  if (contact.length < 0) {
    return (
      <View style={styles.container}>
        <Text>
          No assistant available at the moment, Please try again later
        </Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={contact}
        keyExtractor={(item) => item && item._id}
        renderItem={({ item }) => (
          <ContactPreview data={item} image={item.avatar} />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled
      />
      {numbOfPages > 1 && (
        <PageBtnContainer
          page={page}
          numbOfPages={numbOfPages}
          handlePress={setRoomPage}
        />
      )}
    </>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
