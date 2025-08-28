import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import images from "../constants/images";

const AppLayout = () => {
  const navigate = useNavigate();
  return (
    <Container maxW="7xl" py={6}>
      <Flex mb={6} align="center" gap={4}>
        <HStack>
          <Image src={images.logoBlueWithBg} alt="Logo" boxSize="28px" />
          <Heading as="h1" size="md" color="brand.700">
            MiniMoney
          </Heading>
        </HStack>
        <Spacer />
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Flex>
      <Outlet />
    </Container>
  );
};
export default AppLayout;
