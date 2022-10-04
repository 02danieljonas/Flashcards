import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./RegistrationForm.css";
import { useAuthContext } from "../../../contexts/auth";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function RegistrationForm() {
    const { signupUser, error, setError, isProcessing } = useAuthContext();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = React.useState({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirm: "",
    });

    const handleOnInputChange = (event) => {
        if (event.target.name === "password") {
            if (
                form.passwordConfirm &&
                form.passwordConfirm !== event.target.value
            ) {
                setError((e) => ({
                    ...e,
                    passwordConfirm: "Passwords don't match ❌",
                }));
            } else {
                setError((e) => ({ ...e, passwordConfirm: null }));
            }
        }
        if (event.target.name === "passwordConfirm") {
            if (form.password && form.password !== event.target.value) {
                setError((e) => ({
                    ...e,
                    passwordConfirm: "Passwords don't match ❌ ",
                }));
            } else {
                setError((e) => ({ ...e, passwordConfirm: null }));
            }
        }
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
                setError((e) => ({
                    ...e,
                    email: "Please enter a valid email. ❌",
                }));
            } else {
                setError((e) => ({ ...e, email: null }));
            }
        }
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    };

    const handleOnSubmit = async (e) => {
        const valid = await signupUser(form);
        if (valid) {
            navigate("/");
        }
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Create Your Account 
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        type="text"
                                        className="form-input first-name"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleOnInputChange}
                                    />
                                    <Text>
                                        {error?.firstName && (
                                            <span className="error">
                                                {error?.firstName}
                                            </span>
                                        )}
                                    </Text>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName" isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        className="form-input last-name"
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleOnInputChange}
                                    />
                                    <Text>
                                        {error?.lastName && (
                                            <span className="error">
                                                {error?.lastName}
                                            </span>
                                        )}
                                    </Text>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                className="form-input"
                                name="username"
                                value={form.username}
                                onChange={handleOnInputChange}
                            />
                            <Text>
                                {error?.username && (
                                    <span className="error">
                                        {error?.username}
                                    </span>
                                )}
                            </Text>
                        </FormControl>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                className="form-input"
                                name="email"
                                placeholder="Enter a valid email address."
                                value={form.email}
                                onChange={handleOnInputChange}
                            />
                            <Text>
                                {error?.email && (
                                    <span className="error">
                                        {error?.email}
                                    </span>
                                )}
                            </Text>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    className="form-input"
                                    name="password"
                                    value={form.password}
                                    onChange={handleOnInputChange}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) => !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="confirm-password" isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-input"
                                    name="passwordConfirm"
                                    value={form.passwordConfirm}
                                    onChange={handleOnInputChange}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (showConfirmPassword) =>
                                                    !showConfirmPassword
                                            )
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {error?.passwordConfirm && (
                                <span className="error">
                                    {error?.passwordConfirm}
                                </span>
                            )}
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"green.400"}
                                color={"white"}
                                _hover={{
                                    bg: "gray.100",
                                    color: "green.400",
                                }}
                                onClick={() => {
                                    handleOnSubmit();
                                }}
                            >
                                Register
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already have an account? Log in{" "}
                                <Link
                                    color={"blue.400"}
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    here!
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
