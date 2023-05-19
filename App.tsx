import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Prova from './components/prova';
import {Button} from 'react-native';
import Introduzione from './screen/introdution';
import Ciao from './screen/ciao';
import ExampleApi from './screen/exampleApi';
import LoginScreen from './screen/login';
import {ForgotPw} from './screen/forgotPw';
import Bluetooth from './screen/bluetooth';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        {/*    <Stack.Screen
          name="Home"
          component={}
          options={{title: 'Welcome'}}
        /> */}
        <Stack.Screen name="Homepage" component={Prova} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="Introduzione" component={Introduzione} />
        <Stack.Screen name="Ciao" component={Ciao} />
        <Stack.Screen name="ExampleApi" component={ExampleApi} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ForgotPw" component={ForgotPw} />

        {/*    <Stack.Screen name="UseBle" component={BleeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
