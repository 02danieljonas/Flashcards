import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFlashcardContext } from "../../../../contexts/flashcard";
import {
    Box,
    Button,
    HStack,
    IconButton,
    Avatar,
    AvatarBadge,
    useColorModeValue,
    Icon,
    Input,
    Spacer,
    Center,
    Heading,
    useTheme,
    Text,
    Flex,
    VStack,
} from "@chakra-ui/react";
import FlashcardRow from "../../FlashcardComponents/FlashcardRow/FlashcardRow";

export default function FlashcardOverviewPageContent({
    chosenSet,
    onButtonClick,
    buttonText,
    startStudyingNavigation,
}) {
    const navigate = useNavigate();
    const { globalTheme } = useTheme();

    const minimumVisibleFlashcards = () => {
        let filteredFlashcards = chosenSet.flashcards.filter((e) => {
            if (e.visibility == true) {
                return e;
            }
        });
        if (filteredFlashcards.length < 2) {
            return true;
        } else {
            return false;
        }
    };

    const startStudying = () => {
        if (minimumVisibleFlashcards)
            navigate(`/${startStudyingNavigation}/${chosenSet.id}`);
    };
    return (
        <>
            {buttonText ? (
                <Button
                    pos={"fixed"}
                    top="80px"
                    left="40px"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>
            ) : (
                <></>
            )}
            <Button
                pos={"fixed"}
                top="80px"
                right="40px"
                onClick={() => {
                    navigate(-1);
                }}
            >
                Back
            </Button>
            <Center>
                <Heading
                    bgColor={"gray.100"}
                    color="black"
                    paddingTop={"20px"}
                    paddingBottom={"20px"}
                    paddingLeft={"80px"}
                    paddingRight={"80px"}
                    rounded={globalTheme.rounded}
                    marginBottom="20px"
                    marginTop="20px"
                >
                    {chosenSet.title}
                </Heading>
            </Center>
            <Center>
                <Text
                    bgColor={"gray.100"}
                    color="black"
                    paddingTop={"20px"}
                    paddingBottom={"20px"}
                    paddingLeft={"80px"}
                    paddingRight={"80px"}
                    rounded={globalTheme.rounded}
                    fontSize={"xl"}
                >
                    {chosenSet.description}
                </Text>
            </Center>

            <Center>
                <VStack w={"80vw"} marginTop="80px">
                    {chosenSet.flashcards.map((e, idx) => (
                        <FlashcardRow
                            e={e}
                            key={idx}
                            idx={idx}
                            term={e.term}
                            checkBox={"visibility"}
                            definition={e.definition}
                            chosenSet={chosenSet}
                        />
                    ))}
                </VStack>
            </Center>

            <Button
                position="fixed"
                margin="auto"
                bottom={"40px"}
                display="block"
                transform="translateX(-50%)"
                left="50%"
                onClick={startStudying}
                isDisabled={
                    chosenSet.flashcards.filter((e) => {
                        if (e.visibility == true) {
                            return e;
                        }
                    }) >= 2
                }
                title="Please select at least two flashcards"
            >
                Start Studying
            </Button>
        </>
    );
}
