import React, {useState, useEffect} from 'react';
import {Button, ScrollView, Text, View, Modal} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const ExampleApi = () => {
  const [scannedDevices, setScannedDevices] = useState([]);
  const [scannedDeviceCount, setScannedDeviceCount] = useState(0);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const manager = new BleManager();
  
  const requestLocationPermission = async () => {
    try {
      const granted = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN, {
        title: 'Location permission for bluetooth scanning',
        message: 'Whatever message you want to show',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === RESULTS.GRANTED) {
        console.log('Location permission for bluetooth scanning granted');
        return true;
      } else {
        console.log('Location permission for bluetooth scanning revoked');
        return false;
      }
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  const deviceScan = () => {
    requestLocationPermission().then(permission => {
      if (permission) {
        let timerId;
        const devices = new Map();

        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log('device id: ', device.id);
          console.log('device name: ', device.name);

          if (!devices.has(device.id)) {
            devices.set(device.id, {
              id: device.id,
              name: device.name || 'Unknown Device',
            });

            setScannedDeviceCount(count => count + 1);
            setScannedDevices(Array.from(devices.values()));
          }

          if (scannedDeviceCount >= 9) {
            clearTimeout(timerId);
            deviceStopScan();
          }
        });

        timerId = setTimeout(() => {
          deviceStopScan();
        }, 10000);
      }
    });
  };

  const deviceStopScan = () => {
    manager.stopDeviceScan();
  };

  const connectToDevice = async deviceId => {
    try {
      const device = await manager.connectToDevice(deviceId);
      console.log('Connected to device:', device.name);

      setConnectedDevice({
        id: device.id,
        name: device.name,
        serviceUUIDs: device.serviceUUIDs,
        mtu: device.mtu,
      });

      // Do something with the connected device
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    if (connectedDevice) {
      const serviceUUID = 'battery_service_uuid'; // Replace with the UUID of the battery service
      const characteristicUUID = 'battery_level_uuid'; // Replace with the UUID of the battery characteristic

      const readBatteryLevel = async () => {
        try {
          const characteristic = await manager.readCharacteristicForDevice(
            connectedDevice.id,
            serviceUUID,
            characteristicUUID,
          );
          const batteryLevel = characteristic.value[0];
          setBatteryLevel(batteryLevel);
        } catch (error) {
          console.warn(error);
        }
      };

      readBatteryLevel();
    }
  }, [connectedDevice]);

  return (
    <View>
      <Text>Hello World</Text>
      <Button title="Scannerizza" onPress={deviceScan} />
      <Button title="Annulla scannerizzazione" onPress={deviceStopScan} />
      <ScrollView>
        {scannedDevices.map(device => (
          <Button
            key={device.id}
            title={`Connetti a dispositivo ${device.name}`}
            onPress={() => connectToDevice(device.id)}
          />
        ))}
      </ScrollView>
      <Modal visible={!!connectedDevice} animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{connectedDevice?.name || ''}</Text>
          <Text>{connectedDevice?.id || ''}</Text>
          <Text>Ciao sono un testo strano</Text>
          <Text>
            Stato connessione: {connectedDevice ? 'Connesso' : 'Non connesso'}
          </Text>

          {batteryLevel !== null && (
            <Text> Livello batteria: {batteryLevel}%</Text>
          )}

          <Button title="Chiudi" onPress={() => setConnectedDevice(null)} />
        </View>
      </Modal>
    </View>
  );
};
export default ExampleApi;

