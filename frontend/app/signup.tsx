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
} from "react-native";
import { useRouter } from "expo-router";
import SecurityIllustration from "@/components/SecurityIllustration";
import { supabase } from "@/constants/supabase";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!name || !email || !password || !phoneNumber) {
      setError("Please fill all required fields.");
      return;
    }
    console.log(name, email, password, phoneNumber);
    setLoading(true);
    // Supabase signup
    try {
      const response = await fetch(
        "http://172.20.181.253.20.181.106:4000/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone: phoneNumber }),
        }
      );
      const result = await response.json();

      console.log(result);
      if (!response.ok) {
        setError(result.messasge || "Signup failed");
        setLoading(false);
        return;
      }
      setSuccess(
        result.message || "Signup successful! Please check your email."
      );
      setLoading(false);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
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

          {/* Bottom Section - Signup Form */}
          <View style={styles.bottomSection}>
            <Text style={styles.signupTitle}>SIGNUP</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ENTER NAME"
                placeholderTextColor="#FFFFFF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ENTER EMAIL"
                placeholderTextColor="#FFFFFF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="CREATE PASSWORD"
                placeholderTextColor="#FFFFFF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ENTER PHONE NUMBER"
                placeholderTextColor="#FFFFFF"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.loginText}>
                {loading ? "Signing up..." : "Signup"}
              </Text>
            </TouchableOpacity>
            {error ? (
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                {error}
              </Text>
            ) : null}
            {success ? (
              <Text
                style={{ color: "green", textAlign: "center", marginTop: 10 }}
              >
                {success}
              </Text>
            ) : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Existing User? Login</Text>
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
    backgroundColor: "#EBD7DB", // Light purple-beige background
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
  signupTitle: {
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
  loginButton: {
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
});
