import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
  Text,
  RefreshControl,
  Button,
} from 'react-native';

import Icon from '@react-native-vector-icons/fontawesome';
import {
  Categories,
  ContainerTitle,
  Create,
  FontTitle,
  Lista,
  ScrollableCategory,
  ScrollableContent,
  Search,
  TitleText,
} from './styles';

import {api} from '../../service/api';
import {CommonActions} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({navigation}) {
  const [loading, setLoading] = useState(false);

  const hadleButton = async () => {
    // Salvar dados
    await AsyncStorage.setItem('token', 'Maria');
  };
  const hadleButton2 = async () => {
    // Obter dados
      const value = await AsyncStorage.getItem('token');
      Alert.alert(value)
  };
  const hadleButton3 = async () => {
    // Remover dados
    await AsyncStorage.removeItem('token');
  };

  //Reseta a navegação ao chegar na view HOME
  navigation.dispatch(state => {
    // Remove all the screens after `Profile`
    const index = state.routes.findIndex(r => r.name === 'Home');
    const routes = state.routes.slice(0, index + 1);

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'orange'}}>
          <Text>Ola mundo</Text>
          
          <Button title='1' onPress={hadleButton}>
             
          </Button>
          <Button title='2' onPress={hadleButton2}>
              
          </Button>
          <Button title='3' onPress={hadleButton3}>
              
          </Button>
          
          
    </SafeAreaView>
  );
}

export default Home;
