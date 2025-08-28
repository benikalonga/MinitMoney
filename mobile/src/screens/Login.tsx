import { ApolloError, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import Layout from "src/components/Layout";
import sizes from "src/constants/sizes";
import { APP_VERSION } from "src/lib/config";
import { LOGIN } from "../apollo/operations";
import { colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { Toast } from "toastify-react-native";

const Login = ({ navigation }: any) => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const [login, { loading }] = useMutation(LOGIN);
  const { saveAuth, user, loading: authLoading } = useAuth();
  const [hiddenPassword, setHiddenPassword] = useState(false);

  useEffect(() => {
    if (user) navigation.replace("Home");
  }, [user]);

  const resetError = () => {
    setPhoneError("");
    setPinError("");
  };
  const onSubmit = async () => {
    resetError();
    if (!phone) return setPhoneError("Phone number is required");
    if (!pin) return setPinError("PIN is required");
    try {
      const { data } = await login({ variables: { phone, pin } });
      await saveAuth(data.login.token, data.login.user);
      navigation.replace("Home");
    } catch (e: any) {
      console.log(e);
      if (e instanceof ApolloError) {
        setPhoneError(e.message);
        setPinError(e.message);
      }

      Toast.error("Login failed", "bottom");
    }
  };

  if (authLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <Layout title="Login">
      <TextInput
        mode="outlined"
        label={"Phone Number *"}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        outlineStyle={{
          borderRadius: sizes.borderRadius,
        }}
        style={{
          backgroundColor: colors.white,
        }}
        error={!!phoneError}
        disabled={loading}
      />
      <HelperText type="error" visible={!!phoneError}>
        {phoneError}
      </HelperText>
      <TextInput
        mode="outlined"
        label="Enter your 4 digit PIN *"
        outlineStyle={{
          borderRadius: sizes.borderRadius,
        }}
        style={{
          backgroundColor: colors.white,
        }}
        secureTextEntry={hiddenPassword}
        value={pin}
        onChangeText={setPin}
        error={!!pinError}
        disabled={loading}
        right={
          <TextInput.Icon
            icon={hiddenPassword ? "eye" : "eye-off"}
            disabled={loading}
            onPress={() => {
              setHiddenPassword(!hiddenPassword);
              return false;
            }}
          />
        }
      />
      <HelperText type="error" visible={!!pinError}>
        {pinError}
      </HelperText>
      <Button
        onPress={onSubmit}
        loading={loading}
        mode="contained"
        style={{ borderRadius: sizes.borderRadius }}
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>
      <Button style={{ marginTop: 18 }}>
        <Text
          style={{
            textAlign: "center",
            color: colors.black,
          }}
        >
          Forgot/Reset PIN?
        </Text>
      </Button>
      <Button
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 18 }}
      >
        <Text
          style={{
            fontWeight: "700",
            textAlign: "center",
            color: colors.black,
          }}
        >
          Register new Profile
        </Text>
      </Button>
      <Text style={styles.txtVersion}>{APP_VERSION}</Text>
    </Layout>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  top: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 30,
  },
  bottom: {
    height: Dimensions.get("window").height,
    paddingHorizontal: 18,
    paddingVertical: 28,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  txtVersion: { textAlign: "center", marginTop: 24, color: colors.text },
});
