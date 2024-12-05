import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigations/Navigation";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
}
