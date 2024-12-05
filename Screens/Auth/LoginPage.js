import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LoginApi from "../../Api/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import getUserData from "../../Api/Dashboard";

export default Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsDisabledButton, setIsDisabledButton] = useState(true);

  // Remove previous user data from AsyncStorage (runs only once)
  // useEffect(() => {
  //   const removeUserData = async () => {
  //     await AsyncStorage.removeItem("userid");
  //     await AsyncStorage.removeItem("name");
  //     await AsyncStorage.removeItem("username");
  //   };
  //   removeUserData();
  // }, []);
  // Call the Login Api
  const handleLogin = async () => {
    const response = await LoginApi(email, password);
    if (response) {
      setEmail("");
      setPassword("");
      Toast.show({
        type: "success",
        text1: "Login Successful!",
        text2: "You have been Login successfully.",
        position: "top",
        visibilityTime: 2000,
      });

      // Fetch user data
      const fetchUserData = async () => {
        if (email) {
          const data = await getUserData(email);
          await AsyncStorage.setItem("userid", String(data.id));
          await AsyncStorage.setItem("name", data.name);
          await AsyncStorage.setItem("username", data.username);
        }
      };
      fetchUserData();
      navigation.replace("DrawerNavigation");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "userName or Password not exist",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  // Check the enabling and disabling of button
  useEffect(() => {
    if (email && password) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../Assets/Images/addLogo1.png")} // Replace with the correct path to your logo image
        style={styles.logo}
      />
      <Text style={styles.title}>Sign in your account</Text>

      <TextInput
        style={styles.input}
        placeholder="ex: johnSmith@gmail.com"
        placeholderTextColor="#C7C7CD"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="**************"
        placeholderTextColor="#C7C7CD"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[
          styles.signInButton,
          IsDisabledButton && styles.signInButtonDisabled,
        ]}
        onPress={handleLogin}
        disabled={IsDisabledButton}
      >
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or sign in with</Text>

      <Text style={styles.signUpText}>
        Don’t have an account?{" "}
        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.signUpLink}>SIGN UP</Text>
        </Pressable>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#000",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#00C781",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signInButtonDisabled: {
    backgroundColor: "#ccffcc",
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#A1A1A1",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
  },
  signUpText: {
    color: "#A1A1A1",
  },
  signUpLink: {
    color: "#00C781",
    fontWeight: "bold",
  },
});
