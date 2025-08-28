import { useQuery } from "@apollo/client";
import { ActivityIndicator, Text, View } from "react-native";
import { Icon, TouchableRipple } from "react-native-paper";
import { TRANSACTION } from "../apollo/operations";
import TopBar from "../components/TopBar";
import { colors } from "../constants/colors";

import { Transaction } from "src/types/types";
import { getStatusColor, getStatusIcon } from "src/utils";

const TransactionDetail = ({ navigation, route }: any) => {
  const id = route.params?.id;
  const { data, loading, error, refetch } = useQuery(TRANSACTION, {
    variables: { id },
    skip: !id,
  });

  const transaction: Transaction = data?.transaction;

  return (
    <View style={{ flex: 1, gap: 30, backgroundColor: colors.primary }}>
      <TopBar title="Transaction" onBack={() => navigation.goBack()} />
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 999,
          backgroundColor: "#F3F6FB55",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Icon source={"account-outline"} size={80} color={colors.white} />
      </View>
      {loading && <ActivityIndicator />}
      {error && (
        <View>
          <Text>Something went wrong</Text>
        </View>
      )}
      {transaction ? (
        <View
          style={{
            flex: 1,
            padding: 30,
            backgroundColor: colors.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            gap: 16,
          }}
        >
          <Row>
            <LeftItem>
              <Icon source={getStatusIcon(transaction.status)} size={24} />
            </LeftItem>
            <RightItem>
              <Text
                style={{
                  fontWeight: "300",
                  fontFamily: "Nunito",
                  backgroundColor: getStatusColor(transaction.status),
                  color: colors.white,
                  paddingHorizontal: 6,
                  borderTopLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                {transaction.status}
              </Text>
            </RightItem>
          </Row>

          <Row>
            <LeftItem>
              <Icon source={"account-outline"} size={24} />
            </LeftItem>
            <RightItem>
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: 16,
                }}
              >
                {transaction.recipient?.name}
              </Text>
            </RightItem>
          </Row>
          <Row>
            <LeftItem>
              <Icon source={"calendar"} size={24} />
            </LeftItem>
            <RightItem>
              <Text style={{ color: colors.subtext }}>
                {new Date(transaction.createdAt).toLocaleString()}
              </Text>
            </RightItem>
          </Row>
          <Row>
            <LeftItem>
              <Icon source={"cash"} size={24} />
            </LeftItem>
            <RightItem>
              <Text style={{ color: colors.subtext }}>
                {transaction.amount} {transaction.currency}
              </Text>
            </RightItem>
          </Row>
        </View>
      ) : null}
    </View>
  );
};

const Row = ({ children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
};
const LeftItem = ({ children }) => {
  return (
    <View
      style={{
        flex: 0.6,
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
};
const RightItem = ({ children }) => {
  return (
    <View style={{ flex: 1.2, justifyContent: "center" }}>{children}</View>
  );
};

export default TransactionDetail;
