import React from "react";
import { useNavigate } from "react-router-dom";
import {
    HStack,
    StackDivider,
    Box,
    VStack,
    useTheme,
    Text,
    Heading,
    Center,
} from "@chakra-ui/react";

export default function Set({ set, onclick }) {
    return (
        <>
            <HStack
                padding="0"
                spacing="0"
                color={"black"}
                bg={"gray.100"}
                // bg={useTheme().colors.brand.green}
                rounded="20"
                onClick={onclick}
                divider={<StackDivider borderColor="white" />}
                mr={5}
                transition="transform .1s ease-in-out"
                _hover={{ transform: "scale(1.02)" }}
            >
                <VStack
                    p="5px"
                    paddingTop={"20px"}
                    paddingBottom={"20px"}
                    minH="150px"
                    w="222px"
                    alignItems={"left"}
                >
                    <Box
                        // style={{
                        //     wordBreak: "break-all",
                        // }}
                        fontWeight="bold"
                        fontSize="3xl"
                    >
                        {set.title}
                    </Box>
                    <Box fontWeight="bold">
                        {set.flashcards.length} flashcards
                    </Box>
                    <Box fontWeight="bold">Created: {set.createdAt}</Box>
                </VStack>

                <Box flex="1" p="20px" h="150px">
                    <Text noOfLines={5} fontSize={"2xl"}>
                        {set.description}
                    </Text>
                </Box>
            </HStack>
        </>
    );
}
