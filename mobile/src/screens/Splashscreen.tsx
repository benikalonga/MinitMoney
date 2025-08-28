import { Image } from "expo-image";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import images from "src/constants/images";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

import {
  Nunito_500Medium as Nunito,
  Nunito_700Bold as NunitoBold,
  useFonts,
} from "@expo-google-fonts/nunito";

let timeOut: NodeJS.Timeout;

const Splashscreen = ({ navigation }: any) => {
  const { user } = useAuth();
  let [fontsLoaded] = useFonts({
    Nunito,
    NunitoBold,
  });

  console.log("Font", fontsLoaded);

  useEffect(() => {
    // Simulate splashscreen
    timeOut = setTimeout(() => {
      if (user && fontsLoaded) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [user, fontsLoaded]);

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={{ width: 160, height: 160 }} />
      <ActivityIndicator />
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
