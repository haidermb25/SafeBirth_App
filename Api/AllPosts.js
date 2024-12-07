import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./ApiConfig";
import { withRepeat } from "react-native-reanimated";

//Get the post from all the users
export const GetAllPosts = async (userid) => {
  try {
    const url = `${API_BASE_URL}/getAllpost/${userid}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    const postData = responseData.posts;
    return postData;
  } catch (error) {
    console.error("Error message: ", error.message);
  }
};

//Add or Edit the
export const addrating = async (postid, rating) => {
  try {
    const userid = await AsyncStorage.getItem("userid");
    const url = `${API_BASE_URL}/addrating/${postid}/${userid}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        rating,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error message: ", error.message);
  }
};
export const addPost = async (post_text, imageUri) => {
  try {
    const userid = await AsyncStorage.getItem("userid");
    if (!userid) {
      alert("User ID not found.");
      console.error("User ID not found in AsyncStorage");
      return null;
    }

    const url = `${API_BASE_URL}/addpost/${userid}`;
    console.log("URL:", url); // Log URL for debugging

    // Create a FormData object and append text data
    const formData = new FormData();
    formData.append("post_text", post_text);

    // Handle image URI and convert it to a Blob
    if (imageUri) {
      // Fetch the image as a Blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Get the file type (MIME type)
      const fileType = imageUri.split(".").pop(); // Get file type from URI

      // Create a file name for the image
      const fileName = `photo.${fileType}`;

      // Append the Blob to FormData
      formData.append("image", blob, fileName);
    }

    console.log("FormData before fetch:", formData);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    console.log("Response Status:", response.status);
    console.log("Response Text:", await response.text());

    if (response.ok) {
      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } else {
      console.error("Error: Unable to upload post.");
      return null;
    }
  } catch (error) {
    console.error("Error message:", error.message || error);
    alert("An error occurred: " + (error.message || error));
    return null;
  }
};

//Get every User Posts:
export const getUserPost = async () => {
  const userid = await AsyncStorage.getItem("userid");
  const url = `${API_BASE_URL}/getuserpost/${userid}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (data.success && data.message.posts) {
      return data; // Return the full data object
    } else {
      console.error(
        "Error fetching posts:",
        data.message.posts || "No posts found"
      );
      return { posts: [] }; // Return empty posts if the API doesn't return them
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [] }; // Return empty posts if there's an error
  }
};
