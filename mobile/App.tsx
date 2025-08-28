import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import Splashscreen from "src/screens/Splashscreen";
import { client } from "./src/apollo/client";
import { AuthProvider } from "./src/context/AuthContext";
import History from "./src/screens/History";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import SendMoney from "./src/screens/SendMoney";

import { Provider as ThemeProvider } from "react-native-paper";
import { theme } from "src/constants/theme";
import TransactionDetail from "src/screens/TransactionDetail";

import ToastManager from "toastify-react-native";
import NetworkChecking from "src/components/NetworkListener";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" />
          <NetworkChecking />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splashscreen" component={Splashscreen} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SendMoney" component={SendMoney} />
              <Stack.Screen name="History" component={History} />
              <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetail}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
      <ToastManager />
    </ApolloProvider>
  );
}
