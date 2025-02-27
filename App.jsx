import React, {useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';
import GestureRecognizer from 'react-native-swipe-gestures';
import Drawer from 'react-native-drawer';

import Home from './android/app/src/Views/Home/Home';
import Login from './android/app/src/Views/Login/Login';

import {DrawerContent} from './android/app/src/Components/Drawer';
import BackButtonHandler from './android/app/src/Components/BackButton';
import Initial from './android/app/src/Views/Initial/Initial';

const Stack = createStackNavigator();

export default function App() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const drawerRef = useRef(null);
  const [gestureEnabled, setGestureEnabled] = useState(true); // Estado para controlar a ativação do GestureRecognizer

  const buttonHeader = () => {
    if (!isOpenDrawer) {
      openDrawer();
    } else {
      closeDrawer();
    }
  };

  const openDrawer = () => {
    if (gestureEnabled) {
      drawerRef.current.open();
      setIsOpenDrawer(true);
    }
  };

  const closeDrawer = () => {
    if (gestureEnabled) {
      drawerRef.current.close();
      setIsOpenDrawer(false);
    }
  };

  const gestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <NavigationContainer>
      <BackButtonHandler></BackButtonHandler>
      <GestureRecognizer
        onSwipeLeft={closeDrawer}
        onSwipeRight={openDrawer}
        config={gestureConfig}
        style={{flex: 1}}
        enabled={gestureEnabled} // Habilitado por padrão
      >
        <Drawer
          ref={drawerRef}
          type="overlay"
          content={<DrawerContent pressButton={buttonHeader} />}
          openDrawerOffset={0.3}
          panCloseMask={0.2}
          tapToClose={true}
          styles={{drawer: {backgroundColor: '#fff'}}}>
          <Stack.Navigator
            initialRouteName="Initial"
            screenOptions={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                color: 'white',
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={buttonHeader}
                  style={{marginLeft: 10}}>
                  <Icon name="navicon" size={32} color="#ffffff" />
                </TouchableOpacity>
              ),
              headerTintColor: 'white',
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              listeners={{
                focus: () => {
                  // Desabilitar GestureRecognizer ao focar na tela de Login
                  setGestureEnabled(true);
                },
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false, // Omitir o header
                drawerLockMode: 'locked-closed', // Desabilitar a gaveta (drawer)
              }}
              listeners={{
                focus: () => {
                  // Desabilitar GestureRecognizer ao focar na tela de Login
                  setGestureEnabled(false);
                }
                
              }}
            />
            <Stack.Screen
              name="Initial"
              component={Initial}
              options={{
                headerShown: false, // Omitir o header
                drawerLockMode: 'locked-closed', // Desabilitar a gaveta (drawer)
              }}
              listeners={{
                focus: () => {
                  // Desabilitar GestureRecognizer ao focar na tela de Login
                  setGestureEnabled(false);
                }
              }}
            />
          </Stack.Navigator>
        </Drawer>
      </GestureRecognizer>
    </NavigationContainer>
  );
}
