import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Hello thie is my profile</Text>
      <Button
        title="Go Back"
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      />
    </View>
  );
};
export default Profile;
