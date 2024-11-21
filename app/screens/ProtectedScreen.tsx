import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ProtectedScreen = () => {
  const { user } = useSelector((store) => store.auth);
  const navigation = useNavigation();
  if (user.roles === 'user') {
    return navigation.navigate('home');
  }
  return children;
};

export default ProtectedScreen;
