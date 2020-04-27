import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styles, ButtonView, SubtitleView } from "./components/index";

import { getSongs, contains } from "../api/index";
import _ from "lodash";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

class FollowerRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      query: "",
      fullData: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = _.debounce(() => {
    this.setState({ loading: true });

    getSongs(15, this.state.query)
      .then((songs) => {
        this.setState({
          loading: false,
          data: songs,
          fullData: songs,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }, 250);

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#eee",
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 10,
          // marginTop: Platform.OS === "ios" ? null : 30,
        }}
      >
        <View style={styles.searchBar}>
          <Ionicons
            name="ios-search"
            size={20}
            color={"grey"}
            style={{ backgroundColor: "transparent", marginHorizontal: 10 }}
          />
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Try Katie Jones..."
            placeholderTextColor="grey"
            onChangeText={this.handleSearch}
            keyboardAppearance={"light"}
            clearTextOnFocus={false}
            style={{
              flex: 1,
              fontWeight: "700",
              backgroundColor: "#eee",
              color: "#fff",
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.headerView}>
          <Text style={styles.MPS}>Follower Request</Text>
        </View>

        <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.artist}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              key={item.artist}
              onPress={() => console.log("I was clicked")}
            >
              <View style={{ flex: 1 }}>
                <ListItem
                  title={`${item.name.first} ${item.name.last}`}
                  subtitle={<SubtitleView subtitle={item.artistName} />}
                  leftAvatar={{
                    source: { uri: item.picture.large },
                    size: "medium",
                    rounded: true,
                  }}
                  containerStyle={{
                    borderBottomWidth: 0,
                    backgroundColor: "#fff",
                  }}
                  titleStyle={styles.title}
                  subtitleStyle={styles.textSubtitle}
                  rightElement={
                    <ButtonView
                      subtitle="confirm"
                      color="#0779e4"
                      textColor="#fff"
                    />
                  }
                  chevron={
                    <ButtonView
                      subtitle="delete"
                      bWidth={StyleSheet.hairlineWidth}
                    />
                  }
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}
export default FollowerRequest;
