import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import Splash from "../Screens/Auth/Splash";
import Login from "../Screens/Auth/LoginPage";
import SignUp from "../Screens/Auth/SignUpPage";
import Question from "../Screens/Auth/Questionaire";
import Dashboard from "../Screens/Dashboards/Dashboard";
import NewPosts from "../Screens/CommunitySupport/NewPosts";
import UploadPost from "../Screens/CommunitySupport/UploadPost";
import PostsAnalysis from "../Screens/CommunitySupport/PostsAnalysis";
import Profile from "../Screens/Dashboards/Profile";
import ContentPosts from "../Screens/Content Management/ContentPosts";
// Stack Navigations
const Stack = createNativeStackNavigator();
function StackNavigations() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          contentStyle: {
            paddingTop: 20, // Add padding at the top
          },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false, contentStyle: { paddingTop: 20 } }}
      />
      <Stack.Screen
        name="Question"
        component={Question}
        options={{ headerShown: false, contentStyle: { paddingTop: 20 } }}
      />
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{ headerShown: false, contentStyle: { paddingTop: 20 } }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigation
const Tab = createBottomTabNavigator();

function CommunityTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? "green" : "gray"; // Icon color

          if (route.name === "Posts") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Upload") {
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";
          } else if (route.name === "Analysis") {
            iconName = focused ? "pie-chart" : "pie-chart-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={35} // Larger icon size
              color={iconColor}
            />
          );
        },
        tabBarShowLabel: false, // Hide the label
        tabBarStyle: {
          height: 60, // Increase tab bar height to accommodate larger icons
        },
      })}
    >
      <Tab.Screen
        name="Posts"
        component={NewPosts}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadPost}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Analysis"
        component={PostsAnalysis}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
// Drawer Navigation
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerActiveTintColor: "#00C781",
        drawerInactiveTintColor: "black",
        drawerStyle: {
          width: 270,
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          drawerLabel: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image source={require("../Assets/Images/Mask group.png")} />
            </TouchableOpacity>
          ),
          headerShown: false,
        })}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Community Support"
        component={CommunityTabNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Pregnancy Content"
        component={ContentPosts}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

// Here we start navigation
export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}
