/* eslint-disable react-hooks/exhaustive-deps */
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "src/constants/colors";

const NetworkChecking: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      const isConnected = !!state.isConnected;
      setIsConnected(isConnected);
    });
  }, []);

  if (isConnected) {
    return null;
  }
  const redBg = colors.danger;
  return (
    <SafeAreaView
      style={{
        backgroundColor: redBg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        gap: 10,
      }}
      edges={["top"]}
    >
      <StatusBar backgroundColor={redBg} style="light" />
      <Icon source={"alert-circle-outline"} size={24} color={"white"} />
      <Text
        style={{
          color: "white",
        }}
      >
        Devince not connected
      </Text>
    </SafeAreaView>
  );
};

export default NetworkChecking;
