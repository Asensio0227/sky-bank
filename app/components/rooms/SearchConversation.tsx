import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearRoomFilters,
  handleRoomChange,
} from '../../features/room/roomSlice';
import { RootRoomState } from '../../features/room/types';
import Button from '../custom/Button';
import AppTextInput from '../custom/TextInput';

const SearchConversation: React.FC = () => {
  const { search, isLoading } = useSelector(
    (store: RootRoomState) => store.Room
  );
  const [searchTerm, setSearchTerm] = useState(search);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    dispatch(handleRoomChange({ name: 'search', value: searchTerm }));
  }, [searchTerm]);

  const handleClearFilters = () => {
    dispatch(clearRoomFilters());

    setSearchTerm('');
  };

  return (
    <View style={{ alignSelf: 'center', width: '90%' }}>
      <AppTextInput
        icon='account-search'
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        placeholder='Search by name....'
      />

      <Button
        title='clear filters'
        onPress={handleClearFilters}
        style={{ marginBottom: 7, backgroundColor: 'none', width: '90%' }}
      />
    </View>
  );
};

export default SearchConversation;
