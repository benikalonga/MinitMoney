import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import images from "../../constants/images";
import { FiFileText, FiGrid, FiLogOut } from "react-icons/fi";
import { BiFolderOpen } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";

const Sidebar = () => {
  const border = useColorModeValue("gray.200", "gray.700");
  const activeBg = useColorModeValue("white", "black");
  const activeColor = useColorModeValue("blue.700", "blue.200");
  const bg = useColorModeValue("gray.100", "gray.900");

  const navigate = useNavigate();
  const user: User = JSON.parse(localStorage.getItem("user"));

  const Item = ({
    icon,
    label,
    active = false,
    onClick,
  }: {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }) => (
    <HStack
      px={3}
      py={2.5}
      borderRadius="md"
      spacing={3}
      bg={active ? activeBg : "transparent"}
      color={active ? activeColor : undefined}
      _hover={{
        bg: active ? activeBg : useColorModeValue("gray.100", "gray.700"),
      }}
      cursor="pointer"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      <Icon as={icon} />
      <Text fontWeight={active ? "semibold" : "light"} fontSize={"sm"}>
        {label}
      </Text>
    </HStack>
  );

  return (
    <Box
      w="250px"
      borderRight="1px solid"
      borderColor={border}
      bg={bg}
      p={4}
      display="flex"
      flexDir="column"
      gap={6}
    >
      <HStack p={{ base: 4 }}>
        <Image
          src={images.logoBlueWithBg}
          alt="Logo"
          boxSize="28px"
          rounded={"full"}
        />
        <Text fontSize={"xl"}>MINIT MONEY</Text>
      </HStack>

      <VStack align="stretch">
        <Text fontSize={"xs"}>Main Menu</Text>
        <Item icon={FiGrid} label="Dashboard" />
        <Item icon={FiFileText} label="Statistic" />
        <Item icon={BiFolderOpen} label="Transaction" active />
        <Item icon={BsCardChecklist} label="Card" />
      </VStack>
      <Spacer />
      <Divider />
      <HStack spacing={3}>
        <Avatar size="sm" name={`${user?.firstName} ${user?.lastName}`} />
        <Text fontWeight="medium">
          {user?.firstName} {user?.lastName}
        </Text>
      </HStack>
      <Item
        icon={FiLogOut}
        label="Logout"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      />
    </Box>
  );
};
export default Sidebar;
