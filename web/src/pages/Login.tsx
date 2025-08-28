import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Image,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Checkbox,
  Link,
  Button,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../apollo/operations";
import { useMutation } from "@apollo/client";
import images from "../constants/images";
export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [mutateLogin, { loading }] = useMutation(LOGIN);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !pin) {
      toast({ title: "Enter phone & PIN", status: "warning" });
      return;
    }
    try {
      const { data } = await mutateLogin({ variables: { phone, pin } });
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      navigate("/");
    } catch (e: any) {
      toast({ title: "Login failed", description: e.message, status: "error" });
    }
  };
  return (
    <Box
      minH="100dvh"
      bg="gray.50"
      display="grid"
      placeItems="center"
      px={4}
      py={{ base: 8, md: 12 }}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={0}
        w="min(800px, 100%)"
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        rounded="xl"
        boxShadow="sm"
        overflow="hidden"
      >
        <Box
          p={{ base: 6, md: 10 }}
          borderRightWidth={{ base: 0, md: "1px" }}
          borderColor="brand.600"
          backgroundColor="brand.500"
        >
          <Image
            src={images.logo}
            alt="Company logo"
            maxW="120px"
            objectFit="contain"
          />
          <Heading as="h1" size="lg" color="white" mb={2}>
            Your App Name
          </Heading>
          <Text color="white" mb={10} maxW="50ch" opacity={0.8}>
            Create a user on the mobile device and log in using the same
            credentials.
          </Text>
        </Box>

        {/* Right box: form */}
        <Box
          p={{ base: 6, md: 10 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as="form"
            method="post"
            action="/login"
            w="full"
            maxW="420px"
            onSubmit={onSubmit}
            noValidate
          >
            {/* Username / Email */}
            <FormControl mb={4} isRequired>
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiUser color="var(--chakra-colors-gray-500)" />
                </InputLeftElement>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712345678"
                  focusBorderColor="brand.500"
                />
              </InputGroup>
            </FormControl>

            {/* Password */}
            <FormControl isRequired>
              <FormLabel>PIN</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiLock color="var(--chakra-colors-gray-500)" />
                </InputLeftElement>
                <Input
                  id="pin"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  focusBorderColor="brand.500"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    aria-label={showPw ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPw((s) => !s)}
                    icon={showPw ? <FiEyeOff /> : <FiEye />}
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText>Use at least 8 characters.</FormHelperText>
            </FormControl>

            {/* Remember + Forgot */}
            <HStack justify="space-between" align="center" my={4}>
              <Checkbox name="remember" value="1" colorScheme="brand" disabled>
                Remember me
              </Checkbox>
              <Link href="/forgot-password" color="brand.600">
                Forgot/Reset PIN?
              </Link>
            </HStack>

            {/* CTA */}
            <Button
              type="submit"
              w="full"
              mt={2}
              colorScheme="brand"
              isLoading={loading}
            >
              Login
            </Button>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
