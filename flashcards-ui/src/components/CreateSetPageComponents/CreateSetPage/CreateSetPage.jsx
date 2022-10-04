import React, { useState, useEffect } from "react";
import CreateSetOverview from "../CreateSetOverview/CreateSetOverview.jsx";
import CreateSetAddCard from "../CreateSetAddCard/CreateSetAddCard.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/auth";
import {
    Flex,
    Input,
    Text,
    Center,
    Box,
    useTheme,
    VStack,
    Textarea,
    Divider,
} from "@chakra-ui/react";
import { useFlashcardContext } from "../../../../contexts/flashcard.jsx";

export default function CreateSetPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // This variable decides which body of the create page is shown
    const [isCreateOverviewShown, setIsCreateOverviewShown] = useState(true);
    const [userCreatedSet, setUserCreatedSet] = useState({
        title: null,
        description: null,
        flashcards: [],
        isPublic: true
    });


    const { isLoading, isLoggedIn } = useAuthContext();
    const navigate = useNavigate();
    const { globalTheme } = useTheme();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, isLoading]);

    return (
        <VStack>
            <Center>
                <Textarea
                    bgColor={"gray.100"}
                    color="black"
                    paddingTop={"20px"}
                    paddingBottom={"20px"}
                    paddingLeft={"80px"}
                    paddingRight={"80px"}
                    textAlign={"center"}
                    rounded={globalTheme.rounded}
                    marginBottom="20px"
                    marginTop="20px"
                    fontSize={"4xl"}
                    _hover={{ border: "3px solid", borderColor: "green.300" }}
                    placeholder="Add Set Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                        userCreatedSet.title = e.target.value;
                    }}
                    width={"50vw"}
                />
            </Center>


            {isCreateOverviewShown ? (
                <CreateSetOverview
                    description={description}
                    setDescription={setDescription}
                    setIsCreateOverviewShown={setIsCreateOverviewShown}
                    chosenSet={userCreatedSet}
                    userCreatedSet={userCreatedSet}
                    setUserCreatedSet={setUserCreatedSet}
                />
            ) : (
                <CreateSetAddCard
                    setIsCreateOverviewShown={setIsCreateOverviewShown}
                    userCreatedSet={userCreatedSet}
                />
            )}
        </VStack>
    );
}
