import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { BENEFICIARIES, SEND_MONEY } from "../apollo/operations";
import TopBar from "../components/TopBar";
import { colors } from "../constants/colors";

import { Button, HelperText, IconButton, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import CdFlag from "src/components/flags/CdFlag";
import sizes from "src/constants/sizes";
import useGetRate from "src/hooks/useGetRate";
import { Toast } from "toastify-react-native";

type Beneficiary = { id: string; name: string; method: string };

const SendMoney = ({ navigation }: any) => {
  const { data } = useQuery(BENEFICIARIES);

  const beneficiaries = useMemo(() => {
    return (
      data?.beneficiaries?.map((b: Beneficiary, i: number) => {
        const ben = b.name + " | " + b.method;
        return { value: b.id, label: ben };
      }) || []
    );
  }, [data?.beneficiaries]);

  const [recipient, setRecipient] = useState<Beneficiary>();
  const [amount, setAmount] = useState<string>("0");
  const [currency] = useState<string>("ZAR");
  const [method, setMethod] = useState("");

  const { rate /*fromTo, isLoading, setFromTo*/ } = useGetRate();

  const [recipientError, setRecipientError] = useState("");
  const [amountError, setAmountError] = useState("");

  const [mutateSendMoney, { loading }] = useMutation(SEND_MONEY);

  const receive = useMemo(() => {
    const a = parseFloat(amount) || 0;
    if (isNaN(a)) return 0;
    return Math.round(a * rate?.rate * 100) / 100;
  }, [amount, rate?.rate]);

  const resetError = () => {
    setAmountError("");
    setRecipientError("");
  };

  const handleBeneficiaryChanged = (id: string) => {
    const recipientObject = data?.beneficiaries.find(
      (s: Beneficiary) => s.id === id
    ) as Beneficiary;

    setRecipient(recipientObject);
    setMethod(recipientObject.method);
  };

  const submit = async () => {
    resetError();
    const a = amount || 0;
    if (!recipient) return setRecipientError("Recipient is required");
    if (!a || parseFloat(a) <= 0) return setAmountError("Amount must be > 0");
    try {
      const payload = {
        recipient: {
          id: recipient.id,
          name: recipient.name,
          method: recipient.method,
        },
        amount: parseFloat(a),
        currency,
        method,
      };
      console.log(payload);
      const newTransaction = await mutateSendMoney({
        variables: { input: payload },
      });
      Toast.success("Transfer created", "bottom");
      navigation.replace("History", {
        newId: newTransaction.data.sendMoney.id,
      });
    } catch (e: any) {
      Toast.error("Transfer failed " + e.message, "bottom");
    }
  };

  return (
    <View style={{ flex: 1, gap: 10, backgroundColor: colors.primary }}>
      <TopBar title="Send Money" onBack={() => navigation.goBack()} />
      <ScrollView
        style={{
          flex: 1,
          padding: 18,
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
      >
        <Dropdown
          label="Select a Beneficiary"
          placeholder="Select"
          options={beneficiaries}
          value={recipient?.id}
          onSelect={handleBeneficiaryChanged}
          mode="outlined"
          CustomDropdownInput={(props) => (
            <TextInput
              mode="outlined"
              label={props.label}
              keyboardType="phone-pad"
              value={props.selectedLabel}
              selectTextOnFocus
              placeholder={props.placeholder}
              right={props.rightIcon}
              outlineStyle={{
                borderRadius: sizes.borderRadius,
              }}
              style={{
                backgroundColor: colors.white,
              }}
              error={!!props.error}
              disabled={props.disabled}
            />
          )}
          menuContentStyle={{
            backgroundColor: colors.white,
            borderRadius: 16,
            overflow: "hidden",
          }}
          error={!!recipientError}
        />
        <HelperText type="error" visible={!!recipientError}>
          {recipientError}
        </HelperText>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "300",
            fontSize: 22,
            marginVertical: 12,
          }}
        >
          {rate?.from} 1 = {rate?.to} {rate?.rate}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <IconButton
            onPress={() => setAmount(Math.max(0, parseFloat(amount)) - 10 + "")}
            icon={"minus"}
            mode="outlined"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.subtext,
                marginTop: 6,
                textAlign: "center",
              }}
            >
              Send {currency}
            </Text>
            <TextInput
              value={amount + ""}
              onChangeText={(s) => {
                setAmount(s);
              }}
              keyboardType="decimal-pad"
              mode="outlined"
              outlineStyle={{
                borderRadius: 999,
                borderWidth: 1,
                backgroundColor: "#F3F6FB",
              }}
              outlineColor="#F3F6FB"
              style={{
                fontSize: 28,
                textAlign: "center",
                backgroundColor: colors.white,
              }}
              error={!!amountError}
            />
            <HelperText
              style={{ alignSelf: "center" }}
              type="error"
              visible={!!amountError}
            >
              {amountError}
            </HelperText>
          </View>

          <IconButton
            onPress={() => setAmount(Math.max(0, parseFloat(amount)) + 10 + "")}
            icon={"plus"}
            mode="outlined"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 18 }}>Receive</Text>
          <Text style={{ fontSize: 18 }}>USD</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 999,
            backgroundColor: "#F3F6FB",
            paddingRight: 6,
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
            <CdFlag />
          </View>
          <Text style={{ fontSize: 32, fontWeight: "500" }}>
            {receive.toFixed(2)}
          </Text>
        </View>

        <TextInput
          mode="outlined"
          label={"Select a payment method"}
          value={method}
          selectTextOnFocus
          placeholder={"no method selected"}
          outlineStyle={{
            borderRadius: sizes.borderRadius,
          }}
          style={{
            marginTop: 16,
            backgroundColor: colors.white,
          }}
          onChangeText={setMethod}
        />

        <Text
          style={{ textAlign: "center", color: colors.subtext, marginTop: 10 }}
        >
          This total includes all fees and charges
        </Text>
        <Button mode="contained" onPress={submit} style={{ marginTop: 12 }}>
          {loading ? "Processing..." : "Continue"}
        </Button>

        <View
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 16,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            You are on level 2
          </Text>
          <View style={{ flexDirection: "row", gap: 6, paddingVertical: 12 }}>
            <View style={styles.lcol}>
              <Text style={styles.muted}></Text>
              <Text style={styles.bold}>Daily</Text>
              <Text style={styles.bold}>Monthly</Text>
            </View>
            <View style={styles.lcol}>
              <Text style={styles.muted}>Limit</Text>
              <Text style={styles.bold}>R 3,000.00</Text>
              <Text style={styles.bold}>R 10,000.00</Text>
            </View>
            <View style={styles.lcol}>
              <Text style={styles.muted}>Available</Text>
              <Text style={styles.bold}>R 3,000.00</Text>
              <Text style={styles.bold}>R 10,000.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SendMoney;
const styles = {
  round: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  } as any,
  amount: {
    with: "100%",
    marginHorizontal: 12,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F3F6FB",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "500",
  } as any,
  lcol: {
    flex: 1,
    color: "#fff",
    borderRadius: 12,
    gap: 12,
    padding: 12,
  } as any,
  muted: { color: colors.white } as any,
  bold: { fontWeight: "700", marginTop: 6, color: "#fff" } as any,
};
