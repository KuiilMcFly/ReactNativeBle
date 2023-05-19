import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    backgroundColor: '#063970',
    padding: '38%',
    borderRadius: 15,
  },

  formFont: {
    color: 'white',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },

  inputStyle: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },

  buttonStyle: {
    gap: 15,
  },

  homeButtons: {
    marginTop: 30,
    gap: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  bluetoothButton: {
    alignItems: 'center',
    marginTop: 40,
  },

  BTtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
  },

  scannerContainer: {
    alignItems: 'center',
    gap: 10,
  },
  scanText: {
    fontSize: 22,
    marginTop: 20,
  },
  closeModalStyle: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: 'white',
    backgroundColor: 'blue',
    fontSize: 22,
  },

  deviceData: {
    color: 'black',
  },
});

export default styles;
