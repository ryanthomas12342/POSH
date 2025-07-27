import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

import NavigationBar from '../components/NavigationBar';
const { width, height } = Dimensions.get('window');

export default function WhatIsPOSHScreen() {
  const router = useRouter();
  const handleSections = () => {
    router.push('/sections');
  };
  const handleUserInfo = () => {
    router.push('/about-user');
  }

  const handleAIchat = () =>{
    router.push('/AI-chat')
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6E6FA" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>What is{"\n"}POSH?</Text>
        </View>

        {/* Information Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            POSH (Prevention of Sexual{"\n"}
            Harassment) ensures safe{"\n"}
            workplaces by legally protecting{"\n"}
            individuals from sexual{"\n"}
            harassment and enabling{"\n"}
            redressal.
          </Text>
        </View>

        {/* New Info Boxes */}
        <TouchableOpacity onPress={handleSections}>
          <View style={[styles.infoBox, styles.infoBoxRow]}>
            <View style={styles.infoBoxTextContainer}>
              <Text style={styles.infoText}>
                <Text style={styles.infoHeading}>Legal Sections{"\n"}</Text>
                Read about the legal sections of POSH{"\n"}
                and know your rights!
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={28} color="#2C2C2C" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/case-files')}>
          <View style={[styles.infoBox, styles.infoBoxRow]}>
            <View style={styles.infoBoxTextContainer}>
              <Text style={styles.infoText}>
                <Text style={styles.infoHeading}>Case Files{"\n"}</Text>
                Read about cases and their outcomes
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={28} color="#2C2C2C" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Bar */}

      <NavigationBar></NavigationBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA', // Light purple background
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2C2C2C',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    lineHeight: 34,
  },
  infoBox: {
    backgroundColor: '#F0F0FF', // Lighter purple for the box
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  infoBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoBoxTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  arrowIcon: {
    alignSelf: 'center',
  },
  infoHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  infoText: {
    fontSize: 16,
    color: '#2C2C2C',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    lineHeight: 24,
  },

  navigationBar: {
    position: 'absolute',
    bottom: height * 0.03, // 3% from the bottom
    left: width * 0.05,    // 5% margin on the left
    right: width * 0.05,   // 5% margin on the right
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height * 0.09, // 9% of screen height
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,

    ...Platform.select({
      ios: {
        paddingBottom: 25,
      },
      android: {
        paddingBottom: 10,
      },
    }),
  },

  navIcon: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
}); 