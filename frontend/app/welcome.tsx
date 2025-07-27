import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push("/what-is-posh");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleCreateAccount = () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8D5C4" />
      <View style={styles.content}>
        {/* Main text content */}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Be strong.</Text>
          <Text style={styles.mainText}>Be Empowered.</Text>
          <Text style={styles.mainText}>Be Safe.</Text>
        </View>

        {/* Bottom section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={handleLearnMore}
          >
            <View style={styles.inlineRow}>
              <Text style={styles.learnMoreText}>Learn About POSH</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={24}
                color="#000000"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>New User?</Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.createAccountLink}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBD7DB", // Muted pinkish-brown background
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  mainText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginBottom: 8,
    textAlign: "left",
  },
  bottomSection: {
    alignItems: "flex-start",
  },
  learnMoreButton: {
    marginBottom: 30,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  learnMoreText: {
    fontSize: 25,
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#000000",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  createAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  createAccountText: {
    fontSize: 14,
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  createAccountLink: {
    fontSize: 14,
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    textDecorationLine: "underline",
  },
});
