import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { Icon } from "react-native-elements";

import { Colors } from "../../constants/styles";
import PlaceItem from "./PlaceItem";
import FlatButton from "../ui/FlatButton";

function PlacesList({ places }) {


  const navigation = useNavigation();

  const listRef = useRef(null);

  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);

  const { height } = useWindowDimensions();

  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", { placeId: id });
  }

  function goToForumHandler() {
    navigation.navigate("Forum", {
      numberPlaces: places.length,
    });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.alignment}>
      {/* <FlatButton style={styles.forumButton} onPress={goToForumHandler}>
        Forum
      </FlatButton> */}
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        ref={listRef}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
        renderItem={({ item }) => (
          <PlaceItem place={item} onSelect={selectPlaceHandler} />
        )}
      />
      {contentVerticalOffset < height / 2 && contentVerticalOffset > 0 && (
        <Icon
          name="south"
          type="material"
          color="teal"
          raised
          reverse
          containerStyle={styles.scrollTopButton}
          onPress={() => {
            listRef.current.scrollToEnd({ offset: 0, animated: true });
          }}
        />
      )}
      {contentVerticalOffset >= height / 2 && (
        <Icon
          name="north"
          type="material"
          color="teal"
          raised
          reverse
          containerStyle={styles.scrollTopButton}
          onPress={() => {
            listRef.current.scrollToOffset({ offset: 0, animated: true });
          }}
        />
      )}
    </View>
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    // marginLeft: "5%",
    // marginRight: "5%",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  alignment: {
    marginBottom: 45,
  },
  number: {
    marginTop: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "25%",
    padding: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary1000,
    width: "50%",
    elevation: 10,
    opacity: 0.5,
  },
  scrollTopButton: {
    position: "absolute",
    bottom: 30,
    right: 0,
  },
  forumButton: {
    marginBottom: 4,
  },
});
