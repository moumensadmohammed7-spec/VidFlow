import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import LinkInput from "../components/LinkInput";
import VideoCard from "../components/VideoCard";
import API from "../services/api";

export default function HomeScreen() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState<any>(null);

  const handleDownload = async () => {
    if (!url.trim()) {
      Alert.alert("Error", "Please paste a video link first.");
      return;
    }

    try {
      const response = await API.post("/download", {
        url,
      });

      setVideo(response.data);
    } catch (error: any) {
      console.log(error);

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
      <Text style={styles.logo}>🎬</Text>

      <Text style={styles.title}>VidFlow</Text>

      <Text style={styles.subtitle}>
        Download videos quickly and easily
      </Text>

      <LinkInput
        url={url}
        setUrl={setUrl}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleDownload}
      >
        <Text style={styles.buttonText}>
          Download
        </Text>
      </TouchableOpacity>

      {video && (
        <VideoCard
          title={video.title}
          thumbnail={video.thumbnail}
          uploader={video.uploader}
          duration={video.duration}
        />
      )}

      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>🛠️</Text>
          <Text style={styles.cardText}>Tools</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>📁</Text>
          <Text style={styles.cardText}>Downloads</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E40AF",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 8,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },

  cards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  card: {
    width: "48%",
    backgroundColor: "#F5F7FB",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
  },

  cardIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E40AF",
  },
});
