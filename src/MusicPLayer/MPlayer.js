import React from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  Slider,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { Audio } from "expo-av";
import * as Font from "expo-font";
import { MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { styles } from "./styles";
import {
  PLAYLIST,
  ICON_THUMB_1,
  LOADING_STRING,
  BUFFERING_STRING,
  RATE_SCALE,
} from "./utils/index";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

class MPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      playbackInstanceName: LOADING_STRING,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      volume: 1.0,
      rate: 1.0,
      portrait: null,
      isReady: false,
      loading: true,
      loopingType: LOOPING_TYPE_ALL,
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    (async () => {
      await Font.loadAsync({
        CutiveMono: require("../../assets/fonts/CutiveMono-Regular.ttf"),
      });
      this.setState({ fontLoaded: true });
    })();

    this._loadNewPlaybackInstance(false);
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      "https://p15.f3.n0.cdn.getcloudapp.com/items/GGuNWAOr/the-honest-company-oqmIM9bkAWQ-unsplash.jpg?v=a4f04221a47ea679cec4cbe13de8498e",
      "https://p15.f3.n0.cdn.getcloudapp.com/items/v1urWbjL/BlurredStreets.jpg?v=ba6e39a6c477a34b9b24c6d77e23f8b9",
      "https://p15.f3.n0.cdn.getcloudapp.com/items/BluBWLw4/jordan-whitfield-3cNc1U7nJcs-unsplash.jpg?v=03f873aee8f537881768c93023ee0668",
    ]);

    await Promise.all([...imageAssets]);
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = { uri: PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      volume: this.state.volume,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;
    this._updateScreenForLoading(false);
  }

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this.setState({
        playbackInstanceName: PLAYLIST[this.index].name,
        portrait: PLAYLIST[this.index].image,
        isLoading: false,
      });
    }
  }
  _onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        volume: status.volume,
      });
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onVolumeSliderValueChange = (value) => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async (value) => {
    this._trySetRate(value * RATE_SCALE);
  };

  _onSeekSliderValueChange = (value) => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async (value) => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
  }

  _onLoopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(
        this.state.loopingType !== LOOPING_TYPE_ONE
      );
    }
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View style={{ alignItems: "center", marginTop: 24 }}>
            <Text style={styles.text}>{this.state.playbackInstanceName}</Text>
          </View>

          <View style={styles.coverContainer}>
            <Image source={{ uri: this.state.portrait }} style={styles.cover} />
          </View>

          <View style={{ alignItems: "center", marginTop: 32 }}>
            <Text
              style={[styles.textDark, { fontSize: 20, fontWeight: "500" }]}
            >
              Exhale
            </Text>
            <Text style={[styles.text, { fontSize: 16, marginTop: 8 }]}>
              Jeremy Blake
            </Text>
          </View>
        </View>

        <View style={{ margin: 32 }}>
          <Slider
            style={styles.playbackSlider}
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            thumbTintColor="#fefef5"
            minimumTrackTintColor="#181818"
            thumbImage={ICON_THUMB_1.module}
            disabled={this.state.isLoading}
          />
          <View style={styles.timestampRow}>
            <Text style={[styles.text, styles.buffering]}>
              {this.state.isBuffering ? BUFFERING_STRING : ""}
            </Text>
            <Text style={[styles.text, styles.timestamp]}>
              {this._getTimestamp()}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            onPress={this._onBackPressed}
            disabled={this.state.isLoading}
          >
            <View>
              <FontAwesome5 name="backward" size={32} color="#181818" />
            </View>
          </TouchableOpacity>

          <TouchableHighlight
            style={styles.playButtonContainer}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}
          >
            <View>
              {this.state.isPlaying ? (
                <FontAwesome5 name="pause" size={36} color="#fff" />
              ) : (
                <FontAwesome5 name="play" size={36} color="#fff" />
              )}
            </View>
          </TouchableHighlight>

          <TouchableOpacity
            onPress={this._onForwardPressed}
            disabled={this.state.isLoading}
          >
            <View>
              <FontAwesome5 name="forward" size={32} color="#181818" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onLoopPressed}
            disabled={this.state.isLoading}
            style={{ padding: 15 }}
          >
            <View>
              <Feather name="repeat" size={22} color="#181818" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerMiddleRow,
          ]}
        >
          <View style={styles.volumeContainer}>
            <View>
              <MaterialIcons name="volume-down" size={32} color="#181818" />
            </View>
            <Slider
              style={styles.volumeSlider}
              value={this.state.rate / RATE_SCALE}
              onValueChange={this._onVolumeSliderValueChange}
              minimumTrackTintColor="#181818"
              thumbImage={ICON_THUMB_1.module}
            />
            <View>
              <MaterialIcons name="volume-up" size={32} color="#181818" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default MPlayer;
