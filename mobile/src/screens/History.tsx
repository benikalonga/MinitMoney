import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Button, Icon, TouchableRipple } from "react-native-paper";
import { TRANSACTIONS } from "../apollo/operations";
import TopBar from "../components/TopBar";
import { colors } from "../constants/colors";

import { Image } from "expo-image";
import images from "src/constants/images";
import sizes from "src/constants/sizes";
import { Transaction } from "src/types/types";
import { getStatusColor } from "src/utils";

const History = ({ navigation, route }: any) => {
  const newTransactionId = route.params?.newId;
  const { data, loading, error, refetch } = useQuery(TRANSACTIONS);

  useEffect(() => {
    if (newTransactionId) {
      refetch();
    }
  }, [newTransactionId]);

  const openTransactionDetail = useCallback((item: Transaction) => {
    navigation.navigate("TransactionDetail", { id: item.id });
  }, []);

  const transactions: Transaction[] = data?.transactions || [];
  const hasItems = Boolean(transactions.length);

  let content: React.ReactNode = null;

  if (loading && !hasItems) {
    content = (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={images.logoBlue} style={{ width: 100, height: 100 }} />
        <ActivityIndicator />
      </View>
    );
  } else if (error && !hasItems) {
    content = (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Icon source={"network-off-outline"} size={60} color="#dadada" />
        <Text>Error loading history</Text>
        <Button
          mode="contained"
          onPress={() => {
            refetch();
          }}
          style={{
            borderRadius: sizes.borderRadius,
          }}
        >
          Refresh
        </Button>
      </View>
    );
  } else if (data && !hasItems) {
    content = (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Icon source={"format-list-checkbox"} size={60} color="#dadada" />
        <Text>No transactions yet</Text>
        <Button
          mode="contained"
          onPress={() => {
            refetch();
          }}
          style={{
            borderRadius: sizes.borderRadius,
          }}
        >
          Refresh
        </Button>
      </View>
    );
  } else
    content = (
      <FlatList
        data={transactions}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.border }} />
        )}
        renderItem={({ item, index }) => (
          <TransactionItem
            item={item}
            key={index + "_" + item.id}
            onPress={openTransactionDetail}
          />
        )}
        onRefresh={refetch}
        refreshing={loading}
      />
    );

  return (
    <View style={{ flex: 1, gap: 10, backgroundColor: colors.primary }}>
      <TopBar title="Send History" onBack={() => navigation.goBack()} />
      <View
        style={{
          flex: 1,
          padding: 18,
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        {content}
      </View>
    </View>
  );
};

export default History;

const TransactionItem = ({
  item,
  onPress,
}: {
  item: Transaction;
  onPress: (item: Transaction) => void;
}) => {
  return (
    <TouchableRipple
      onPress={() => onPress(item)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        gap: 14,
      }}
    >
      <>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "#F3F6FB",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon source={"account-outline"} size={20} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "800", fontSize: 16 }}>
            {item.recipient.name}
          </Text>
          <Text style={{ color: colors.subtext }}>{item.method}</Text>
          <Text style={{ color: colors.subtext }}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", height: "100%" }}>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 12,
              fontFamily: "Nunito",
              backgroundColor: getStatusColor(item.status),
              color: colors.white,
              paddingHorizontal: 6,
              borderTopLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            {item.status}
          </Text>
          <Text style={{ color: colors.subtext }}>
            {item.amount} {item.currency}
          </Text>
        </View>
      </>
    </TouchableRipple>
  );
};
