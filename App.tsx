import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Loading from './app/components/custom/Loading';
import Screen from './app/components/custom/Screen';
import { loadUser } from './app/features/auth/authSlice';
import { RootState } from './app/features/auth/types';
import AuthNavigation from './app/navigation/AuthNavigation';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import { store } from './store';

function Layout() {
  const { user, isLoading } = useSelector((store: RootState) => store.auth);
  const dispatch: any = useDispatch();
  // const navigation: any = useNavigation();

  useEffect(() => {
    (async () => {
      if (user !== null) {
        await dispatch(loadUser() as any);
      }
    })();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Screen>
      <NavigationContainer>
        {user ? <DrawerNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </Screen>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}
