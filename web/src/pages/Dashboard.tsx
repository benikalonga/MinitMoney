import { useQuery } from "@apollo/client";
import {
  MoonIcon,
  SunIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { BiExport, BiFolderOpen, BiImport } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import {
  FiEdit2,
  FiEye,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Transaction, User } from "src/types/types";
import { TRANSACTION, TRANSACTIONS } from "../apollo/operations";
import images from "../constants/images";
import { getStatusColor } from "../utils";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      variant="subtle"
      colorScheme={getStatusColor(status)}
      px={3}
      py={1}
      borderRadius="lg"
      fontWeight="medium"
    >
      {status}
    </Badge>
  );
};

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

const ContentHeader = ({
  search,
  setSearch,
  refetch,
}: {
  search: string;
  setSearch: (search: string) => void;
  refetch: () => void;
}) => {
  const bgButton = useColorModeValue("gray.100", "gray.900");
  return (
    <HStack
      px={6}
      pt={6}
      pb={4}
      align="center"
      justifyContent={"space-between"}
    >
      <Text fontSize="xl">Dashboard</Text>
      <HStack>
        <InputGroup maxW="420px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="var(--chakra-colors-gray-500)" />
          </InputLeftElement>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <Button
          leftIcon={<BiExport />}
          colorScheme={"gray"}
          variant={"outline"}
          bg={bgButton}
          pl={6}
          pr={6}
        >
          Import
        </Button>
        <Button
          leftIcon={<BiImport />}
          colorScheme={"gray"}
          variant={"outline"}
          bg={bgButton}
          pl={6}
          pr={6}
        >
          Export
        </Button>
        <Topbar />
      </HStack>
    </HStack>
  );
};

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const thColor = useColorModeValue("gray.600", "gray.300");

  const [selected, setSelected] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TableContainer
        mx={6}
        mb={8}
        bg={cardBg}
        border="1px solid"
        borderColor={cardBorder}
        borderRadius="md"
        boxShadow="sm"
      >
        <Table size="md">
          <Thead>
            <Tr>
              <Th color={thColor} />
              <Th color={thColor}>Recipient</Th>
              <Th color={thColor}>Method</Th>
              <Th color={thColor}>Amount</Th>
              <Th color={thColor}>Status</Th>
              <Th color={thColor}>CREATED AT</Th>
              <Th color={thColor} isNumeric pr={6}></Th>
            </Tr>
          </Thead>

          <Tbody>
            {transactions?.map((t, index) => (
              <Tr
                key={t.id}
                _hover={{ bg: useColorModeValue("gray.50", "whiteAlpha.50") }}
              >
                <Td>{index + 1}</Td>
                <Td fontWeight="medium">{t.recipient.name}</Td>
                <Td>{t.method}</Td>
                <Td>
                  {t.currency}
                  {t.amount.toFixed(2)}
                </Td>
                <Td>
                  <StatusBadge status={t.status} />
                </Td>
                <Td>{new Date(t.createdAt).toDateString()}</Td>
                <Td isNumeric pr={6}>
                  <HStack justify="flex-end" spacing={2}>
                    <IconButton
                      aria-label="View"
                      icon={<FiEye />}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelected(t.id);
                        onOpen();
                      }}
                    />
                    <IconButton
                      aria-label="Edit"
                      icon={<FiEdit2 />}
                      variant="ghost"
                      size="sm"
                      disabled
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<FiTrash2 />}
                      variant="ghost"
                      size="sm"
                      disabled
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <TransactionCard id={selected} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

type TransactionCardProps = {
  id: string | null;
  isOpen: boolean;
  onClose: () => void;
};

const TransactionCard: FC<TransactionCardProps> = ({ id, isOpen, onClose }) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  const { data, loading, error } = useQuery(TRANSACTION, {
    variables: { id },
    skip: !id,
  });
  const transaction: Transaction = data?.transaction || {};

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader alignSelf={"center"}>Transaction Details</DrawerHeader>
        <DrawerBody w={"full"} alignItems={"center"} justifyItems={"center"}>
          {loading && <Text>Loading...</Text>}
          {error && <Text color="red.500">Error loading</Text>}
          {data && (
            <Box
              w="full"
              maxW="sm"
              alignSelf={"center"}
              bg={bg}
              rounded="2xl"
              borderWidth="1px"
              borderColor={border}
              p={4}
            >
              <VStack spacing={3} align="center" textAlign="center">
                {/* Recipient Avatar */}
                <Avatar name={transaction.recipient.name} size="lg" />

                {/* Recipient Info */}
                <VStack spacing={0}>
                  <Text fontWeight="bold" fontSize="md">
                    {transaction.recipient.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {transaction.method}
                  </Text>
                </VStack>

                {/* Status */}
                <Badge
                  colorScheme={getStatusColor(transaction.status)}
                  rounded="full"
                  px={3}
                  py={1}
                >
                  {transaction.status}
                </Badge>

                <Divider />

                {/* Amount */}
                <Text fontSize="2xl" fontWeight="bold">
                  {transaction.amount.toLocaleString()} {transaction.currency}
                </Text>

                {/* Date */}
                <Text fontSize="sm" color="gray.500">
                  {new Date(transaction.createdAt).toLocaleString()}
                </Text>
              </VStack>
            </Box>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const Dashboard = () => {
  const { data, loading, error, refetch } = useQuery(TRANSACTIONS, {
    fetchPolicy: "cache-and-network",
  });

  const [search, setSearch] = useState("");

  const transactions: Transaction[] = search
    ? (data?.transactions || []).filter((t: Transaction) =>
        (t.id + t.recipient.name + t.currency + t.status)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : data?.transactions;

  const pageBg = useColorModeValue("gray.50", "gray.900");
  return (
    <Flex h="100vh" bg={pageBg}>
      <Sidebar />
      <Box flex="1" display="flex" flexDir="column" minW={0} gap={1}>
        <ContentHeader
          search={search}
          setSearch={setSearch}
          refetch={refetch}
        />
        <Divider />
        {loading && <Text>Loading...</Text>}
        {error && <Text color="red.500">Error: {error.message}</Text>}
        {!loading && transactions.length === 0 && <Text>No transactions</Text>}
        <TransactionsTable transactions={transactions} />
      </Box>
    </Flex>
  );
};

export default Dashboard;
