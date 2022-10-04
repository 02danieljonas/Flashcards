import React, { useEffect, useState } from "react";
import { useFlashcardContext } from "../../../../contexts/flashcard";
import { StackDivider, Box, VStack, useTheme } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import Set from "../../FlashcardComponents/Set/Set";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../NotFound/NotFound";

function SearchResults({ filteredPublicSets }) {
    const navigate = useNavigate();

    return (
        <>
            <Center pt={"80px"}>
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
                    {filteredPublicSets.map((e, idx) => (
                        <Set
                            set={e}
                            key={idx}
                            onclick={() => {
                                navigate(`/publicsets/${e.id}`);
                            }}
                        />
                    ))}
                </VStack>
            </Center>
        </>
    );
}

export default function PublicSetsOverview() {
    const { queryPublicSets } = useFlashcardContext();
    const [filteredPublicSets, setFilteredPublicSets] = useState([]);
    const { searchValue } = useParams();

    useEffect(() => {
        const searchPublicSets = async (searchData) => {
            if (searchData === null || searchData == "" || searchData === undefined) {
                searchData == "abkdakdbadskjabdkjbd";
            }
            try {
                const res = await queryPublicSets(searchData);
                setFilteredPublicSets(res.data.set);
            } catch (error) {
                console.warn("No sets were found");
                setFilteredPublicSets(null);
            }
        };
        searchPublicSets(searchValue);
    }, [searchValue]);

    return (
        <>
            {filteredPublicSets ? (
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
                        {filteredPublicSets !== null ? (
                            <SearchResults
                                filteredPublicSets={filteredPublicSets}
                            />
                        ) : null}
                    </VStack>
                </Center>
            ) : (
                <NotFound />
            )}
        </>
    );
}
