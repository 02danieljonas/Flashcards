import React, { useState } from "react";
import { useFlashcardContext } from "../../../../contexts/flashcard";
import {
    Box,
    Button,
    Flex,
    FormLabel,
    HStack,
    Input,
    Spacer,
    Stack,
    Textarea,
    VStack,
} from "@chakra-ui/react";

export default function CreateSetAddCard({
    setIsCreateOverviewShown,
    userCreatedSet,
}) {
    const [textDelimiter, setTextDelimiter] = useState(":");
    const [flashcardDelimiter, setFlashcardDelimiter] = useState(",");

    //This is test data
    const [textInput, setTextinput] = useState(
        "Term 1: Definition 1     ,     Term 2: Definition 2     ,     Term 3: Definition 3"
    );
    const { mySets, setMySets } = useFlashcardContext();

    const turnIntoFlashcards = () => {
        let createdSets = [];
        let userError = false;

        if (textDelimiter == flashcardDelimiter) {
            //If the delimiters are the same split the text
            let splitTexts = textInput.split(flashcardDelimiter);
            //Varible to hold and term and definition
            let singleFlashcardAsOBJ = {};

            //check to see if the amount of terms and definition are the same
            if (splitTexts.length % 2 !== 0) {
                userError = true;
            }

            //variable that decides if the user see the flashcard when they are studying
            singleFlashcardAsOBJ.visibility = true;

            splitTexts.forEach((e, idx) => {
                if (!(idx % 2)) {
                    //old string will me terms
                    singleFlashcardAsOBJ.term = e;
                } else {
                    //even strings will be definitions, add the term and definition to a list and reset singleFlashcardAsOBJ so it can be done again
                    singleFlashcardAsOBJ.definition = e;
                    createdSets.push(singleFlashcardAsOBJ);
                    singleFlashcardAsOBJ = {};
                }
            });
        } else {
            //If the textDelimiter and flashcardDelimiter are different
            //split them into a list so term and definition are in one string
            let flashcardsPairs = textInput.split(flashcardDelimiter);
            flashcardsPairs.forEach((e) => {
                //Splits the terms from the definition
                let singleFlashcard = e.split(textDelimiter);
                //if the term or definition is missing run an error
                if (
                    singleFlashcard[0] === undefined ||
                    singleFlashcard[1] === undefined
                ) {
                    //TODO send an error message to user
                    userError = true;
                }
                //Put the term and definition into an object and push it into createdSets
                let singleFlashcardAsOBJ = {
                    //variable that decides if the user see the flashcard when they are studying

                    visibility: true,
                    term: singleFlashcard[0],
                    definition: singleFlashcard[1],
                };
                createdSets.push(singleFlashcardAsOBJ);
            });
        }

        //If the flashcards are not formatted correctly make an alert
        if (userError) {
            alert("You are missing a term or definition");
        } else {
            //pass the info the userCreatedSet so the CreateSetOverview can access it
            createdSets.forEach((e) => {
                userCreatedSet.flashcards.push(e);
            });
            setIsCreateOverviewShown(true);
        }
    };

    return (
        <Flex direction={"column"} align={"center"} justify={"center"}>
            <div className="add-card">
                <Box>
                    <HStack className="delimiter-row">
                        <VStack align={"center"}>
                            <FormLabel
                                fontWeight={"bold"}
                                textAlign={"center"}
                                fontSize={"2xl"}

                            >
                                Term/Definition Delimiter
                            </FormLabel>
                            <Input
                                type="text"
                                className="term-definition-delimiter-input"
                                name="term-definition-delimiter"
                                w={"75%"}
                                color={"black"}
                                bg={"gray.100"}
                                fontSize={"22px"}
                                textAlign={"center"}
                                border={"2px solid"}
                                borderColor={"black"}
                                _hover={{
                                    borderColor: "green.300",
                                }}
                                value={textDelimiter}
                                placeholder={textDelimiter}
                                _placeholder={{
                                    opacity: 0.8,
                                    color: "gray",
                                }}
                                onChange={(e) => {
                                    setTextDelimiter(e.target.value);
                                }}
                            />
                        </VStack>
                        <VStack align={"center"}>
                            <FormLabel
                                fontWeight={"bold"}
                                textAlign={"center"}
                                fontSize={"2xl"}

                            >
                                Card Delimiter
                            </FormLabel>
                            <Input
                                type="text"
                                className="card-delimiter-input"
                                name="card-delimiter"
                                w={"75%"}
                                bg={"gray.100"}
                                border={"2px solid"}
                                borderColor={"black"}
                                color={"black"}
                                fontSize={"22px"}
                                textAlign={"center"}
                                _hover={{
                                    borderColor: "green.300",
                                }}
                                value={flashcardDelimiter}
                                placeholder={flashcardDelimiter}
                                _placeholder={{
                                    opacity: 0.8,
                                    color: "gray",

                                }}
                                onChange={(e) => {
                                    setFlashcardDelimiter(e.target.value);
                                }}
                            />
                        </VStack>
                    </HStack>
                </Box>
                <Box>
                    <VStack mt={"5%"} align={"center"}>
                        <FormLabel
                            fontWeight={"bold"}
                            textAlign={"center"}
                            fontSize={"xl"}
                        >
                            Type/paste your terms & their definitions:
                        </FormLabel>
                        <Textarea
                            className="card-text-input"
                            bg={"gray.100"}
                            border={"2px solid"}
                            borderColor={"black"}
                            color={"black"}
                            fontSize={"l"}
                            _hover={{
                                borderColor: "green.300",

                            }}
                            value={textInput}
                            placeholder="Term 1: Definition 1     ,     Term 2: Definition 2     ,     Term 3: Definition 3"
                            _placeholder={{
                                opacity: 0.8,
                                color: "gray",
                            }}
                            onChange={(e) => {
                                setTextinput(e.target.value);
                            }}
                        />
                    </VStack>
                </Box>
                <br />
                <br />
                <HStack align={"center"} justify={"center"}>
                    <HStack className="button-container">
                        <Button
                            className="back-button"
                            bg={"gray.100"}
                            borderRadius={"22px"}
                            fontSize={"xl"}
                            color={"black"}

                            _hover={{ bg: "black", color: "green.400" }}
                            onClick={() => {
                                setIsCreateOverviewShown(true);
                            }}
                        >
                            Back
                        </Button>
                        <Spacer />
                        <Spacer />
                        <Spacer />
                        <Spacer />
                        <Spacer />
                        <Button
                            className="create-cards-button"
                            bg={"gray.100"}
                            borderRadius={"22px"}
                            fontSize={"xl"}
                            color={"black"}
                            _hover={{ bg: "black", color: "green.400" }}

                            onClick={() => {
                                turnIntoFlashcards(textInput);
                            }}
                        >
                            Create Cards
                        </Button>
                        <br />
                        <br />
                    </HStack>
                </HStack>
            </div>
        </Flex>
    );
}
