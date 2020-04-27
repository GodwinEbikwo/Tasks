import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";

import _ from "lodash";

export const SubtitleView = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text numberOfLines={2} style={styles.subtitle}>
        {props.subtitle}
      </Text>
    </View>
  );
};
export const ButtonView = ({ color, subtitle, textColor, bWidth }) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          borderWidth: bWidth || "transparent",
          padding: 10,
          paddingVertical: 7,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color || "transparent",
          borderRadius: 3,
        }}
      >
        <Text
          numberOfLines={2}
          style={[styles.buttonViewText, { color: textColor || "#000" }]}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  title: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },
  textSubtitle: {
    color: "#313131",
    fontSize: 13,
  },
  subtitle: {
    color: "#313131",
    fontSize: 13,
    fontWeight: "400",
    marginTop: 7,
    textTransform: "capitalize",
  },
  buttonViewText: {
    fontSize: 12,
    fontWeight: "400",
    textTransform: "capitalize",
  },
  headerView: {
    alignItems: "center",
    justifyContent: "center",
  },
  MPS: {
    fontWeight: "700",
    fontSize: 20,
    color: "#222831",
  },
  searchBar: {
    flexDirection: "row",
    padding: 7,
    backgroundColor: "#eee",
    marginHorizontal: 20,
    borderRadius: 30,
    marginTop: Platform.OS == "android" ? 8 : 8,
  },
});
