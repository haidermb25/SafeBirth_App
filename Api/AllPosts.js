import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./ApiConfig";

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

export const addPost = async (post_text, image) => {
  try {
    const userid = await AsyncStorage.getItem("userid");
    const url = `${API_BASE_URL}/addpost/${userid}`;

    // Create FormData for the image and text
    const formData = new FormData();
    formData.append("post_text", post_text);

    // Append image to FormData
    if (image) {
      formData.append("image", image, "image.jpg"); // Adjust the filename and field name as needed
    }

    // Send the FormData to the backend
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      return data; // Return the data from the response
    } else {
      console.error("Error: Unable to upload post");
      return null;
    }
  } catch (error) {
    console.error("Error message: ", error);
    return null;
  }
};
