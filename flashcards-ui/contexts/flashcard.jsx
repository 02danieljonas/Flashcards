import { createContext, useState, useContext, useEffect } from "react";
import apiClient from "../services/apiClient";
import { LoremIpsum } from "lorem-ipsum";
// import { response } from "../../flashcards-api/app";
import { useAuthContext } from "./auth";

const FlashcardContext = createContext(null);

export const FlashcardContextProvider = ({ children }) => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    //This is to be changeable by the user
    const [defaultFlashcardState, setDefaultFlashcardState] = useState(true);

    const [initialized, setInitialized] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState();
    const [mySets, setMySets] = useState([]);
    const { isLoggedIn } = useAuthContext();
    const [searchbarValue, setSearchbarValue] = useState("");

    const fetchMySets = async () => {
        const { data, err } = await apiClient.fetchUserSets();
        // If all goes well, should set the data as the `userSet` state variable

        if (data) {
            data.mySets.reverse()
            setMySets(data.mySets);
        }
        // If there is an error with the request, it should set a message as the `error` state variable
        if (err) {
            setError(err);
        }
    };


    useEffect(() => {
        if (isLoggedIn) {
            // should make a `GET` request to the `/mysets` endpoint
            // If there is an error with the request, it should set a message as the `error` state variable
            fetchMySets();
            setIsProcessing(false);
            setInitialized(true);
        }
    }, [isLoggedIn]);

    async function updateASet(){

    }

    // user's sets are created
    async function createSet(set) {
        setIsProcessing(true);
        setError((e) => ({ ...e, set: null }));

        const create = async () => {
            const res = await apiClient.createUserSet(set);
            if(res?.err){
                console.warn("This should be a toast about sever being down")
            }else{
                fetchMySets()
            }
        };

        const valid = await create();
        setIsProcessing(false);

        return valid;
    }



    // method to fetch a user's specific public set by id
    async function getAPublicSet(setId) {
        const response = await apiClient.getAPublicSet(setId);
        return response;
    }

    // method to fetch a user's specific public set by id
    async function queryPublicSets(searchQuery) {
        const response = await apiClient.queryPublicSets(searchQuery);
        return response;
    }

    // const lorem = new LoremIpsum({

    //     sentencesPerParagraph: {
    //         max: 8,
    //         min: 4,
    //     },
    //     wordsPerSentence: {
    //         max: 16,
    //         min: 4,
    //     },
    // });

    // function randomDate(start, end) {
    //     return new Date(
    //         start.getTime() + Math.random() * (end.getTime() - start.getTime())
    //     );
    // }

    // const randomSet = (numOfSet) => {
    //     let set = [];
    //     const create = () => {
    //         let flashcardss = [];
    //         let randomInt = Math.floor(Math.random() * 13) + 5;
    //         for (let k = 0; k < randomInt; k++) {
    //             flashcardss.push({
    //                 term: `term${k}`,
    //                 id: k,
    //                 definition: lorem.generateWords(
    //                     Math.floor(Math.random() * 22) + 10
    //                 ),
    //                 visibility: true,
    //                 selectedForTrash: false,
    //             });
    //         }
    //         return flashcardss;
    //     };
    //     for (let i = 0; i < numOfSet; i++) {
    //         set.push({
    //             title: `Title`,
    //             description: lorem.generateWords(
    //                 Math.floor(Math.random() * 8) + 5

    //             ),
    //             setId: i,
    //             flashcard: create(),
    //             date: randomDate(new Date(2012, 0, 1), new Date()).toDateString(),
    //         });
    //     }
    //     return set;
    // };

    const flashcardValue = {
        initialized,
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        showSettingsModal,
        setShowSettingsModal,
        defaultFlashcardState,
        setDefaultFlashcardState,
        mySets,
        setMySets,
        queryPublicSets,
        getAPublicSet,
        searchbarValue,
        setSearchbarValue,
        createSet,
    };

    return (
        <FlashcardContext.Provider value={flashcardValue}>
            <>{children}</>
        </FlashcardContext.Provider>
    );
};

export const useFlashcardContext = () => useContext(FlashcardContext);
