import { Text } from "react-native";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";

const TopBar = ({ title, onBack }: { title: string; onBack: () => void }) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
      }}
      edges={["top"]}
    >
      <IconButton icon={"arrow-left"} onPress={onBack} iconColor={"white"} />
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: "800",
          fontFamily: "Nunito",
        }}
      >
        {title}
      </Text>
      <IconButton icon={"bell-outline"} iconColor={colors.white} />
    </SafeAreaView>
  );
};
export default TopBar;
