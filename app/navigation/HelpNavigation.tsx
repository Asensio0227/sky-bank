import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../screens/message/Chat';
import Contact from '../screens/message/Contact';
import Help from '../screens/message/Help';

const Stack = createNativeStackNavigator();

const HelpNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='chats'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='chats' component={Help} />
      <Stack.Screen name='chat' component={Chat} />
      <Stack.Screen name='contact' component={Contact} />
    </Stack.Navigator>
  );
};

export default HelpNavigation;