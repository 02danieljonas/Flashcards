import { useEffect } from "react";
import { useFlashcardContext } from "../../../../contexts/flashcard";
import {
    HStack,
    StackDivider,
    Box,
    VStack,
    useTheme,
    Text,
    Heading,
    Input,
    Select,
} from "@chakra-ui/react";

export default function MySetsSearch({
    setFilteredMySets,
    sortBy,
    searchValue,
    setSearchValue,
    setSortBy,
}) {
    const { mySets } = useFlashcardContext();

    const sortByNewestDate = (array) => {
        array.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    };
    const sortByOldestDate = (array) => {
        sortByNewestDate(array);
        array.reverse();
    };
    const sortByAlphabeticalOrder = (array) => {
        array.sort((x, y) => {
            return x.title.localeCompare(y.title);
        });
    };
    const sortByReverseAlphabeticalOrder = (array) => {
        sortByAlphabeticalOrder(array);
        array.reverse();
    };
    const sortByNumOfFlashcards = (array) => {
        array.sort((a, b) => b.flashcards.length - a.flashcards.length);
    };


    sortByNewestDate(mySets);
    useEffect(() => {
        sortByNewestDate(mySets);
    }, [mySets]);
    useEffect(() => {
        sortByNewestDate(mySets);
    });

    useEffect(() => {
        const fillteredSetByTitleDescription = mySets.filter((e) => {
            if (e.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            } else if (
                e.description.toLowerCase().includes(searchValue.toLowerCase())
            ) {
                return true;
            } else {
                return false;
            }
        });

        //set that filtered variable into filteredMySets
        setFilteredMySets(fillteredSetByTitleDescription);

        //sorts the sets
        if (fillteredSetByTitleDescription.length > 0) {
            if (sortBy == "Newest") {
                sortByNewestDate(fillteredSetByTitleDescription);
            } else if (sortBy == "Oldest") {
                sortByOldestDate(fillteredSetByTitleDescription);
            } else if (sortBy == "A-Z") {
                sortByAlphabeticalOrder(fillteredSetByTitleDescription);
            } else if (sortBy == "Z-A") {
                sortByReverseAlphabeticalOrder(fillteredSetByTitleDescription);
            } else {
                sortByNumOfFlashcards(fillteredSetByTitleDescription);
            }
        }
        //This is needed to rerender the sets, I think
        // setFilteredMySets([...fillteredSetByTitleDescription]);
    }, [sortBy, searchValue]);

    return (
        <>
            <Heading>My Sets</Heading>
            <HStack
                justify={"space-between"}
                marginTop="20px"
                marginBottom="50px"
            >
                <Input
                    w={"300px"}
                    className="search-input"
                    name="search-input"
                    type="text"
                    alt="text input, search through my sets"
                    value={searchValue}
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
                <Select
                    w={"300px"}
                    className="drop-down"
                    onChange={(e) => {
                        setSortBy(e.target.value);
                    }}
                    value={sortBy}
                >
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>A-Z</option>
                    <option>Z-A</option>
                    <option># of flashcards</option>
                </Select>
            </HStack>
        </>
    );
}
