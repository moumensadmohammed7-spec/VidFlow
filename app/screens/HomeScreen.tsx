import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import LinkInput from "../components/LinkInput";
import API from "../services/api";

export default function HomeScreen() {
  const [url, setUrl] = useState("");
  const [formats, setFormats] = useState<any[]>([]);

  const handleDownload = async () => {
    if (!url.trim()) {
      Alert.alert("Error", "Please paste a video link first.");
      return;
    }

    try {
       const response = await API.post("/video/info", { url });
      if (response.data.success) {
        setFormats(response.data.formats || []);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error: any) {
      if (error?.response) {
        Alert.alert(
          "Server Error",
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        Alert.alert(
          "Connection Error",
          error?.message || "Unknown error"
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <LinkInput url={url} setUrl={setUrl} />

      <TouchableOpacity
        style={styles.button}
        onPress={handleDownload}
      >
        <Text style={styles.buttonText}>
          Download
        </Text>
      </TouchableOpacity>
      <FlatList
        data={formats}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.quality}>{item.quality}</Text>
              <Text style={styles.ext}>{item.ext.toUpperCase()}</Text>
            </View>

            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={async () => {
                try {
                  const response = await API.post("/download-file", {
                    url,
                    format_id: item.format_id,
                  });

                  if (
                    response.data.success &&
                    response.data.download_url
                  ) {
                    console.log(response.data);
                    const fileUri =
                      FileSystem.cacheDirectory +
                      response.data.filename;

                    const result =
                      await FileSystem.downloadAsync(
                        response.data.download_url,
                        fileUri
                      );

const { status } = await MediaLibrary.requestPermissionsAsync();

if (status !== "granted") {
  Alert.alert("Permission denied", "Storage permission is required.");
  return;
}

await MediaLibrary.saveToLibraryAsync(result.uri);

Alert.alert(
  "Success",
  "Video saved successfully to your gallery."
);
                  } else {
                    Alert.alert(
                      "Error",
                      "Download URL not found."
                    );
                  }
                } catch (error: any) {
                  if (error?.response) {
                    Alert.alert(
                      "Server Error",
                      JSON.stringify(
                        error.response.data,
                        null,
                        2
                      )
                    );
                  } else {
                    Alert.alert(
                      "Connection Error",
                      error?.message || "Unknown error"
                    );
                  }
                }
              }}
            >
              <Text style={styles.downloadText}>
                Download
              </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#F5F7FB",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quality: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ext: {
    color: "#666",
    marginTop: 4,
  },
  downloadBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
