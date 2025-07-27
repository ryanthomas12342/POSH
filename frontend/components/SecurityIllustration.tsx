import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function SecurityIllustration() {
  return (
    <View style={styles.illustrationContainer}>
      {/* 3D Illustration elements */}
      <View style={styles.padlockContainer}>
        <View style={styles.padlock} />
      </View>
      
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.inputField} />
          <View style={styles.inputField}>
            <Text style={styles.passwordDots}>••••••••</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.keyContainer}>
        <View style={styles.key} />
      </View>
      
      <View style={styles.gearContainer}>
        <View style={styles.gear} />
      </View>
      
      <View style={styles.warningContainer}>
        <View style={styles.warningSign} />
      </View>
      
      <View style={styles.envelopeContainer}>
        <View style={styles.envelope} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    width: Platform.OS === 'web' ? 300 : 280,
    height: Platform.OS === 'web' ? 200 : 180,
    position: 'relative',
    alignSelf: 'center',
  },
  padlockContainer: {
    position: 'absolute',
    top: 20,
    left: '50%',
    marginLeft: -15,
  },
  padlock: {
    width: 30,
    height: 30,
    backgroundColor: '#0066CC',
    borderRadius: 5,
  },
  cardContainer: {
    position: 'absolute',
    top: 60,
    left: '50%',
    marginLeft: -60,
  },
  card: {
    width: 120,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'space-between',
  },
  inputField: {
    height: 25,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordDots: {
    color: '#000000',
    fontSize: 12,
  },
  keyContainer: {
    position: 'absolute',
    top: 80,
    left: 40,
  },
  key: {
    width: 20,
    height: 30,
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
  },
  gearContainer: {
    position: 'absolute',
    top: 60,
    right: 40,
  },
  gear: {
    width: 25,
    height: 25,
    backgroundColor: '#C0C0C0',
    borderRadius: 12.5,
  },
  warningContainer: {
    position: 'absolute',
    top: 100,
    right: 40,
  },
  warningSign: {
    width: 20,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 10,
  },
  envelopeContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  envelope: {
    width: 25,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
}); 