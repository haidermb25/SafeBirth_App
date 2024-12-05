import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { addPost } from "../../Api/AllPosts";
const PostUploadComponent = ({ onNewPost }) => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Cleanup function that sets isMounted to false when component unmounts
    return () => setIsMounted(false);
  }, []);

  //Image Picker
  const HandleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setPostImage(result.assets[0].uri);
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "We need access to your storage to pick an image.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // For iOS, permissions are automatically handled
  };

  const handleImagePick = () => {
    requestPermissions().then((granted) => {
      if (granted) {
        launchImageLibrary({ mediaType: "photo", quality: 0.5 }, (response) => {
          if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0].uri;
            setPostImage(selectedImage); // Set the image URI for the post
          }
        });
      } else {
        alert("Storage permission is required to select an image.");
      }
    });
  };
  const handlePostSubmit = async () => {
    const uri = postImage;
    
    // Convert the image URI to a blob
    const file = await fetch(uri);
    const blob = await file.blob();
    
    // Create FormData for the image
    const formData = new FormData();
    formData.append("image", blob, "image.jpg");  // The second argument is the filename you want to use
    
    // Prepare the post text
    const post_text = postText;
    
    // Call addPost and await the result
    const response = await addPost(post_text, formData);
    
    // Handle success or failure
    if (response) {
      alert("Post Uploaded Successfully!");
    } else {
      alert("There is some Problem!");
    }
  };
  

  return (
    <View style={styles.container}>
      {/* User Avatar and Name */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://via.placeholder.com/50" }} // Avatar image URL
        />
        <Text style={styles.userName}>New User</Text>
      </View>

      {/* Post Text Input */}
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind?"
        value={postText}
        onChangeText={setPostText}
        multiline
        numberOfLines={4}
      />

      {/* Browse Image Button */}
      <TouchableOpacity onPress={HandleImagePicker} style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Browse for Image</Text>
      </TouchableOpacity>

      {/* Display Selected Image */}
      {postImage && (
        <Image source={{ uri: postImage }} style={styles.selectedImage} />
      )}

      {/* Post Upload Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={isUploading ? "Uploading..." : "Post"}
          onPress={handlePostSubmit}
          disabled={isUploading}
          color="#28a745" // Green color for the post button
        />
      </View>

      {/* Upload status message */}
      {isUploading && (
        <Text style={styles.uploadingText}>Uploading your post...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 20, // Added margin from the top for spacing
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15, // Increased margin bottom to create space
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18, // Slightly larger text for the user's name
    fontWeight: "bold",
    color: "#333",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    backgroundColor: "#f2f2f2",
    marginBottom: 15, // Increased margin for better spacing
    textAlignVertical: "top", // Align text at the top of the input
  },
  browseButton: {
    marginTop: 10,
    backgroundColor: "#28a745", // Green button color
    paddingVertical: 12, // More padding for a bigger button
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15, // Add space after the button
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 15, // Add space above the image
    marginBottom: 15, // Add space below the image
  },
  buttonContainer: {
    marginTop: 15, // Margin between the buttons
  },
  uploadingText: {
    marginTop: 10,
    color: "green",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PostUploadComponent;
