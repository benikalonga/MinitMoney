import { Text } from "react-native";
import { Icon, TouchableRipple } from "react-native-paper";
import { colors } from "src/constants/colors";

const Tile = ({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        height: 90,
      }}
    >
      <>
        <Icon source={icon} size={20} />
        <Text style={{ fontWeight: "500", fontSize: 12, textAlign: "center" }}>
          {title}
        </Text>
      </>
    </TouchableRipple>
  );
};

export default Tile;
