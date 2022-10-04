import React, { useState } from "react";
import { Input, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFlashcardContext } from "../../../contexts/flashcard";

export default function Searchbar() {
    const [searchbarValue, setSearchbarValue] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <HStack pr={4}>
                <Input
                    type="search"
                    onChange={(e) => {
                        setSearchbarValue(e.target.value);
                    }}
                    value={searchbarValue}
                    placeholder="Search..."
                    _placeholder={{
                        opacity: 0.7,
                        color: "gray",
                    }}
                    variant="ghost"
                    textAlign={"center"}
                    // fontFamily={"serif"}
                    border={"2px solid"}
                    borderColor={"black"}
                    borderRadius={"15px"}
                    // _hover={{ backgroundColor: "green.100" }}
                    // _focus={{ backgroundColor: "green.100" }}
                    onKeyDown={(e) => {
                        if (e.code == "Enter" && searchbarValue != "") {
                            navigate(`/publicsets/search/${searchbarValue}`);
                        }
                    }}
                />
            </HStack>
        </>
        // <div className="searchbar">
        //     <input
        //         type="search"
        //         name="q"
        //         placeholder="Search..."
        //         className="searchbar"
        //         onChange={(e) => {
        //             setSearchbarValue(e);
        //         }}
        //         onKeyDown={(e) => {
        //             if (e.code == "Enter") {
        //                 console.warn("API Request goes here");
        //                 //TODO set up API Request
        //             }
        //         }}
        //     />
        // </div>
    );
}
