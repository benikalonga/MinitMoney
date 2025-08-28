import { DefaultTheme } from "react-native-paper";
import { colors } from "./colors";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: colors.text,
    primary: colors.primary,
    secondary: "#B3E5FC",
    error: "#F44336",
  },
};
