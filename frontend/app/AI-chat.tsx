import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  Dimensions,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import NavigationBar from "@/components/NavigationBar";

const { width, height } = Dimensions.get("window");

export default function AIChatScreen() {
  type Message = { role: "user" | "assistant"; content: string };
  const [chat, setChat] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleHome = () => {
    router.push("/what-is-posh");
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chat]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setChat((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    Keyboard.dismiss();

    try {
      const res = await fetch("http://172.20.181.253:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const responseText = data?.response || "No response.";
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: responseText },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to backend." },
      ]);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 24
        }
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconLeft}
              onPress={() => console.log("History pressed")} // or router.push('/history')
            >
              <Ionicons name="time-outline" size={24} color="#2C2C2C" />
            </TouchableOpacity>

            <Text style={styles.headerText}>POSH -AI</Text>

            <TouchableOpacity
              style={styles.iconRight}
              onPress={handleHome} // or router.push('/')
            >
              <Ionicons name="home-outline" size={24} color="#2C2C2C" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {chat.map((msg, idx) => (
              <View
                key={idx}
                style={[
                  styles.bubble,
                  msg.role === "user" ? styles.userBubble : styles.llmBubble,
                ]}
              >
                {msg.role === "assistant" ? (
                  <Markdown style={markdownStyles}>{msg.content}</Markdown>
                ) : (
                  <Text style={styles.bubbleText}>{msg.content}</Text>
                )}
              </View>
            ))}

            {loading && (
              <View style={[styles.bubble, styles.llmBubble]}>
                <ActivityIndicator color="#2C2C2C" size="small" />
              </View>
            )}
          </ScrollView>

          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Chat..."
              placeholderTextColor="#ccc"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              editable={!loading}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={loading || !input.trim()}
            >
              <Ionicons name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    height: 50,
  },
  iconLeft: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 20,
    justifyContent: "center",
    height: "100%",
  },
  iconRight: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 20,
    justifyContent: "center",
    height: "100%",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    lineHeight: 34,
    letterSpacing: 1,
  },
  bubble: {
    maxWidth: "80%",
    marginBottom: 18,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    alignSelf: "flex-end",
    borderRadius: 18,
    borderBottomRightRadius: 5,
    backgroundColor: "#D8D8F0",
  },
  llmBubble: {
    alignSelf: "flex-start",
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    backgroundColor: "#C4C4E9",
  },
  bubbleText: {
    fontSize: 16,
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#000000",
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
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    marginRight: 10,
    paddingVertical: 6,
  },
});

const markdownStyles = {
  body: {
    fontSize: 16,
    color: "#2C2C2C",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  bullet_list: {
    marginVertical: 4,
  },
};
