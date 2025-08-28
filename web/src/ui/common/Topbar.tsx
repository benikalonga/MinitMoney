import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const Topbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      variant="ghost"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    />
  );
};
export default Topbar;
