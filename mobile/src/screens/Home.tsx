import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Divider,
  Icon,
  IconButton,
  Menu,
  PaperProvider,
  TouchableRipple,
} from "react-native-paper";
import images from "src/constants/images";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetRate from "src/hooks/useGetRate";
import ZaFlag from "src/components/flags/ZaFlag";
import CdFlag from "src/components/flags/CdFlag";
import { Toast } from "toastify-react-native";
import Tile from "src/components/home/Tile";

const Home = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { rate, fromTo, isLoading, setFromTo } = useGetRate();
  const name = user?.firstName || "there";

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const logUserOut = () => {
    Toast.info("Logging user out", "bottom");
    logout().finally(() => {
      Toast.success("user logged out", "bottom");

      navigation.replace("Login");
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", gap: 28 }}>
      <SafeAreaView
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 18,
          borderBottomLeftRadius: 36,
          borderBottomRightRadius: 36,
          minHeight: "36%",
          gap: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                onPress={openMenu}
                icon={"menu"}
                iconColor={"white"}
              />
            }
          >
            <Menu.Item
              leadingIcon={() => (
                <Icon source={"lock-open"} size={24} color={colors.danger} />
              )}
              titleStyle={{
                color: colors.danger,
              }}
              onPress={() => {
                logUserOut();
              }}
              title="Log out"
            />
          </Menu>

          <View style={{ alignItems: "center" }}>
            <Image source={images.logo} style={{ width: 48, height: 48 }} />
            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
                fontFamily: "Nunito",
              }}
            >
              minit money
            </Text>
          </View>
          <IconButton
            icon={"bell-outline"}
            iconColor={colors.text}
            style={{
              backgroundColor: colors.white,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "300",
              marginBottom: 10,
            }}
          >
            Good Morning, {name}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontWeight: "300",
              marginBottom: 10,
            }}
          >
            Create a quote to start sending money in minutes
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "75%",
            backgroundColor: colors.white,
            borderRadius: 12,
            padding: 12,
            alignSelf: "center",
            alignItems: "center",
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            position: "absolute",
            bottom: -28,
          }}
        >
          <View
            style={{
              borderRadius: 999,
              height: 48,
              width: 48,
              overflow: "hidden",
            }}
          >
            <ZaFlag />
          </View>
          {isLoading ? (
            <View style={{ flex: 1 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <TouchableRipple
              style={{
                flex: 1,
                alignItems: "center",
              }}
              onPress={() => {
                // TODO: setFromTo implementation
              }}
            >
              <>
                <Text style={{ fontWeight: "700" }}>
                  {fromTo.from} 1 = {fromTo.to} {rate.rate}
                </Text>
                <Text style={{ fontSize: 12 }}>Click for other rates</Text>
              </>
            </TouchableRipple>
          )}
          <View
            style={{
              borderRadius: 999,
              height: 48,
              width: 48,
              overflow: "hidden",
            }}
          >
            <CdFlag />
          </View>
        </View>
      </SafeAreaView>

      <View style={{ padding: 18, gap: 20 }}>
        <Text
          style={{ fontWeight: "300", marginBottom: 10, textAlign: "center" }}
        >
          What would you like to do today?
        </Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Tile icon={"scoreboard"} title={"Create a\nQuote"} />
          <Tile
            icon={"script-text-play"}
            title={"Send\nHistory"}
            onPress={() => navigation.navigate("History")}
          />
          <Tile icon={"account-group"} title={"Beneficiaries"} />
        </View>

        <Button
          mode="contained"
          onPress={() => navigation.navigate("SendMoney")}
          style={{ marginTop: 14 }}
        >
          Send Money
        </Button>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 14,
          }}
        >
          <Text
            style={{
              marginRight: -10,
              borderWidth: 1,
              paddingVertical: 10,
              paddingLeft: 10,
              paddingRight: 20,
              borderTopLeftRadius: 999,
              borderBottomLeftRadius: 999,
              borderColor: colors.primary,
            }}
          >
            102485
          </Text>
          <Button
            mode="contained"
            icon={"share"}
            onPress={() => navigation.navigate("SendMoney")}
            style={{
              borderRadius: 16,
              paddingVertical: 6,
            }}
          >
            Share
          </Button>
        </View>
        <Text
          style={{
            textAlign: "center",
          }}
        >
          Referal Code
        </Text>
      </View>
    </View>
  );
};
export default Home;
