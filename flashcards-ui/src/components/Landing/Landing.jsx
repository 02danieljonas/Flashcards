import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useAuthContext } from "../../../contexts/auth.jsx";
import study1 from "../../assets/study1.jpg";

export default function Landing() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthContext();

    return (
        <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
                <Stack spacing={6} w={"full"} maxW={"lg"}>
                    <Heading fontSize={{ base: "4xl", md: "4xl", lg: "6xl" }}>
                        <Text
                            as={"span"}
                            position={"relative"}
                            _after={{
                                content: "''",
                                width: "full",
                                height: useBreakpointValue({
                                    base: "20%",
                                    md: "30%",
                                }),
                                position: "absolute",
                                bottom: 1,
                                left: 0,
                                bg: "green.400",
                                zIndex: -1,
                            }}
                        >
                            Flashi
                        </Text>
                        <br />{" "}
                        <Text
                            fontSize={{ base: "4xl", lg: "5xl" }}
                            color={"green.400"}
                            as={"span"}
                        >
                            The study tool for you
                        </Text>{" "}
                    </Heading>
                    <Text
                        fontSize={{ base: "md", lg: "2xl" }}
                        color={"gray.500"}
                    >
                        Our mission is to provide a free study tool for students
                        & educators to utilize in order to gain mastery over
                        their learning.
                    </Text>
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        spacing={4}
                    >
                        <Button
                            rounded={"full"}
                            bg={"green.400"}
                            color={"white"}
                            _hover={{
                                bg: "gray.100",
                                color: "green.400",
                            }}
                            onClick={() => {
                                {
                                    isLoggedIn
                                        ? navigate("/create")
                                        : navigate("/register");
                                }
                            }}
                            size="lg"
                            title="Create An Account"
                        >
                            Get Started!
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image alt={"Login Image"} objectFit={"cover"} src={study1} />
            </Flex>
        </Stack>
    );
}
