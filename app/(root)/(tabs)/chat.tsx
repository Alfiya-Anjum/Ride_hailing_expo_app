import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { sendMessageToGroq } from "../../../lib/groq";

export default function ChatScreen() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessageToGroq(input);
      setMessages((prev) => [...prev, { sender: "AI", text: response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "AI", text: "Error retrieving response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* Chat Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask something..."
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <Button title={loading ? "Thinking..." : "Send"} onPress={handleSend} disabled={loading} />
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={styles.messages}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              msg.sender === "You" ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.senderText}>{msg.sender}:</Text>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  messages: {
    paddingBottom: 30,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#dbeafe",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#f3f4f6",
    alignSelf: "flex-start",
  },
  senderText: {
    fontWeight: "600",
    marginBottom: 4,
    color: "#555",
  },
  messageText: {
    color: "#111",
  },
});
