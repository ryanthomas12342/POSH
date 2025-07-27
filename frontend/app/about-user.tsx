import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';


import NavigationBar from '../components/NavigationBar';

const { width, height } = Dimensions.get('window');

export default function AboutUserScreen() {
  const router = useRouter();

  const pathname = usePathname();

  const handleHome = () => router.push('/what-is-posh');
  const handleChat = () => router.push('/AI-chat');
  const handleUser = () => router.push('/about-user');
  const handleLogOut = () => router.push('/welcome');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6E6FA" />

      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogOut}>
          <Ionicons name="log-out-outline" size={30} color="#2C2C2C" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <Image
          source={require('../assets/images/avatar.jpg')} // replace with your local avatar image path
          style={styles.avatar}
        />

        {/* Name */}
        <Text style={styles.nameText}>Name</Text>

        {/* Info Cards */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Phone number</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Email</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Organization</Text>
        </View>
      </ScrollView>

      {/* Navigation Bar */}
      <NavigationBar></NavigationBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C2C2C',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: '#F0F0FF',
    width: width * 0.85,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: '#2C2C2C',
  },
  logoutContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    zIndex: 10,
  },
  navigationBar: {
    position: 'absolute',
    bottom: height * 0.03,
    left: width * 0.05,
    right: width * 0.05,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: height * 0.09,
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
});
