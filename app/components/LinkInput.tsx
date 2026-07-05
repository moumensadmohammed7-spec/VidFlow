import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as Clipboard from "expo-clipboard";

type Props = {
  url: string;
  setUrl: (text: string) => void;
};

export default function LinkInput({ url, setUrl }: Props) {
  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setUrl(text);
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Paste video link here..."
        placeholderTextColor="#888"
        value={url}
        onChangeText={setUrl}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={pasteFromClipboard}
      >
        <Text style={styles.buttonText}>Paste</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginRight: 10,
  },

  button: {
    backgroundColor: "#10B981",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
