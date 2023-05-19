import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {styles} from '../styles';

const LoginScreen = ({navigation}) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const email = formState.email;
  const handleChange = (key: any, value: any) => {
    setFormState({...formState, [key]: value});
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}></View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <TextInput
          placeholder="Email"
          autoComplete="email"
          style={[styles.inputText]}
          label={'Email ID'}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          style={[styles.inputText]}
          label={'Password'}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry={true}
        />

        <TouchableOpacity>
          <Text
            style={[styles.mainColor, {marginBottom: 30}]}
            onPress={() => {
              navigation.navigate('ForgotPw', {email});
            }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <CustomButton
          label={'Login'}
          onPress={() => {
            navigation.navigate('Homepage');
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}></View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
