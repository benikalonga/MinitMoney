import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  colors: {
    brand: {
      50: "#eaf1fd",
      100: "#d6e3fb",
      200: "#adc7f7",
      300: "#84aaf3",
      400: "#5a8eef",
      500: "#0B53CE",
      600: "#0a48b3",
      700: "#083c96",
      800: "#063279",
      900: "#05245a",
    },
  },
  components: {
    Button: { defaultProps: { colorScheme: "brand" } },
    Checkbox: { defaultProps: { colorScheme: "brand" } },
    Switch: { defaultProps: { colorScheme: "brand" } },
  },
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
});

export default theme;
