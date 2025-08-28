import { useState } from "react";
import { Alert, Platform, Text } from "react-native";
import { colors } from "../constants/colors";

import { ApolloError, useMutation } from "@apollo/client";
import { Button, HelperText, TextInput } from "react-native-paper";
import Layout from "src/components/Layout";
import sizes from "src/constants/sizes";
import { REGISTER } from "../apollo/operations";
import { useAuth } from "../context/AuthContext";
import { Toast } from "toastify-react-native";

const Register = ({ navigation }: any) => {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");

  const [firstNameError, setFirstError] = useState("");
  const [lastNameError, setLastError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinError2, setPinError2] = useState("");

  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [hiddenPassword2, setHiddenPassword2] = useState(false);

  const [register, { loading }] = useMutation(REGISTER);
  const { saveAuth } = useAuth();

  const resetError = () => {
    setFirstError("");
    setLastError("");
    setPhoneError("");
    setPinError("");
    setPinError2("");
  };

  const hasError = (value: any, label: string, setError: any) => {
    if (!value) {
      setError(`${label} is required`);
      return true;
    }
  };
  const onSubmit = async () => {
    resetError();
    if (hasError(firstName, "Firstname", setFirstError)) return;
    if (hasError(lastName, "Lastname", setLastError)) return;
    if (hasError(phone, "Phone number", setPhoneError)) return;
    if (hasError(pin, "Pin", setPinError)) return;
    if (hasError(pin2, "Pin", setPinError2)) return;

    if (pin.length < 4) {
      setPinError("PIN must be 4 digits");
      return;
    }
    if (pin !== pin2) {
      setPinError2("Pin not matching");
      return;
    }

    try {
      const { data } = await register({
        variables: { input: { firstName, lastName, phone, pin } },
      });
      await saveAuth(data.register.token, data.register.user);
      navigation.replace("Home");
    } catch (e: any) {
      if (e instanceof ApolloError) {
        setFirstError(e.message);
      }
      Toast.error("Registration failed", "bottom");
    }
  };

  return (
    <Layout
      title="Join Minit Money"
      topPadding={Platform.OS === "ios" ? 20 : 4}
    >
      <>
        <TextInput
          mode="outlined"
          label={"First Name *"}
          value={firstName}
          onChangeText={setFirst}
          outlineStyle={{
            borderRadius: sizes.borderRadius,
          }}
          style={{
            backgroundColor: colors.white,
          }}
          error={!!firstNameError}
          disabled={loading}
        />
        <HelperText type="error" visible={!!firstNameError}>
          {firstNameError}
        </HelperText>
      </>
      <>
        <TextInput
          mode="outlined"
          label={"Last Name *"}
          value={lastName}
          onChangeText={setLast}
          outlineStyle={{
            borderRadius: sizes.borderRadius,
          }}
          style={{
            backgroundColor: colors.white,
          }}
          error={!!lastNameError}
          disabled={loading}
        />
        <HelperText type="error" visible={!!lastNameError}>
          {lastNameError}
        </HelperText>
      </>
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
      <TextInput
        mode="outlined"
        label="Reenter your 4 digit PIN *"
        outlineStyle={{
          borderRadius: sizes.borderRadius,
        }}
        style={{
          backgroundColor: colors.white,
        }}
        secureTextEntry={hiddenPassword2}
        value={pin2}
        onChangeText={setPin2}
        error={!!pinError2}
        disabled={loading}
        right={
          <TextInput.Icon
            icon={hiddenPassword2 ? "eye" : "eye-off"}
            disabled={loading}
            onPress={() => {
              setHiddenPassword2(!hiddenPassword2);
              return false;
            }}
          />
        }
      />
      <HelperText type="error" visible={!!pinError2}>
        {pinError2}
      </HelperText>
      <Button
        onPress={onSubmit}
        loading={loading}
        mode="contained"
        style={{ borderRadius: sizes.borderRadius }}
      >
        {loading ? "Creating account..." : "Register"}
      </Button>

      <Text style={{ marginTop: 16, textAlign: "center" }}>
        Already have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ color: colors.primary, fontWeight: "700" }}
        >
          Login here
        </Text>
      </Text>
    </Layout>
  );
};

export default Register;
