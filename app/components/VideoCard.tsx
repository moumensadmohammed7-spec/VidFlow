import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
  title: string;
  thumbnail: string;
  uploader: string;
  duration: number;
};

export default function VideoCard({
  title,
  thumbnail,
  uploader,
  duration,
}: Props) {
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: thumbnail }} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.info}>
        👤 {uploader}
      </Text>

      <Text style={styles.info}>
        ⏱️ {formatDuration(duration)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5F7FB",
    borderRadius: 16,
    padding: 15,
    marginTop: 20,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },

  info: {
    color: "#666",
    marginTop: 4,
  },
});
