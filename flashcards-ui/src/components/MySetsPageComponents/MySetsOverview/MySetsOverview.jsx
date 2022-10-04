import React, { useEffect, useState } from "react";
import { useFlashcardContext } from "../../../../contexts/flashcard";
import Set from "../../FlashcardComponents/Set/Set";
import MySetsSearch from "./MySetsSearch";
import { StackDivider, Box, VStack, useTheme } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function MySetsOverview() {
    "This takes the varibale mySets fron contexts/flashcard and loops it through the Set component";
    const { mySets } = useFlashcardContext();
    const [sortBy, setSortBy] = useState("Newest");
    const [searchValue, setSearchValue] = useState("");
    const [filteredMySets, setFilteredMySets] = useState(mySets);
    const navigate = useNavigate();


    useEffect(() => {
        setFilteredMySets(mySets);
    }, [mySets]);

    return (
        <div className="my-sets-page">
            <Center>
                <Box w="80vw">
                    <MySetsSearch
                        setFilteredMySets={setFilteredMySets}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </Box>
            </Center>
            <Center>
                <VStack
                    divider={
                        <StackDivider
                            borderColor={useTheme().colors.brand.green}
                        />
                    }
                    spacing={4}
                    w="80vw"
                    align={"stretch"}
                >
                    {filteredMySets.map((e, idx) => (
                        <Set set={e} key={idx} onclick={() => {
                            navigate(`/mysets/${e.id}`)
                        }}/>
                    ))}
                </VStack>
            </Center>
        </div>
    );
}
