import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import Video from "react-native-video"; // For video rendering

const ContentPosts = () => {
  const [selectedFilter, setSelectedFilter] = useState("Text"); // Default filter is Text
  const [searchText, setSearchText] = useState("");

  // Sample data for posts
  const posts = [
    {
      type: "Text",
      content: "Had an amazing day at the beach!",
      id: 1,
    },
    {
      type: "Text",
      content: "Learning React Native is fun! #coding",
      id: 2,
    },
    {
      type: "Video",
      content: "https://www.w3schools.com/html/movie.mp4", // Sample video URL
      id: 3,
    },
    {
      type: "Video",
      content: "https://www.w3schools.com/html/movie.mp4", // Another sample video URL
      id: 4,
    },
  ];

  // Filter posts based on selected filter (Text or Video)
  const filteredPosts = posts.filter((post) => post.type === selectedFilter);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Text" && styles.selectedButton,
          ]}
          onPress={() => setSelectedFilter("Text")}
        >
          <Text style={styles.filterButtonText}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Video" && styles.selectedButton,
          ]}
          onPress={() => setSelectedFilter("Video")}
        >
          <Text style={styles.filterButtonText}>Videos</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {filteredPosts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            {post.type === "Text" ? (
              <Text style={styles.postText}>{post.content}</Text>
            ) : (
              <Video
                source={{ uri: post.content }} // Video URL
                style={styles.video}
                controls={true}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  searchBar: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    elevation: 5,
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#4CAF50",
  },
  filterButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  postContainer: {
    marginBottom: 20,
  },
  postText: {
    fontSize: 18,
    color: "#333",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#000",
  },
});

export default ContentPosts;
