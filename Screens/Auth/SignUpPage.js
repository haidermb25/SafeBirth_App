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
import SignUpApi from "../../Api/SignUp";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";

export default SignUp = () => {
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [IsDisabledButton, setIsDisabledButton] = useState(true);

  const pickerItems = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const navigation = useNavigation();

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateName = () => {
    if (name.trim().length < 2) return false;
    for (const nm of name) {
      if (!/[a-zA-Z\s]/.test(nm)) {
        return false;
      }
    }
    return true;
  };

  const validateUserName = () => {
    if (username.length <= 1) return false;
    if (/\s/.test(username)) return false;
    if (!/^[a-z0-9]+$/.test(username)) return false;

    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) return false;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialCharacter = /[@$#!^%*?&]/.test(password);
    return hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter;
  };

  const handleSignUp = async () => {
    if (!validateEmail()) {
      Toast.show({
        type: "error",
        text1: "Invalid Email!",
        text2: "Please enter a valid email address.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }
    if (!validatePassword()) {
      Toast.show({
        type: "error",
        text1: "Weak Password!",
        text2:
          "Password must have uppercase, lowercase, special characters, and be at least 8 characters long.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }
    if (!validateName()) {
      Toast.show({
        type: "error",
        text1: "Invalid Name!",
        text2: "Name should only contain alphabets and length greater than 1",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }
    if (!validateUserName()) {
      Toast.show({
        type: "error",
        text1: "Invalid Name!",
        text2:
          "UseName should not contain spaces and uppercase and length greater than 1",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }
    const response = await SignUpApi(name, username, email, password, gender);
    if (response) {
      alert("Hello");
      setGender("");
      setName("");
      setusername("");
      setEmail("");
      setPassword("");
      Toast.show({
        type: "success",
        text1: "Sign-Up Successful!",
        text2: "Your account has been created successfully.",
        position: "top",
        visibilityTime: 2000,
      });
      setTimeout(() => {
        navigation.goBack();
      }, 2000); // Delay navigation
    }
  };

  useEffect(() => {
    if (name && username && email && password && gender) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [name, username, email, password, gender]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Image
          source={require("../../Assets/Images/addLogo1.png")} // Replace with your logo
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Create your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#C7C7CD"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="username"
        placeholderTextColor="#C7C7CD"
        value={username}
        onChangeText={setusername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#C7C7CD"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#C7C7CD"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Dropdown
        data={pickerItems}
        labelField="label"
        valueField="value"
        value={gender}
        onChange={(item) => setGender(item.value)}
        placeholder="Select Gender"
        style={styles.selectionInput}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        dropdownStyle={styles.dropdownStyle}
        renderRightIcon={() => (
          <AntDesign name="down" size={16} color="#B4B6B8" />
        )}
      />

      <TouchableOpacity
        style={[
          styles.signUpButton,
          IsDisabledButton && styles.signUpButtonDisabled,
        ]}
        onPress={handleSignUp}
        disabled={IsDisabledButton}
      >
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
      <Text style={styles.signInText}>
        Have an account?{" "}
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.signInLink}>SIGN IN</Text>
        </Pressable>
      </Text>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles unchanged
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  selectionInput: {
    width: "100%",
    height: 50,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#F6F6F6",
    color: "#E5E5E5",
  },
  placeholderStyle: {
    color: "#B4B6B8",
    fontSize: 16,
  },
  selectedTextStyle: {
    color: "#333",
    fontSize: 16,
  },
  dropdownStyle: {
    backgroundColor: "#fff",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
  },
  signUpButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#00C781",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signUpButtonDisabled: {
    backgroundColor: "#ccffcc",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInText: {
    color: "#A1A1A1",
  },
  signInLink: {
    color: "#00C781",
    fontWeight: "bold",
  },
});
