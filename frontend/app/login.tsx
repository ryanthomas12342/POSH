import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import SecurityIllustration from "@/components/SecurityIllustration";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://172.20.181.253:4000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        router.replace("/case-files");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8D5C4" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Section - Illustration */}
          <View style={styles.topSection}>
            <SecurityIllustration />
          </View>

          {/* Bottom Section - Login Form */}
          <View style={styles.bottomSection}>
            <Text style={styles.loginTitle}>LOGIN</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ENTER EMAIL"
                placeholderTextColor="#FFFFFF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ENTER PASSWORD"
                placeholderTextColor="#FFFFFF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={handleCreateAccount}
            >
              <Text style={styles.createAccountText}>
                New User? Create Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.createAccountButton, { marginTop: 10 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.createAccountText}>
                {loading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBD7DB", // Light purple-pink background
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topSection: {
    flex: 1,
    backgroundColor: "#EBD7DB",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#EBD7DB", // Light grey background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 40,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#9B7192", // Dark purple/plum color
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  createAccountButton: {
    alignItems: "center",
    marginTop: 20,
  },
  createAccountText: {
    fontSize: 16,
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});
