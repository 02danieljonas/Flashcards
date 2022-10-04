import React, { useEffect, useRef, useState } from "react";
import {
    Checkbox,
    Container,
    HStack,
    Text,
    Box,
    Button,
    Divider,
    StackDivider,
    Center,
} from "@chakra-ui/react";

export default function FlashcardRow({
    idx, //The location of the flashcard in the set
    term,
    definition,
    chosenSet, //The set this flashcard is in
    checkBox, //Is the checkbox for selecting for trash or visibility
}) {
    const checkBoxInput = useRef(null);
    ("I pass in choosenSet because this is how I got selected to work");
    let defaultCheckBox;

    //This code is used for updated and Flashcard overview and the checkbox needs to be different for different occasions
    if (checkBox == "visibility") {
        defaultCheckBox = true;
    } else {
        defaultCheckBox = false;
    }
    const [checkBoxState, setCheckBoxState] = useState(
        chosenSet.flashcards[idx][checkBox] || defaultCheckBox
    );

    useEffect(() => {
        chosenSet.flashcards[idx][checkBox] = checkBoxState;
    }, [checkBoxState, chosenSet]);

    return (
        <HStack className="flashcard-row" spacing={10} pb={10}>
            <Box>
                <Checkbox
                    className={`myCheck ${checkBox || "hidden"}`}
                    colorScheme={"green"}
                    size={"lg"}
                    border={"3px solid"}
                    borderColor={"green.200"}
                    ref={checkBoxInput}
                    title={
                        checkBox == "visibility"
                            ? "Flashcard Visibility"
                            : "Delete Card"
                    }
                    onChange={({ target }) => {
                        setCheckBoxState(target.checked);
                    }}
                    isChecked={checkBoxState}
                />
            </Box>
            <HStack
                color={"black"}
                bg={"gray.100"}
                rounded="10"
                divider={<StackDivider borderColor="white" />}
                width={"90vw"}
                gap={10}
                onClick={() => {
                    setCheckBoxState(!checkBoxState);
                }}
            >
                <Text
                    className="term"
                    fontWeight={"bold"}
                    textAlign={"left"}
                    cursor={"pointer"}
                    fontSize="3xl"
                    pl={50}
                    pr={50}
                    width={"20vw"}
                >
                    {term}
                </Text>
                <Box>
                    <Text
                        className="definition"
                        fontWeight={"medium"}
                        textAlign={"left"}
                        cursor={"pointer"}
                        fontSize="xl"
                        mt={5}
                        mb={5}
                    >
                        {definition}
                    </Text>
                </Box>
                {/* <Text
                    className="definition"
                    fontWeight={"medium"}
                    textAlign={"center"}
                    cursor={"pointer"}
                    fontSize="xl"
                    mt={5}
                    mb={5}
                >
                    {definition}
                </Text> */}
            </HStack>
        </HStack>
    );
}

{
    /* <Box
                centerContent
                className="term-card"
                w={"900px"}
                p={"25px"}
                bg={"green.100"}
                boxShadow={"md"}
                border={"3px solid"}
                borderColor={"green.200"}
                onClick={() => {
                    setCheckBoxState(!checkBoxState);
                }}
            >
                <Text
                    className="term"
                    fontWeight={"bold"}
                    textAlign={"center"}
                    cursor={"default"}
                >
                    {term}
                </Text>
            </Box>
            <Container centerContent>
                <Checkbox
                    className={`myCheck ${checkBox || "hidden"}`}
                    colorScheme={"green"}
                    size={"lg"}
                    border={"3px solid"}
                    borderColor={"green.200"}
                    ref={checkBoxInput}
                    title={
                        checkBox == "visibility"
                            ? "Flashcard Visibility"
                            : "Delete Card"
                    }
                    onChange={({ target }) => {
                        setCheckBoxState(target.checked);
                    }}
                    isChecked={checkBoxState}
                />
            </Container>
            <Container
                centerContent
                className="definition-card"
                w={"900px"}
                p={"25px"}
                bg={"green.100"}
                boxShadow={"md"}
                border={"3px solid"}
                borderColor={"green.200"}
                onClick={() => {
                    setCheckBoxState(!checkBoxState);
                }}
            >
                <Text
                    className="definition"
                    fontSize={"14px"}
                    fontWeight={"medium"}
                    textAlign={"center"}
                    cursor={"default"}
                >
                    {definition}
                </Text>
            </Container> */
}
