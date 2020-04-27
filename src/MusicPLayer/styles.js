import { StyleSheet, Dimensions } from "react-native";

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get(
  "window"
);
export const FONT_SIZE = 14;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  textLight: {
    color: "#2c2c2e",
    fontWeight: "500",
  },
  text: {
    color: "#181818",
  },
  textDark: {
    color: "#181818",
    fontWeight: "500",
  },
  coverContainer: {
    marginTop: 32,
    width: DEVICE_WIDTH - 50,
    height: 350,
  },
  cover: {
    width: DEVICE_WIDTH - 50,
    height: 350,
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: "#000",
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: "#3D425C",
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: "500",
  },
  playButtonContainer: {
    backgroundColor: "#181818",
    borderColor: "rgba(93, 63, 106, 0.2)",
    borderWidth: 16,
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 12,
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
    color: "#181818",
    fontWeight: "500",
  },
  timestampRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    minHeight: FONT_SIZE,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: DEVICE_WIDTH - 40,
    maxWidth: DEVICE_WIDTH - 40,
    padding: 5,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 4,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainerTopRow: {
    maxHeight: 40,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
});
