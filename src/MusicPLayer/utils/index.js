import { Dimensions } from "react-native";
import { Asset } from "expo-asset";

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class PlaylistItem {
  constructor(name, uri, image) {
    this.name = name;
    this.uri = uri;
    this.image = image;
  }
}

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get(
  "window"
);

export const ICON_THUMB_1 = new Icon(
  require("../../../assets/images/thumb_1.png"),
  18,
  19
);

export const BACKGROUND_COLOR = "#212121";
export const DISABLED_OPACITY = 0.5;
export const FONT_SIZE = 14;
export const LOADING_STRING = "Loading...";
export const BUFFERING_STRING = "Buffering...";
export const RATE_SCALE = 3.0;
export const LOOPING_TYPE_ALL = 0;
export const LOOPING_TYPE_ONE = 1;
export const LOOPING_TYPE_ICONS = {
  0: ICON_LOOP_ALL_BUTTON,
  1: ICON_LOOP_ONE_BUTTON,
};

export const ICON_LOOP_ALL_BUTTON = new Icon(
  require("../../../assets/images/loop_all_button.png"),
  77,
  35
);
export const ICON_LOOP_ONE_BUTTON = new Icon(
  require("../../../assets/images/loop_one_button.png"),
  77,
  35
);

export const PLAYLIST = [
  new PlaylistItem(
    "Comfort Fit - “Sorry”",
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    "https://p15.f3.n0.cdn.getcloudapp.com/items/GGuNWAOr/the-honest-company-oqmIM9bkAWQ-unsplash.jpg?v=a4f04221a47ea679cec4cbe13de8498e"
  ),
  new PlaylistItem(
    "Mildred Bailey – “All Of Me”",
    "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    "https://p15.f3.n0.cdn.getcloudapp.com/items/v1urWbjL/BlurredStreets.jpg?v=ba6e39a6c477a34b9b24c6d77e23f8b9"
  ),
  new PlaylistItem(
    "Podington Bear - “Rubber Robot”",
    "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    "https://p15.f3.n0.cdn.getcloudapp.com/items/BluBWLw4/jordan-whitfield-3cNc1U7nJcs-unsplash.jpg?v=03f873aee8f537881768c93023ee0668"
  ),
];
