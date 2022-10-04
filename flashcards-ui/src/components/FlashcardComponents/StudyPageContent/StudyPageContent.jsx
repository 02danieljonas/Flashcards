import React from "react";
import { Heading, Button, Flex, Center, Spacer } from "@chakra-ui/react";
import Index from "./Carousel/Index";
import { useNavigate, useParams } from "react-router-dom";
import { useFlashcardContext } from "../../../../contexts/flashcard";

export default function StudyPageContent({ chosenSet }) {
    const navigate = useNavigate();

    let filteredFlashcard = chosenSet.flashcards.filter((e) => {
        if (e.visibility == true) {
            return e;
        }
    });

    if (filteredFlashcard.length < 2) {
        filteredFlashcard = chosenSet.flashcards;
    }

    const { defaultFlashcardState } = useFlashcardContext();

    return (
        <>
            <Flex >
                {/* <Button>Settings</Button> */}
                <Spacer></Spacer>
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                    mr={5}
                >
                    Back
                </Button>
            </Flex>
            <Center>
                <Heading>{chosenSet.title}</Heading>
            </Center>
            <Index
                flashcards={filteredFlashcard}
                defaultFlashcardState={defaultFlashcardState}
            />
        </>
    );
}
