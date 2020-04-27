import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MPlayer from "./src/MusicPLayer/MPlayer";
import PlayList from "./src/Playlist/PlayList";
import FollowerRequest from "./src/FollowersRequest";

export default function App() {
  return (
    <View style={styles.container}>
      <PlayList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
