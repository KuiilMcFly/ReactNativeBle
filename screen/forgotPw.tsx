import React, {Component} from 'react';
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

export const ForgotPw = ({route, navigation}) => {
  console.log(route.params);
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}></View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Recupera password
        </Text>

        <TextInput
          defaultValue={route.params.email}
          style={styles.inputText}
          label={'Email'}
          autoComplete="email"
          keyboardType="email-address"
        />

        <CustomButton label={'Invia'} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};
