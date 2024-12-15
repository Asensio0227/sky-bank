import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateReport from '../screens/Admin/reports/CreateReport';
import EditReport from '../screens/Admin/reports/EditReport';
import Report from '../screens/Admin/reports/Report';

const Stack = createNativeStackNavigator();

const ReportNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='report'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='report' component={Report} />
      <Stack.Screen name='createReport' component={CreateReport} />
      <Stack.Screen name='editReport' component={EditReport} />
    </Stack.Navigator>
  );
};

export default ReportNavigation;
