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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginApi from "../../Api/Login";
import getUserData from "../../Api/Dashboard";
import { useName } from "../../Api/ContextApi";

export default Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setName } = useName();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    const response = await LoginApi(email, password);
    if (response) {
      setEmail("");
      setPassword("");
      Toast.show({
        type: "success",
        text1: "Login Successful!",
        text2: "You have logged in successfully.",
        position: "top",
        visibilityTime: 2000,
      });

      const fetchUserData = async () => {
        const data = await getUserData(email);
        await AsyncStorage.setItem("userid", String(data.id));
        await AsyncStorage.setItem("name", data.name);
        await AsyncStorage.setItem("username", data.username);
        setName(data.name);
      };
      fetchUserData();
      navigation.replace("DrawerNavigation");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Username or Password does not exist.",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  useEffect(() => {
    setIsDisabledButton(!(email && password));
  }, [email, password]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../Assets/Images/addLogo1.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign in to your account</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter email or username"
        placeholderTextColor="#C7C7CD"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="**************"
          placeholderTextColor="#C7C7CD"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.icon}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#C7C7CD"
          />
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        style={[
          styles.signInButton,
          isDisabledButton && styles.signInButtonDisabled,
        ]}
        onPress={handleLogin}
        disabled={isDisabledButton}
      >
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      {/* Additional Options */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an account?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.signUpLink}> SIGN UP</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#333",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#F6F6F6",
  },
  inputField: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    paddingHorizontal: 10,
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
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    fontSize: 14,
    color: "#A1A1A1",
  },
  signUpLink: {
    fontSize: 14,
    color: "#00C781",
    fontWeight: "bold",
  },
});
