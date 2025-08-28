import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./common/Sidebar";

const AppLayout = () => {
  const pageBg = useColorModeValue("gray.50", "gray.900");
  return (
    <Flex h="100vh" bg={pageBg}>
      <Sidebar />
      <Outlet />
    </Flex>
  );
};
export default AppLayout;
