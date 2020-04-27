import React from "react";
import { View, Animated, SafeAreaView, Image } from "react-native";
import {
  Header,
  SHUFFLE_PLAY_BUTTON_OFFSET,
  TranslationContainer,
  SearchPlaylists,
  ShufflePlayButton,
  PlaylistItems,
  PlaylistHero,
} from "./screens";

const EMPTY_RECT = {
  x: 0,
  y: 0,
  width: 0,

  height: 100,
};

function PlaylistProfile() {
  const scrollY = React.useRef(new Animated.Value(0));

  const [searchLayout, setSearchLayout] = React.useState(EMPTY_RECT);
  const [heroLayout, setHeroLayout] = React.useState(EMPTY_RECT);

  const clampHeroSection = Animated.add(
    scrollY.current,

    scrollY.current.interpolate({
      inputRange: [0, searchLayout.height],
      outputRange: [0, -searchLayout.height],
      extrapolateRight: "clamp",
    })
  );

  const PLAYLIST_ITEMS_OFFSET = heroLayout.height + searchLayout.height;

  const clampShuffleButton = Animated.add(
    scrollY.current,

    scrollY.current.interpolate({
      inputRange: [0, PLAYLIST_ITEMS_OFFSET - SHUFFLE_PLAY_BUTTON_OFFSET],
      outputRange: [0, -PLAYLIST_ITEMS_OFFSET + SHUFFLE_PLAY_BUTTON_OFFSET],
      extrapolateRight: "clamp",
    })
  );

  const headerTitleOpacity = scrollY.current.interpolate({
    inputRange: [0, PLAYLIST_ITEMS_OFFSET / 2, PLAYLIST_ITEMS_OFFSET],
    outputRange: [0, 0, 1],
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
    { useNativeDriver: true }
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header>
        <Animated.Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
            opacity: headerTitleOpacity,
          }}
        >{`Hey, Ma Radio`}</Animated.Text>
      </Header>

      <Animated.ScrollView
        contentOffset={{ y: searchLayout.height }}
        onScroll={handleScroll}
        style={{ flex: 1 }}
      >
        <View
          onLayout={({ nativeEvent: { layout } }) => setSearchLayout(layout)}
        >
          <SearchPlaylists />
        </View>

        <TranslationContainer translateY={clampHeroSection}>
          <View
            onLayout={({ nativeEvent: { layout } }) => setHeroLayout(layout)}
          >
            <PlaylistHero>
              <View
                style={{
                  shadowColor: "#ff6f5e",
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.33,
                  shadowRadius: 9.51,

                  elevation: 15,
                }}
              >
                <Image
                  style={{
                    height: 220,
                    width: 220,
                    backgroundColor: "#f7f7f7",
                    borderRadius: 5,
                  }}
                  source={{
                    uri:
                      "https://p15.f3.n0.cdn.getcloudapp.com/items/RBudD4pX/oleg-laptev-QRKJwE6yfJo-unsplash.jpg?v=170bc88dfa34d5faf7173f2418b36278",
                  }}
                />
              </View>
            </PlaylistHero>
          </View>
        </TranslationContainer>

        <PlaylistItems>
          <TranslationContainer translateY={clampShuffleButton}>
            <ShufflePlayButton />
          </TranslationContainer>
        </PlaylistItems>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function PlayList_App() {
  return <PlaylistProfile />;
}

export default PlayList_App;
