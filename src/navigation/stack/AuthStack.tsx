import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import EntryCodeScreen from '../../screens/auth/EntryCodeScreen';
import {AuthStackParamList} from '../../interfaces/navigation.interface';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="EntryCodeScreen" component={EntryCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
