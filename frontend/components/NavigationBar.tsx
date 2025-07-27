import React from 'react';
import { View, StyleSheet, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const { width, height } = Dimensions.get('window');

const NavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path : string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity onPress={() => handleNavigate('/what-is-posh')}>
        <Ionicons
          name={pathname === '/what-is-posh' ? 'home' : 'home-outline'}
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigate('/chat')}>
        <Ionicons
          name={pathname === '/chat' ? 'chatbubble' : 'chatbubble-outline'}
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigate('/AI-chat')}>
        <Ionicons
          name="sparkles-outline"
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigate('/about-user')}>
        <Ionicons
          name={pathname === '/about-user' ? 'person' : 'person-outline'}
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default NavigationBar;
