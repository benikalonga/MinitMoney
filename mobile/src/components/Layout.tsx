import { Image } from "expo-image";
import { ReactElement } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "src/constants/colors";
import images from "src/constants/images";

const Layout = ({
  title,
  topPadding = 0,
  children,
}: {
  title: string;
  topPadding?: number;
  children: ReactElement | ReactElement[];
}) => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={{ overflow: "hidden" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={[styles.top, { paddingBottom: topPadding }]}>
          <Image source={images.logo} style={{ width: 160, height: 160 }} />
          <Text
            style={{
              color: "#fff",
              fontFamily: "Nunito",
              fontSize: 24,
              fontWeight: "800",
            }}
          >
            minit money
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              fontFamily: "Nunito",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {title || "minit money"}
          </Text>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  top: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  bottom: {
    height: Dimensions.get("window").height,
    paddingHorizontal: 18,
    paddingVertical: 28,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
});

export default Layout;
