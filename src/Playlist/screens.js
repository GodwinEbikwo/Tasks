import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Animated,
  Button,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export function TranslationContainer({ children, translateY }) {
  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

export const HEADER_HEIGHT = 60;

export function Header({ children }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Button title="Back" onPress={console.log} />
        </View>

        <View style={{ flex: 3 }}>{children}</View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Button title="..." onPress={console.log} />
        </View>
      </View>
    </View>
  );
}

export const SEARCH_PLAYLISTS_HEIGHT = 50;

export function SearchPlaylists() {
  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderRadius: 4,
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: "600",
            padding: 7,
            backgroundColor: "#eee",
            marginRight: 20,
          }}
          placeholder="Find in playlist"
        />
        <TouchableOpacity
          style={{
            borderRadius: 4,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            paddingHorizontal: 10,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 32,
              fontWeight: "600",
            }}
          >
            Filters
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const PLAYLIST_HERO_HEIGHT = 300;

export function PlaylistHero({ children }) {
  return (
    <View
      style={{
        padding: 10,
        minHeight: PLAYLIST_HERO_HEIGHT,
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
}

export function PlaylistItems({ children }) {
  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <View style={{ zIndex: 2 }}>{children}</View>
      <View
        style={{
          padding: 20,
          zIndex: 1,
          marginTop: -SHUFFLE_PLAY_BUTTON_OFFSET,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Download</Text>
          <Switch />
        </View>
        {playlistItems.map((item) => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
        {playlistItems.map((item) => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
        {playlistItems.map((item) => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
        {playlistItems.map((item) => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
      </View>
    </View>
  );
}

export const SHUFFLE_PLAY_BUTTON_HEIGHT = 50;
export const SHUFFLE_PLAY_BUTTON_OFFSET = SHUFFLE_PLAY_BUTTON_HEIGHT / 2;

export function ShufflePlayButton() {
  return (
    <View
      style={{
        transform: [
          {
            translateY: -SHUFFLE_PLAY_BUTTON_OFFSET,
          },
        ],
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          backgroundColor: "white",
        }}
      />

      <TouchableOpacity
        style={{
          alignSelf: "center",
          justifyContent: "center",
          height: SHUFFLE_PLAY_BUTTON_HEIGHT,
          width: 220,
          borderRadius: 30,
          backgroundColor: "#1DB954",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "white",
            fontWeight: "700",
            fontSize: 18,
          }}
        >
          Shuffle Play
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function PlaylistRow({ playlistItem }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <SongComponent
        title={playlistItem.song}
        author={playlistItem.artist}
        album={playlistItem.album}
        onPress={() => this.deleteBookAlert(book)}
      />
    </View>
  );
}

export const playlistItems = [
  {
    id: 0,
    song: `Scott Street`,
    artist: `Phoebe Bridgers`,
    album: `Stranger in the Alps`,
  },
  {
    id: 1,
    song: `Don't Miss It`,
    artist: `James Blake`,
    album: `Assume Form`,
  },
  {
    id: 2,
    song: `Unbearably White`,
    artist: `Vampire Weekend`,
    album: `Father of the Bride`,
  },
  {
    id: 3,
    song: `If You Need To, Keep Time On Me`,
    artist: `Fleet Foxes`,
    album: `Crack-Up`,
  },
  {
    id: 4,
    song: `Small Worlds`,
    artist: `Rayland Baxter`,
    album: `Good Mmornin`,
  },
  {
    id: 5,
    song: `Re: Stacks`,
    artist: `Bon Iver`,
    album: `For Emma, Forever Ago`,
  },
  {
    id: 6,
    song: `Souther Nights`,
    artist: `Whitney`,
    album: `Light Upon the Lake: Demo Recordings`,
  },
];

const SongComponent = ({ title, author, album, onPress, onChange }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{}}>
        <Text
          style={{
            color: "#000",
            fontSize: 17,
            marginBottom: 5,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: "#2c2c2e" }}>{author}</Text>
          <View
            style={{
              width: 4,
              height: 4,
              backgroundColor: "#2c2c2e",
              borderRadius: 2,
              marginHorizontal: 4,
              flexDirection: "row",
            }}
          />
          <Text style={{ fontSize: 14, color: "#2c2c2e" }}>{album}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onChange}>
        <View style={{ justifyContent: "center", right: 10 }}>
          <Feather name={"more-horizontal"} size={23} color="#000" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
