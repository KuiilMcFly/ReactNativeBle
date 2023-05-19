import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  /*   NativeEventEmitter, */
  Alert,
  SafeAreaView,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import Kontakt, {KontaktModule} from 'react-native-kontaktio';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {styles} from '../styles';
import CustomButton from '../components/CustomButton';

const {connect, init, startDiscovery, startScanning, stopScanning} = Kontakt;
export class BleeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: true,
      currentPassword: '',
      unlockModal: false,
      savedPassword: '',
      changePasswordModal: false,
      batteryLevel: '-',
      foundBeacon: [],
      dataBeacon: [],
      loading: false,
      tensorflow_mode: true,
    };
  }

  async findBeacon() {
    await connect();
    await startScanning();

    this.setState({loading: false});

    /*     const emitter = new NativeEventEmitter();
    const subscription = emitter.addListener(
      'beaconsDidUpdate',
      ({beacons, region}) => {
        this.setState({foundBeacon: beacons});
      },
    );
    this.setState({subscription}); */
  }
  getLocationPermission() {
    request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('Errore', 'Bluetooth non disponibile', [
              {
                style: 'cancel',
                text: 'CHIUDI',
                onPress: () => navigation.navigate('Homepage'),
              },
            ]);
            break;
          case RESULTS.DENIED:
            Alert.alert(
              'Attenzione',
              "Quest'app richiede i permessi di bluetooth per funzionare",
              [
                {
                  style: 'cancel',
                  text: 'Chiedimelo di nuovo',
                },
              ],
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            this.findBeacon();
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              'Permesso di bluetooth rifiutato',
              "Vai nelle impostazioni dell'app e consenti di usare il bluetooth",
              [
                {
                  style: 'cancel',
                  text: 'CHIUDI',
                },
              ],
            );
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
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
            Bluetooth
          </Text>

          <CustomButton
            label={'blueetoth'}
            onPress={async () => {
              this.getLocationPermission();
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
  }
}
